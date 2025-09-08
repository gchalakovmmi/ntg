package handlers

import (
	"net/http"

	"github.com/a-h/templ"
	"NTG/internal/middleware"
	"NTG/web/templates/pages/home"
)

func Home() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)
		
		templ.Handler(home.Handler(language, phrases)).ServeHTTP(w, r)
	})
}
