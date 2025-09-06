FROM alpine:latest
WORKDIR /app
COPY cmd/app .
COPY web/static/ ./web/static
EXPOSE 8080
ENTRYPOINT ["/app/app"]
