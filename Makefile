docker-build: ## build docker
	docker build --platform linux/amd64 -t wedding-api -f Dockerfile .
	docker tag wedding-api luannt2909/wedding-api:latest
	docker push luannt2909/wedding-api:latest