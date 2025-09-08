package handlers

import (
	"log/slog"
	"net/http"
	"github.com/a-h/templ"
	"NTG/web/templates/pages/home"
	"NTG/internal/database"
)

func getLanguage(r *http.Request) {
	slog.Debug(r.URL.Path)
	slog.Debug(database.GetSupportedLanguages(cfg.db))
}

func Home() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		getLanguage(r)
		templ.Handler(home.Handler()).ServeHTTP(w, r)
	})
}
