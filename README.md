<div align="center">
  <img src="etc/k6.svg" alt="k6 Logo" width="200"/>
</div>

# 📈 Grafana k6 - Testes de Carga

**Grafana k6** é uma ferramenta de teste de carga de código aberto, desenvolvedor-friendly e altamente extensível. Com ela, é possível antecipar problemas de desempenho e garantir a confiabilidade do sistema sob diferentes condições de carga.

Este projeto usa o **[web dashboard nativo do k6](https://grafana.com/docs/k6/latest/results-output/web-dashboard/)** para gerar um dashboard web em tempo real com as métricas de cada teste.

---

## 📋 Índice

1. [Tipos de Testes](#tipos-de-testes)
2. [Guia Rápido](#guia-rápido)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Como Usar](#como-usar)
5. [Exemplo de Execução](#exemplo-de-execução)

---

## Tipos de Testes

### Smoke Test

**O quê:** Teste básico com carga mínima  
**Carga:** 1 usuário  
**Duração:** 1 minuto

**Quando usar:**
- Após atualizações no código ou scripts de teste
- Para validação rápida antes de testes mais complexos
- Para obter métricas básicas do sistema

**Arquivo:** `k6/test-types/smoke_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/smoke_test.js
```

---

### Load Test

**O quê:** Teste com carga normal de produção  
**Carga:** 100 usuários simultâneos  
**Duração:** 20 minutos (5 min ramp-up + 10 min carga + 5 min ramp-down)

**Quando usar:**
- Verificar se o sistema suporta a carga esperada do dia a dia
- Identificar gargalos iniciais
- Medir desempenho em condições normais

**Arquivo:** `k6/test-types/load_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/load_test.js
```

---

### Stress Test

**O quê:** Teste com carga crescente até falha  
**Carga:** 100 a 200 usuários progressivamente  
**Duração:** 30 minutos

**Quando usar:**
- Encontrar o ponto de falha do sistema
- Avaliar capacidade de recuperação
- Testar limites sob carga crescente

**Arquivo:** `k6/test-types/stress_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/stress_test.js
```

---

### Spike Test

**O quê:** Teste com picos súbitos de carga muito alta  
**Carga:** De 100 para 2000 usuários em 30 segundos  
**Duração:** 2 minutos

**Quando usar:**
- Verificar resposta do sistema a acessos repentinos
- Avaliar resiliência e recuperação rápida
- Validar comportamento em horários de pico

**Arquivo:** `k6/test-types/spike_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/spike_test.js
```

---

### Soak Test

**O quê:** Teste prolongado para verificar estabilidade  
**Carga:** 100 usuários contínuos  
**Duração:** 8 horas

**Quando usar:**
- Identificar vazamentos de memória
- Avaliar degradação gradual do desempenho
- Garantir estabilidade em sistemas sempre disponíveis

**Arquivo:** `k6/test-types/soak_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/soak_test.js
```

---

### Breakpoint Test

**O quê:** Teste progressivo até encontrar o ponto de quebra  
**Carga:** Crescente até falha (até 20.000 usuários)  
**Duração:** Variável (até 2 horas)

**Quando usar:**
- Encontrar os limites máximos absolutos do sistema
- Após grandes alterações na infraestrutura
- Para entender a capacidade total

**Arquivo:** `k6/test-types/breakpoint_test.js`

```bash
docker exec -it k6_run k6 run /scripts/test-types/breakpoint_test.js
```

---

## Guia Rápido

| Tipo | Carga | Duração | Frequência | Objetivo |
|------|-------|---------|-----------|----------|
| **Smoke** | Mínima | < 1 min | Toda mudança | Validação rápida |
| **Load** | Normal | 5-60 min | Diária | Monitorar desempenho |
| **Stress** | Alta crescente | 5-60 min | Semanal | Encontrar limite |
| **Spike** | Muito alta | Minutos | Semanal | Testar picos |
| **Soak** | Normal | Horas | Semanal | Estabilidade |
| **Breakpoint** | Máxima | Variável | Mensal | Capacidade total |

🔗 [Documentação oficial - Tipos de Testes](https://grafana.com/docs/k6/latest/testing-guides/test-types/)

---

## Estrutura do Projeto

```
grafana-k6/
├── README.md                    # Este arquivo
├── docker-compose.yaml          # Sobe go-server e k6 (imagem oficial grafana/k6)
├── etc/                         # Arquivos auxiliares
├── go-server/                   # Servidor Go para teste
│   ├── Dockerfile
│   ├── go.mod
│   └── main.go
└── k6/                          # Scripts de teste k6
    ├── example/                 # Exemplos de funcionalidades
    │   ├── check.js             # Testes com assertions
    │   ├── group.js             # Agrupamento de requisições
    │   ├── metrics.js           # Métricas customizadas
    │   ├── request.js           # Requisições HTTP
    │   ├── tags.js              # Etiquetas e categorização
    │   └── thresholds.js        # Limiares de sucesso
    ├── scenarios/               # Cenários de teste
    │   ├── constant-arrival-rate.js
    │   ├── constant-vus.js
    │   ├── per-vu-iterations.js
    │   └── shared-iterations.js
    └── test-types/              # Tipos de testes principais
        ├── smoke_test.js
        ├── load_test.js
        ├── stress_test.js
        ├── spike_test.js
        ├── soak_test.js
        └── breakpoint_test.js
```

---

## Como Usar

### Passo 1: Subir o Ambiente

```bash
docker compose up -d
```

Isso inicia:
- Servidor Go de teste em `http://localhost:1234`
- Container `k6_run` (imagem oficial `grafana/k6`), ocioso e pronto pra rodar testes

### Passo 2: Executar um Teste

Escolha um tipo de teste e execute dentro do container já em pé:

```bash
docker exec -it k6_run k6 run /scripts/test-types/smoke_test.js
```

### Passo 3: Visualizar Resultados

Acesse o dashboard em `http://localhost:5665` para ver as métricas em tempo real.

---

## Exemplo de Execução

### Executar Smoke Test

```bash
docker exec -it k6_run k6 run /scripts/test-types/smoke_test.js
```

### Executar Load Test

```bash
docker exec -it k6_run k6 run /scripts/test-types/load_test.js
```

### Executar Stress Test

```bash
docker exec -it k6_run k6 run /scripts/test-types/stress_test.js
```

**💡 Dica:** Substitua o arquivo final pelo teste desejado. Todos seguem o mesmo padrão.

