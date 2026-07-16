FROM golang:1.26-alpine AS builder

RUN apk add --no-cache git

RUN go install go.k6.io/xk6/cmd/xk6@latest

# Builds k6 with the xk6-dashboard plugin
RUN /go/bin/xk6 build --with github.com/grafana/xk6-dashboard@v0.7.7

FROM scratch

COPY --from=builder /go/k6 /k6

EXPOSE 5665

ENTRYPOINT ["/k6"]
