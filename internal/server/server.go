package server

import (
    "net/http"
    "NTG/internal/handlers/health"
    "NTG/web/templates/pages/home"
    "github.com/a-h/templ"
)

type Server struct {
    // You can add server-specific configuration here if needed
}

func (s *Server) CreateHandler() http.Handler {
    mux := http.NewServeMux()
    
    // Serve static files - fix the path handling
    fs := http.FileServer(http.Dir("./web/static"))
    mux.Handle("/static/", http.StripPrefix("/static/", fs))
    
    // Health check endpoint
    mux.HandleFunc("/health", health.Handler)
    
    // Home page
    mux.Handle("/", templ.Handler(home.Home()))
    
    return mux
}
