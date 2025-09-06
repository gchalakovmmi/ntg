BINARY_NAME := app

.PHONY: build run tidy clean generate

generate:
		@echo "Generating Templ files..."
		templ generate

build: generate
		@echo "Building binary..."
		CGO_ENABLED=0 go build -o cmd/app/app cmd/app/main.go

run: generate
		@echo "Running Application..."
		env $$(grep -v '^#' env.vars | xargs) go run cmd/app/main.go

clean:
		@echo "Cleaning binaries and generated files..."
		find . -name "*_templ.go" -delete
