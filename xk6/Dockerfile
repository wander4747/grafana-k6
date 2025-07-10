FROM golang:1.24-alpine AS builder

# Instala git (necessário para xk6 build)
RUN apk add --no-cache git

# Instala o xk6
RUN go install go.k6.io/xk6/cmd/xk6@latest

# Compila o k6 com o plugin xk6-dashboard
RUN /go/bin/xk6 build --with github.com/grafana/xk6-dashboard@v0.7.7

# Imagem final minimalista
FROM scratch

COPY --from=builder /go/k6 /k6

EXPOSE 5665

ENTRYPOINT ["/k6"]
