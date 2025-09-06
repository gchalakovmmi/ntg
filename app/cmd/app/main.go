package main

import (
	"os"
	"fmt"
	"log"
	"net/http"
	"log/slog"
	"NTG/internal/config"
	"NTG/internal/server"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize logger with config level
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.LogLevel}))
	slog.SetDefault(logger)

	// Create and start server
	srv := server.New(cfg)
	mux := srv.CreateHandlers()

	// Start the server
	slog.Info(fmt.Sprintf("Serving on port %s...", cfg.Port))
	log.Fatal(http.ListenAndServe(":"+cfg.Port, mux))
}
