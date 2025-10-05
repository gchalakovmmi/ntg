package server

import (
	"net/http"
	"strings"
	"NTG/internal/config"
	"NTG/internal/handlers"
	"NTG/internal/middleware"
	"database/sql"
)

// Holds server specific configs
type Server struct {
	config		*config.Config
	db				*sql.DB
	routes		[]Route
}

// A method of the Server struct creating all http handlers
func (srv *Server) CreateHandlers() http.Handler {
	mux := http.NewServeMux()

	// Serve static files
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/static/"))))
	mux.Handle("/docs/", http.StripPrefix("/docs/", http.FileServer(http.Dir("./web/static/docs/"))))

	// Health check endpoint
	mux.Handle("/health", handlers.Health())

	// Root redirect to preferred language
	mux.Handle("/", srv.rootRedirectHandler())

	// Handle requests with language prefix
	mux.Handle("/{lang}/", middleware.WithLanguage(srv.db, srv.languageAwareHandler()))

	// Handle requests without language prefix (redirect to preferred language)
	mux.Handle("/{page}", srv.pageRedirectHandler())

	return mux
}

// rootRedirectHandler redirects to the preferred language home page
func (srv *Server) rootRedirectHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get preferred language from cookie or use default
		lang := srv.getPreferredLanguage(r)
		
		// Redirect to language-specific home page
		http.Redirect(w, r, "/"+lang+"/home", http.StatusSeeOther)
	})
}

// pageRedirectHandler redirects pages without language prefix to preferred language
func (srv *Server) pageRedirectHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get the page name from URL path
		page := strings.Trim(r.URL.Path, "/")
		if page == "" {
			page = "home"
		}
		
		// Get preferred language from cookie or use default
		lang := srv.getPreferredLanguage(r)
		
		// Redirect to language-specific page
		http.Redirect(w, r, "/"+lang+"/"+page, http.StatusSeeOther)
	})
}

// languageAwareHandler routes requests with language prefix to appropriate handlers
func (srv *Server) languageAwareHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract the page from the URL path
		pathSegments := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
		if len(pathSegments) < 2 {
			// Redirect to home if no page specified
			http.Redirect(w, r, "/"+pathSegments[0]+"/home", http.StatusSeeOther)
			return
		}

		page := pathSegments[1]
		if page == "" {
			page = "home"
		}

		// Special handling for news article routes
		if page == "news" && len(pathSegments) > 2 {
			// This is a news article route like /{lang}/news/{slug}
			// Use the news article handler
			for _, route := range srv.routes {
				if route.Path == "news/{slug}" {
					route.Handler.ServeHTTP(w, r)
					return
				}
			}
		}

		// Find the handler for this page
		var handler http.Handler
		found := false
		
		for _, route := range srv.routes {
			if route.Path == page {
				handler = route.Handler
				found = true
				break
			}
		}

		if !found {
			// Redirect to home for unknown pages
			http.Redirect(w, r, "/"+pathSegments[0]+"/home", http.StatusSeeOther)
			return
		}

		handler.ServeHTTP(w, r)
	})
}

// getPreferredLanguage gets the preferred language from cookie or defaults to "bg"
func (srv *Server) getPreferredLanguage(r *http.Request) string {
	lang := "bg" // Default language
	if cookie, err := r.Cookie("preferred_language"); err == nil {
		lang = cookie.Value
	}
	return lang
}

// Populates and returns a pointer to a Server configuration struct
func New(cfg *config.Config, db *sql.DB) *Server {
	return &Server{
		config: cfg,
		db:	 db,
		routes: GetRoutes(cfg, db),
	}
}
