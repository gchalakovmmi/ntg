package config

import (
	"os"
	"log/slog"
)

type Config struct {
	Port				string
	InstanceName	string
	LogLevel		slog.Level
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

	return &Config{
		Port:				port,
		InstanceName:	instanceName,
		LogLevel:		logLevel,
	}
}
