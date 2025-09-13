package main

import (
	"os"
	"fmt"
	"log"
	"net/http"
	"log/slog"
	"NTG/internal/config"
	"NTG/internal/server"
	"database/sql"
	_ "modernc.org/sqlite"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize logger with config level
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.LogLevel}))
	slog.SetDefault(logger)

	// Initialize database connection
	db, err := sql.Open("sqlite", "data/app.db")
	if err != nil {
		slog.Error("Failed to open database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	// Test database connection
	if err := db.Ping(); err != nil {
		slog.Error("Failed to connect to database", "error", err)
		os.Exit(1)
	}

	slog.Info("Database connection established")

	// Create and start server
	srv := server.New(cfg, db)
	mux := srv.CreateHandlers()

	// Start the server
	slog.Info(fmt.Sprintf("Serving on port %s...", cfg.Port))
	log.Fatal(http.ListenAndServe(":"+cfg.Port, mux))
}
