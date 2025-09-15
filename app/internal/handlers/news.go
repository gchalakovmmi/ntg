package handlers

import (
	"NTG/internal/database"
	"NTG/internal/middleware"
	"NTG/web/templates/pages/news"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/a-h/templ"
)

func News(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		page := r.Context().Value(middleware.PageKey).(string)
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)

		// Parse query parameters for filtering
		query := r.URL.Query()
		category := query.Get("category")
		search := query.Get("search")
		
		// Parse date filters
		var startDate, endDate *time.Time
		if startStr := query.Get("start_date"); startStr != "" {
			if parsed, err := time.Parse("2006-01-02", startStr); err == nil {
				startDate = &parsed
			}
		}
		
		if endStr := query.Get("end_date"); endStr != "" {
			if parsed, err := time.Parse("2006-01-02", endStr); err == nil {
				endDate = &parsed
			}
		}
		
		// Parse pagination parameters
		pageNum := 1
		if pageStr := query.Get("page"); pageStr != "" {
			if parsed, err := strconv.Atoi(pageStr); err == nil && parsed > 0 {
				pageNum = parsed
			}
		}
		
		limit := 6
		offset := (pageNum - 1) * limit
		
		// Fetch news articles from database
		articles, err := database.GetNewsArticles(db, language, category, search, startDate, endDate, limit, offset)
		if err != nil {
			http.Error(w, "Failed to fetch news articles", http.StatusInternalServerError)
			return
		}
		
		// Fetch total count for pagination
		totalCount, err := database.CountNewsArticles(db, language, category, search, startDate, endDate)
		if err != nil {
			http.Error(w, "Failed to count news articles", http.StatusInternalServerError)
			return
		}
		
		// Get available categories from articles
		categories := getCategoriesFromArticles(articles)
		
		totalPages := (totalCount + limit - 1) / limit
		if totalPages == 0 {
			totalPages = 1
		}
		
		// Format dates for the template
		startDateStr := ""
		endDateStr := ""
		
		// Generate page URLs for pagination
		pageURLs := make(map[int]string)
		for i := 1; i <= totalPages; i++ {
			pageURLs[i] = buildPageURL(i, category, search, startDate, endDate)
		}
		
		templ.Handler(news.Handler(page, language, phrases, articles, categories, pageNum, totalPages, category, search, startDateStr, endDateStr, pageURLs)).ServeHTTP(w, r)
	})
}

// Helper function to extract categories from articles
func getCategoriesFromArticles(articles []database.NewsArticle) []string {
	categoriesMap := make(map[string]bool)
	for _, article := range articles {
		categoriesMap[article.Category] = true
	}
	
	categories := make([]string, 0, len(categoriesMap))
	for category := range categoriesMap {
		categories = append(categories, category)
	}
	
	return categories
}

// NewsArticle handles individual news article pages
func NewsArticle(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract slug from URL path
		slug := r.PathValue("slug")
		if slug == "" {
			http.Error(w, "Article not found", http.StatusNotFound)
			return
		}
		
		page := "news_article"
		language := r.Context().Value(middleware.LanguageKey).(string)
		phrases := r.Context().Value(middleware.PhrasesKey).(map[string]map[string]string)
		
		// Fetch article from database
		article, err := database.GetNewsArticleBySlug(db, slug, language)
		if err != nil {
			http.Error(w, "Failed to fetch article", http.StatusInternalServerError)
			return
		}
		
		if article == nil {
			http.Error(w, "Article not found", http.StatusNotFound)
			return
		}
		
		templ.Handler(news.ArticleHandler(page, language, phrases, article)).ServeHTTP(w, r)
	})
}
