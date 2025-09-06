package config

import "os"

type Config struct {
    Port         string
    InstanceName string
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

    return &Config{
        Port:         port,
        InstanceName: instanceName,
    }
}

