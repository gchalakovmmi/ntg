NAME := ntg
.PHONY: clear backend backend-logs database database-logs database-connect all up down restart

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

database:
	@echo "=== DataBase ==="
	@echo "Recreating container..."
	@docker compose -f docker-compose-build.yaml up -d --no-deps --force-recreate database

database-logs:
	@docker logs --follow $(NAME)-database-1

database-connect:
	@docker exec -it $(NAME)-database-1 psql -h localhost -U changeme -d app

all: backend database

up:
	docker compose -f docker-compose-build.yaml up -d

down:
	docker compose -f docker-compose-build.yaml down

restart: down up
