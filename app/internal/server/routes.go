package server

import (
    "net/http"
    "NTG/internal/handlers"
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
            Path:    "schedule",
            Handler: handlers.Schedule(),
        },
    }
}
