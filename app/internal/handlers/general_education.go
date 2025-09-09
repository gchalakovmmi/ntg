package handlers

import (
	"net/http"
	"github.com/a-h/templ"
	"NTG/internal/middleware"
	"NTG/web/templates/pages/general_education"
)

func GeneralEducation() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)
		templ.Handler(general_education.Handler(page, language, phrases)).ServeHTTP(w, r)
	})
}
