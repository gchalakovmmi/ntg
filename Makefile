NAME := ntg
.PHONY: clear app app-logs all up down restart

clear:
	@clear

app:
	@echo "=== App ==="
	@echo "Compiling source code..."
	@cd app && make clean database build
	@echo "Building image..."
	@docker compose up -d

app-logs:
	@docker logs --follow $(NAME)-app-1


all: app

up:
	docker compose up -d

down:
	docker compose down

restart: down up
