package main

import (
    "fmt"
    "log"
    "net/http"

    "NTG/internal/config"
    "NTG/internal/server"
)

func main() {
    // Load configuration
    cfg := config.Load()

    // Create server
    srv := &server.Server{}
    handler := srv.CreateHandler()

    // Start server
    fmt.Printf("Server starting on port %s...\n", cfg.Port)
    log.Fatal(http.ListenAndServe(":"+cfg.Port, handler))
}
