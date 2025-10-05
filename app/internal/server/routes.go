package server

import (
	"NTG/internal/config"
	"NTG/internal/handlers"
	"database/sql"
	"net/http"
)

// Route defines a single route with its handler
type Route struct {
	Path    string
	Handler http.Handler
}

// GetRoutes returns all defined routes with their handlers
func GetRoutes(cfg *config.Config, db *sql.DB) []Route {
	return []Route{
		{
			Path:    "home",
			Handler: handlers.Home(),
		},
		{
			Path:    "about_us",
			Handler: handlers.AboutUs(),
		},
		{
			Path:    "documents",
			Handler: handlers.Documents(cfg, db),
		},
		{
			Path:    "academic_schedule",
			Handler: handlers.AcademicSchedule(),
		},
		{
			Path:    "parent_consultation",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "student_consultation",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "class_tests",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "olympiads",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "exams",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "admission",
			Handler: handlers.Admission(),
		},
		{
			Path:    "programs_and_projects",
			Handler: handlers.ProgramsAndProjects(),
		},
		{
			Path:    "school_life",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "education",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "professional_education",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "scholarships",
			Handler: handlers.Scholarships(),
		},
		{
			Path:    "general_education",
			Handler: handlers.GeneralEducation(),
		},
		{
			Path:    "interest_activities",
			Handler: handlers.InterestActivities(),
		},
		{
			Path:    "e_diary",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "uniforms",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "document_templates",
			Handler: handlers.DocumentTemplates(),
		},
		{
			Path:    "nvo",
			Handler: handlers.Hbo(),
		},
		{
			Path:    "dzi",
			Handler: handlers.Dzi(),
		},
		{
			Path:    "zdippk",
			Handler: handlers.Zdippk(),
		},
		{
			Path:    "academic_schedule",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "partners",
			Handler: handlers.Partners(),
		},
		{
			Path:    "news",
			Handler: handlers.News(db),
		},
		{
			Path:    "news/{slug}",
			Handler: handlers.NewsArticle(db),
		},
		{
			Path:    "contacts",
			Handler: handlers.Contacts(),
		},
		{
			Path:    "school_anthem",
			Handler: handlers.School_anthem(),
		},
	}
}
