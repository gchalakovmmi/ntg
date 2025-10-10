package database

import (
	"database/sql"
	"log/slog"
	"time"
)

type NewsArticle struct {
	Language         string
	Category         string
	UploadDate       time.Time
	Title            string
	ShortDescription string
	LongDescription  string
	Slug             string
	ImageURL         string
}

// GetNewsArticles fetches news articles with optional filtering
func GetNewsArticles(db *sql.DB, language, category, search string, startDate, endDate *time.Time, limit, offset int) ([]NewsArticle, error) {
	query := `
		SELECT language, category, upload_date, title, short_description, long_description, slug, image_url
		FROM news
		WHERE language = ?
	`
	args := []interface{}{language}

	// Add filters
	if category != "" {
		query += " AND category = ?"
		args = append(args, category)
	}
	if search != "" {
		query += " AND (title LIKE ? OR short_description LIKE ? OR long_description LIKE ?)"
		searchTerm := "%" + search + "%"
		args = append(args, searchTerm, searchTerm, searchTerm)
	}
	if startDate != nil {
		query += " AND upload_date >= ?"
		args = append(args, startDate.Format("2006-01-02"))
	}
	if endDate != nil {
		query += " AND upload_date <= ?"
		args = append(args, endDate.Format("2006-01-02"))
	}

	query += " ORDER BY upload_date DESC LIMIT ? OFFSET ?"
	args = append(args, limit, offset)

	rows, err := db.Query(query, args...)
	if err != nil {
		slog.Error("Failed to fetch news articles", "error", err)
		return nil, err
	}
	defer rows.Close()

	var articles []NewsArticle
	for rows.Next() {
		var article NewsArticle
		err := rows.Scan(
			&article.Language,
			&article.Category,
			&article.UploadDate,
			&article.Title,
			&article.ShortDescription,
			&article.LongDescription,
			&article.Slug,
			&article.ImageURL,
		)
		if err != nil {
			slog.Error("Failed to scan news article", "error", err)
			continue
		}
		articles = append(articles, article)
	}

	return articles, nil
}

// GetNewsArticleBySlug fetches a single news article by its slug and language
func GetNewsArticleBySlug(db *sql.DB, slug, language string) (*NewsArticle, error) {
	query := `
		SELECT language, category, upload_date, title, short_description, long_description, slug, image_url
		FROM news
		WHERE slug = ? AND language = ?
	`
	var article NewsArticle
	err := db.QueryRow(query, slug, language).Scan(
		&article.Language,
		&article.Category,
		&article.UploadDate,
		&article.Title,
		&article.ShortDescription,
		&article.LongDescription,
		&article.Slug,
		&article.ImageURL,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		slog.Error("Failed to fetch news article by slug", "error", err, "slug", slug, "language", language)
		return nil, err
	}
	return &article, nil
}

// GetNewsCategories fetches all available news categories for a language
func GetNewsCategories(db *sql.DB, language string) ([]string, error) {
	query := `
		SELECT DISTINCT category
		FROM news
		WHERE language = ?
		ORDER BY category
	`
	rows, err := db.Query(query, language)
	if err != nil {
		slog.Error("Failed to fetch news categories", "error", err)
		return nil, err
	}
	defer rows.Close()

	var categories []string
	for rows.Next() {
		var category string
		err := rows.Scan(&category)
		if err != nil {
			slog.Error("Failed to scan news category", "error", err)
			continue
		}
		categories = append(categories, category)
	}
	return categories, nil
}

// CountNewsArticles counts the total number of news articles with optional filtering
func CountNewsArticles(db *sql.DB, language, category, search string, startDate, endDate *time.Time) (int, error) {
	query := `
		SELECT COUNT(*)
		FROM news
		WHERE language = ?
	`
	args := []interface{}{language}

	// Add filters
	if category != "" {
		query += " AND category = ?"
		args = append(args, category)
	}
	if search != "" {
		query += " AND (title LIKE ? OR short_description LIKE ? OR long_description LIKE ?)"
		searchTerm := "%" + search + "%"
		args = append(args, searchTerm, searchTerm, searchTerm)
	}
	if startDate != nil {
		query += " AND upload_date >= ?"
		args = append(args, startDate.Format("2006-01-02"))
	}
	if endDate != nil {
		query += " AND upload_date <= ?"
		args = append(args, endDate.Format("2006-01-02"))
	}

	var count int
	err := db.QueryRow(query, args...).Scan(&count)
	if err != nil {
		slog.Error("Failed to count news articles", "error", err)
		return 0, err
	}
	return count, nil
}

// GetLatestNewsArticles fetches the last N news articles.
func GetLatestNewsArticles(db *sql.DB, language string, limit int) ([]NewsArticle, error) {
	query := `
		SELECT language, category, upload_date, title, short_description, long_description, slug, image_url
		FROM news
		WHERE language = ?
		ORDER BY upload_date DESC
		LIMIT ?
	`
	
	rows, err := db.Query(query, language, limit)
	if err != nil {
		slog.Error("Failed to fetch latest news articles", "error", err)
		return nil, err
	}
	defer rows.Close()
	
	var articles []NewsArticle
	for rows.Next() {
		var article NewsArticle
		err := rows.Scan(
			&article.Language,
			&article.Category,
			&article.UploadDate,
			&article.Title,
			&article.ShortDescription,
			&article.LongDescription,
			&article.Slug,
			&article.ImageURL,
		)
		if err != nil {
			slog.Error("Failed to scan news article", "error", err)
			continue
		}
		articles = append(articles, article)
	}
	
	return articles, nil
}
