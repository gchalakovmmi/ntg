FROM alpine:latest
WORKDIR /app
COPY bin/app ./app
COPY web/static/ ./static/
EXPOSE 8080
ENTRYPOINT ["./app"]
