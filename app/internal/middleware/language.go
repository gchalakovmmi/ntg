package middleware

import (
    "context"
    "database/sql"
    "log/slog"
    "net/http"
    "slices"
    "strings"
    "NTG/internal/database"
)

type contextKey string

const (
    LanguageKey contextKey = "language"
    PhrasesKey  contextKey = "phrases"
)

// WithLanguage is a middleware that handles language detection and phrase loading
func WithLanguage(db *sql.DB, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Extract language from URL path
        pathSegments := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
        if len(pathSegments) < 1 {
            slog.Warn("Invalid URL path for language detection", "path", r.URL.Path)
            http.Error(w, "Invalid path", http.StatusBadRequest)
            return
        }

        lang := pathSegments[0]
        slog.Debug("Extracted language from URL", "language", lang)

        // Validate language is supported
        supportedLangs, err := database.GetSupportedLanguages(db)
        if err != nil {
            slog.Error("Failed to get supported languages", "error", err)
            http.Error(w, "Internal server error", http.StatusInternalServerError)
            return
        }

        if !slices.Contains(supportedLangs, lang) {
            slog.Debug("Language not supported, checking cookie", "language", lang)
            // Check for language cookie
            cookie, err := r.Cookie("preferred_language")
            if err == nil && slices.Contains(supportedLangs, cookie.Value) {
                lang = cookie.Value
                slog.Debug("Using language from cookie", "language", lang)
            } else {
                // If still not supported, default to Bulgarian
                lang = "bg"
                slog.Debug("Defaulting to Bulgarian", "language", lang)
            }
        }

        // Set/update the preferred language cookie
        http.SetCookie(w, &http.Cookie{
            Name:     "preferred_language",
            Value:    lang,
            Path:     "/",
            MaxAge:   365 * 24 * 60 * 60, // 1 year
            HttpOnly: true,
            Secure:   false, // Set to true in production with HTTPS
            SameSite: http.SameSiteLaxMode,
        })

        // Get page name from URL path
        page := "home" // Default page
        if len(pathSegments) > 1 {
            page = pathSegments[1]
        }
        slog.Debug("Detected page", "page", page)

        // Load phrases for this page and language
        phrases, err := database.GetPhrases(db, lang, page)
        if err != nil {
            slog.Error("Failed to load phrases", "error", err, "language", lang, "page", page)
            // Continue without phrases rather than failing the request
            phrases = make(map[string]map[string]string)
        } else {
            slog.Info("Loaded phrases", "language", lang, "page", page, "phrase_count", len(phrases))
        }

        // Add language and phrases to request context
        ctx := context.WithValue(r.Context(), LanguageKey, lang)
        ctx = context.WithValue(ctx, PhrasesKey, phrases)

        // Call the next handler with the new context
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
