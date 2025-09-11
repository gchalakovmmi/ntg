package handlers

import (
	"net/http"

	"NTG/internal/middleware"
	"NTG/web/templates/pages/partners"
	"log/slog"

	"github.com/a-h/templ"
)

func Partners() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)

		slog.Debug(phrases["footer"]["school_name"])

		templ.Handler(partners.Handler(page, language, phrases)).ServeHTTP(w, r)
	})
}
