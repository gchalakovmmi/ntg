package server

import (
	"net/http"
	"NTG/internal/config"
	"NTG/internal/handlers"
)

// Holds server specific configs
type Server struct {
	config					*config.Config
	//dbConnDetails		*db.ConnDetails
}

// A method of the Server struct creating all http handlers
func (srv *Server) CreateHandlers() (http.Handler) {
	mux := http.NewServeMux()
	
	// Serve static files
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/static/"))))
	
	// Health check endpoint
	mux.Handle("/health", handlers.Health())
	
	// Home page
	mux.Handle("/home", handlers.Home())

	// Root
	mux.Handle("/", http.RedirectHandler("/home", http.StatusSeeOther))
	
	return mux
}

// Populates and returns a pointer 
// to a Server configuration struct
func New(cfg *config.Config) (*Server) {
	// Get DB connection details
	// db.GetConfig

	return &Server{
		config:				cfg,
		//dbConnDetails:	dbConnDetails,
	}
}
