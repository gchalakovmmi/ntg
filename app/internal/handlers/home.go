package handlers

import (
	"net/http"
	"log/slog"
	"github.com/a-h/templ"
	"NTG/internal/middleware"
	"NTG/web/templates/pages/home"
	"NTG/internal/database"
	"database/sql"
)

func Home(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)
		
		// Fetch latest 4 news articles
		articles, err := database.GetLatestNewsArticles(db, language, 4)
		if err != nil {
			slog.Error("Failed to fetch latest news articles", "error", err)
			// Continue with empty articles - don't break the page
			articles = []database.NewsArticle{}
		}
		
		templ.Handler(home.Handler(page, language, phrases, articles)).ServeHTTP(w, r)
	})
}
