BINARY_NAME := app

.PHONY: build run tidy clean generate

generate:
	@echo "Generating Templ files..."
	templ generate

build: clean generate database
	@echo "Building binary..."
	CGO_ENABLED=0 go build -o cmd/app/app cmd/app/main.go

run:
	@echo "Running Application..."
	env $$(grep -v '^#' env.vars | xargs) go run cmd/app/main.go

clean:
	@echo "Cleaning binaries and generated files..."
	find . -name "*_templ.go" -delete

database:
	@echo "Removing old database file..."
	rm -f data/app.db
	@echo "Creating and populating database..."
	for file in $$(find data/ddl -name "*.sql" | sort -V); do echo "Executing $$file"; sqlite3 data/app.db < "$$file"; done
	for file in $$(find data/dml -name "*.sql" | sort -V); do echo "Executing $$file"; sqlite3 data/app.db < "$$file"; done
