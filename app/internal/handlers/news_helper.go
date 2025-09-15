package handlers

import (
	"time"
	"fmt"
)

func formatDate(date *time.Time) string {
	if date != nil {
		return date.Format("2006-01-02")
	}
	return ""
}

func buildPageURL(page int, category, search string, startDate, endDate *time.Time) string {
	params := make(map[string]string)
	
	params["page"] = fmt.Sprintf("%d", page)
	
	if category != "" {
		params["category"] = category
	}
	
	if search != "" {
		params["search"] = search
	}
	
	// Only add date filters if they are set
	if startDate != nil && !startDate.IsZero() {
		params["start_date"] = startDate.Format("2006-01-02")
	}
	
	if endDate != nil && !endDate.IsZero() {
		params["end_date"] = endDate.Format("2006-01-02")
	}
	
	// Build query string
	query := ""
	for key, value := range params {
		if query != "" {
			query += "&"
		}
		query += key + "=" + value
	}
	
	if query != "" {
		return "?" + query
	}
	return ""
}
