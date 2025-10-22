NAME := ntg
IMAGE := ntg-app
DREG := dreg.pulpudev.com
.PHONY: clear app app-logs all up down restart

clear:
	@clear

app:
	@echo "=== App ==="
	@echo "Compiling source code..."
	@cd app && make clean database build
	@echo "Building image..."
	@docker compose up -d --build

push: app
	@echo "=== Push ==="
	@docker tag $(IMAGE) $(DREG)/$(IMAGE):latest
	@docker push $(DREG)/$(IMAGE):latest
	@ssh root@ntg-plovdiv.net

app-logs:
	@docker logs --follow $(NAME)-app-1


all: app

up:
	docker compose up -d

down:
	docker compose down

restart: down up
