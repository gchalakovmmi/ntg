NAME := ntg
.PHONY: clear backend backend-logs all up down restart

clear:
	@clear

backend:
	@echo "=== Backend ==="
	@echo "Compiling source code..."
	@cd app && make clean generate build
	@echo "Recreating container..."
	@docker compose -f docker-compose-build.yaml up -d --no-deps --force-recreate backend

backend-logs:
	@docker logs --follow $(NAME)-backend-1

all: backend

up:
	docker compose -f docker-compose-build.yaml up -d

down:
	docker compose -f docker-compose-build.yaml down

restart: down up
