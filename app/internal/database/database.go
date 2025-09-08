package database

import (
	"database/sql"
	"log/slog"

	_ "github.com/mattn/go-sqlite3"
)

func GetSupportedLanguages(db *sql.DB) ([]string, error) {
	rows, err := db.Query("SELECT DISTINCT language FROM phrases;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []string
	for rows.Next() {
		var language string
		err := rows.Scan(&language)
		if err != nil {
			return nil, err
		}
		languages = append(languages, language)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return languages, nil
}

// GetPhrases retrieves all phrases for a specific language and page
func GetPhrases(db *sql.DB, language, page string) (map[string]map[string]string, error) {
	rows, err := db.Query(`
		SELECT section, key, phrase 
		FROM phrases 
		WHERE language = ? AND page = ?
	`, language, page)
	
	if err != nil {
		slog.Error("Database query failed", "error", err, "language", language, "page", page)
		return nil, err
	}
	defer rows.Close()

	phrases := make(map[string]map[string]string)
	
	for rows.Next() {
		var section, key, phrase string
		err := rows.Scan(&section, &key, &phrase)
		if err != nil {
			slog.Error("Failed to scan phrase row", "error", err)
			continue
		}
		
		if phrases[section] == nil {
			phrases[section] = make(map[string]string)
		}
		phrases[section][key] = phrase
	}

	if err = rows.Err(); err != nil {
		slog.Error("Error iterating phrase rows", "error", err)
		return nil, err
	}

	return phrases, nil
}
