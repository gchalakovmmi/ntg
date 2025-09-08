package database

import (
	"database/sql"
	"log"

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
