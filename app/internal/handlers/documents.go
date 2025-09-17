package handlers

import (
	"NTG/internal/config"
	"NTG/internal/database"
	"NTG/internal/middleware"
	"NTG/web/templates/pages/documents"
	"net/http"
	"path/filepath"
	"log/slog"
	"os"
	"database/sql"

	"github.com/a-h/templ"
)

func Documents(cfg *config.Config, db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)

		// Get the current working directory
		cwd, err := os.Getwd()
		if err != nil {
			slog.Error("Error getting current working directory", "error", err)
			cwd = "."
		}

		// Get documents from filesystem using absolute path
		basePath := filepath.Join(cwd, "web", "static", "docs", "documents")
		slog.Info("Loading documents from", "path", basePath)
		
		// Updated function call with new signature
		documentsData, err := database.GetDocuments(basePath, cfg.CurrentSchoolYear)
		if err != nil {
			// Log error but continue - we'll show empty sections
			slog.Error("Error loading documents", "error", err)
			documentsData = make(map[string]database.SectionData)
		}

		// Log document counts for debugging
		for section, data := range documentsData {
			slog.Info("Document counts", "section", section, "current_year", len(data.CurrentYear), "archive_years", len(data.Archive))
		}

		templ.Handler(documents.Handler(page, language, phrases, documentsData, cfg.CurrentSchoolYear)).ServeHTTP(w, r)
	})
}
