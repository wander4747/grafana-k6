FROM golang:1.26-alpine AS builder

RUN apk add --no-cache curl

WORKDIR /src

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app main.go

FROM scratch

WORKDIR /src

COPY --from=builder /src/app /src/app

EXPOSE 1234
CMD ["/src/app"]
