package server

import (
	"NTG/internal/handlers"
	"net/http"
)

// Route defines a single route with its handler
type Route struct {
	Path    string
	Handler http.Handler
}

// GetRoutes returns all defined routes with their handlers
func GetRoutes() []Route {
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
			Handler: handlers.Documents(),
		},
		{
			Path:    "regulations_plans",
			Handler: handlers.Documents(),
		},
		{
			Path:    "curriculum",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "education_type",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "budget",
			Handler: handlers.TempPage(),
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
			Handler: handlers.TempPage(),
		},
		{
			Path:    "programs",
			Handler: handlers.TempPage(),
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
			Path:    "general_education",
			Handler: handlers.GeneralEducation(),
		},
		{
			Path:    "interest_activities",
			Handler: handlers.TempPage(),
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
			Handler: handlers.TempPage(),
		},
		{
			Path:    "nvo",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "dzi",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "zdippk",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "academic_schedule",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "partners",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "news",
			Handler: handlers.TempPage(),
		},
		{
			Path:    "contacts",
			Handler: handlers.TempPage(),
		},
	}
}
