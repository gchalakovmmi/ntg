package database

import (
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

type Document struct {
	Key	   string
	FilePath  string
	Filename  string
	Year	  string
	Section   string
	Size	  string
	Extension string
}

type SectionData struct {
	CurrentYear  []Document
	Archive	  map[string][]Document
	ArchiveYears []string
}

// GetDocuments retrieves all documents organized by dynamically discovered sections and years
func GetDocuments(basePath, currentYear string) (map[string]SectionData, error) {
	sections := make(map[string]SectionData)

	// Dynamically discover all directories in the base path
	sectionDirs, err := getSectionDirectories(basePath)
	if err != nil {
		return sections, fmt.Errorf("error discovering section directories: %w", err)
	}

	for _, section := range sectionDirs {
		sectionData, err := processSection(basePath, section, currentYear)
		if err != nil {
			slog.Error("Error processing section", "section", section, "error", err)
			sections[section] = SectionData{
				CurrentYear:	[]Document{},
				Archive:			make(map[string][]Document),
				ArchiveYears:	[]string{},
			}
			continue
		}
		sections[section] = sectionData
	}

	return sections, nil
}

// getSectionDirectories discovers all directories in the base path
func getSectionDirectories(basePath string) ([]string, error) {
	var sectionDirs []string

	entries, err := os.ReadDir(basePath)
	if err != nil {
		return nil, fmt.Errorf("error reading base directory: %w", err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			sectionDirs = append(sectionDirs, entry.Name())
		}
	}

	return sectionDirs, nil
}

// processSection processes a single document section
func processSection(basePath, section, currentYear string) (SectionData, error) {
	sectionData := SectionData{
		CurrentYear:	[]Document{},
		Archive:			make(map[string][]Document),
		ArchiveYears:	[]string{},
	}

	sectionPath := filepath.Join(basePath, section)
	if _, err := os.Stat(sectionPath); os.IsNotExist(err) {
		return sectionData, nil
	}

	files, err := os.ReadDir(sectionPath)
	if err != nil {
		return sectionData, fmt.Errorf("error reading section directory: %w", err)
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		doc, err := processFile(sectionPath, file.Name(), section, currentYear)
		if err != nil {
			slog.Warn("Skipping file due to processing error", "file", file.Name(), "error", err)
			continue
		}

		if doc.Year == currentYear {
			sectionData.CurrentYear = append(sectionData.CurrentYear, doc)
		} else {
			if sectionData.Archive[doc.Year] == nil {
				sectionData.Archive[doc.Year] = []Document{}
			}
			sectionData.Archive[doc.Year] = append(sectionData.Archive[doc.Year], doc)
		}
	}

	// Sort documents and archive years
	sortSectionData(&sectionData)

	return sectionData, nil
}

// processFile processes a single document file
func processFile(sectionPath, filename, section, currentYear string) (Document, error) {
	filePath := filepath.Join(sectionPath, filename)
	
	// Extract year and key from filename
	year, key := extractYearAndKey(filename, currentYear)

	// Get file info for size
	info, err := os.Stat(filePath)
	if err != nil {
		return Document{}, fmt.Errorf("error getting file info: %w", err)
	}

	// Get file extension
	ext := strings.TrimPrefix(filepath.Ext(filename), ".")
	if ext != "" {
		ext = strings.ToUpper(ext)
	}

	return Document{
		Key:			key,
		FilePath:	filePath,
		Filename:	filename,
		Year:			year,
		Section:		section,
		Size:			formatFileSize(info.Size()),
		Extension:	ext,
	}, nil
}

// extractYearAndKey extracts year and key from filename
func extractYearAndKey(filename, currentYear string) (string, string) {
	// Expected format: YYYY-YYYY_filename.extension
	// If the format doesn't match, use current year and the filename as key
	if len(filename) < 10 || filename[4] != '-' || filename[9] != '_' {
		key := strings.TrimSuffix(filename, filepath.Ext(filename))
		return currentYear, key
	}

	year := filename[:9]
	key := strings.TrimSuffix(filename[10:], filepath.Ext(filename))

	return year, key
}

// sortSectionData sorts the documents within a section
func sortSectionData(sectionData *SectionData) {
	// Sort current year documents by key
	sort.Slice(sectionData.CurrentYear, func(i, j int) bool {
		return sectionData.CurrentYear[i].Key < sectionData.CurrentYear[j].Key
	})

	// Collect archive years and sort them in descending order
	years := make([]string, 0, len(sectionData.Archive))
	for year := range sectionData.Archive {
		years = append(years, year)
	}
	sort.Sort(sort.Reverse(sort.StringSlice(years)))
	sectionData.ArchiveYears = years

	// Sort each archive year's documents by key
	for year := range sectionData.Archive {
		sort.Slice(sectionData.Archive[year], func(i, j int) bool {
			return sectionData.Archive[year][i].Key < sectionData.Archive[year][j].Key
		})
	}
}

// formatFileSize formats file size in human-readable format
func formatFileSize(size int64) string {
	const unit = 1024
	if size < unit {
		return fmt.Sprintf("%d B", size)
	}
	div, exp := int64(unit), 0
	for n := size / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %cB", float64(size)/float64(div), "KMGTPE"[exp])
}

// GetDocumentSections reads all directory names from the documents base path
func GetDocumentSections(basePath string) ([]string) {
	var sections []string

	entries, err := os.ReadDir(basePath)
	if err != nil {
		return nil
	}

	for _, entry := range entries {
		if entry.IsDir() {
			sections = append(sections, entry.Name())
		}
	}

	return sections
}
