package config

import (
	"fmt"
	"os"
	"log/slog"
	"time"
)

type Config struct {
	Port					string
	InstanceName		string
	LogLevel				slog.Level
	CurrentSchoolYear string
}

func getLogLevel(level string) slog.Level {
	switch level {
	case "DEBUG":
		return slog.LevelDebug
	case "INFO":
		return slog.LevelInfo
	case "WARN":
		return slog.LevelWarn
	case "ERROR":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}

func Load() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	instanceName := os.Getenv("INSTANCE_NAME")
	if instanceName == "" {
		instanceName = "myapp-1"
	}

	logLevel := getLogLevel(os.Getenv("LOG_LEVEL"))
	
	// Get current school year from environment or calculate it
	currentSchoolYear := os.Getenv("CURRENT_SCHOOL_YEAR")
	if currentSchoolYear == "" {
		// Default to current year if not set
		now := time.Now()
		if now.Month() >= 9 { // School year starts in September
			currentSchoolYear = fmt.Sprintf("%d-%d", now.Year(), now.Year()+1)
		} else {
			currentSchoolYear = fmt.Sprintf("%d-%d", now.Year()-1, now.Year())
		}
	}

	return &Config{
		Port:						port,
		InstanceName:			instanceName,
		LogLevel:				logLevel,
		CurrentSchoolYear:	currentSchoolYear,
	}
}
