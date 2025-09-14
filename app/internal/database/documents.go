package database

import (
	"database/sql"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

type Document struct {
	Name		string
	Description string
	FilePath	string
	Filename	string
	Year		string
	Section	 string
	Size		string
	Extension   string
}

type SectionData struct {
	CurrentYear  []Document
	Archive	  map[string][]Document
	ArchiveYears []string
}

func GetDocuments(db *sql.DB, basePath string, currentYear string, language string) (map[string]SectionData, error) {
	sections := make(map[string]SectionData)
	
	sectionDirs := []string{
		"regulations",
		"curriculum", 
		"education_types",
		"budget",
		"schedules",
		"scholarships",
		"buyer_profile",
		"rules",
	}

	for _, section := range sectionDirs {
		sectionPath := filepath.Join(basePath, section)
		sectionData := SectionData{
			CurrentYear:  []Document{},
			Archive:	  make(map[string][]Document),
			ArchiveYears: []string{},
		}

		if _, err := os.Stat(sectionPath); os.IsNotExist(err) {
			sections[section] = sectionData
			continue
		}

		files, err := os.ReadDir(sectionPath)
		if err != nil {
			slog.Error("Error reading section directory", "section", section, "error", err)
			sections[section] = sectionData
			continue
		}

		for _, file := range files {
			if file.IsDir() {
				continue
			}

			filename := file.Name()
			filePath := filepath.Join(sectionPath, filename)
			
			var year, name string
			if len(filename) >= 10 && filename[4] == '-' && filename[9] == '_' {
				year = filename[:9]
				name = filename[10:]
			} else {
				slog.Warn("File doesn't follow naming convention", "file", filename)
				continue
			}

			info, err := file.Info()
			if err != nil {
				slog.Error("Error getting file info", "file", filename, "error", err)
				continue
			}

			size := formatFileSize(info.Size())
			
			ext := strings.ToUpper(filepath.Ext(filename))
			if len(ext) > 0 {
				ext = ext[1:]
			}

			// Create document name by replacing underscores with spaces and removing extension
			docName := strings.ReplaceAll(strings.TrimSuffix(name, filepath.Ext(name)), "_", " ")

			// Try to get the display name from the database
			displayName := getDocumentDisplayName(db, section, name, language)
			if displayName != "" {
				docName = displayName
			} else {
				// If no display name found, use a more readable version of the filename
				docName = strings.ReplaceAll(docName, "_", " ")
				docName = strings.Title(strings.ToLower(docName)) // Convert to title case
			}

			doc := Document{
				Name:	  docName,
				FilePath:  filePath,
				Filename:  filename,
				Year:	  year,
				Section:   section,
				Size:	  size,
				Extension: ext,
			}

			// Log document processing for debugging
			slog.Debug("Processing document", 
				"section", section, 
				"filename", filename, 
				"extracted_name", name, 
				"final_name", docName,
				"year", year,
				"is_current", year == currentYear)

			if year == currentYear {
				sectionData.CurrentYear = append(sectionData.CurrentYear, doc)
			} else {
				if sectionData.Archive[year] == nil {
					sectionData.Archive[year] = []Document{}
				}
				sectionData.Archive[year] = append(sectionData.Archive[year], doc)
			}
		}

		// Sort current year documents by name
		sort.Slice(sectionData.CurrentYear, func(i, j int) bool {
			return sectionData.CurrentYear[i].Name < sectionData.CurrentYear[j].Name
		})

		// Collect archive years and sort them in descending order
		years := make([]string, 0, len(sectionData.Archive))
		for year := range sectionData.Archive {
			years = append(years, year)
		}
		sort.Sort(sort.Reverse(sort.StringSlice(years)))
		sectionData.ArchiveYears = years

		// Sort each archive year's documents
		for year := range sectionData.Archive {
			sort.Slice(sectionData.Archive[year], func(i, j int) bool {
				return sectionData.Archive[year][i].Name < sectionData.Archive[year][j].Name
			})
		}

		sections[section] = sectionData
	}

	return sections, nil
}

func getDocumentDisplayName(db *sql.DB, section string, key string, language string) string {
	if db == nil {
		slog.Error("Database connection is nil in getDocumentDisplayName")
		return ""
	}
	
	// Remove the file extension from the key for lookup
	keyWithoutExt := strings.TrimSuffix(key, filepath.Ext(key))
	
	var name string
	query := `SELECT phrase FROM phrases WHERE language = ? AND page = 'documents' AND section = ? AND key = ?`
	err := db.QueryRow(query, language, section, keyWithoutExt).Scan(&name)
	
	if err != nil {
		slog.Debug("Display name not found in database", 
			"section", section, 
			"key", keyWithoutExt, 
			"language", language, 
			"error", err)
		return ""
	}
	
	slog.Debug("Found display name in database", 
		"section", section, 
		"key", keyWithoutExt, 
		"language", language, 
		"name", name)
	return name
}

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
