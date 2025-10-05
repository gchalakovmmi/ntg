package handlers

import (
	"NTG/internal/middleware"
	"NTG/web/templates/pages/nvo"
	"net/http"

	"github.com/a-h/templ"
)

func Nvo() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)

		templ.Handler(nvo.Handler(page, language, phrases)).ServeHTTP(w, r)
	})
}
