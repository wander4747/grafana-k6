<div align="center">
  <img src="etc/k6.svg" alt="k6 Logo" width="200"/>
</div>

# 📈 Grafana k6

**Grafana k6** é uma ferramenta de teste de carga de código aberto, desenvolvedor-friendly e altamente extensível. Com ela, é possível antecipar problemas de desempenho e garantir a confiabilidade do sistema sob diferentes condições de carga.

---

## ✅ Tipos de Testes

### 🔹 Smoke Test  
Testa o funcionamento básico da aplicação com carga mínima e curta duração.

- **Exemplo:** 1 usuário por 1 minuto  
- **Quando usar:** Após atualizações no código ou nos scripts de teste, para validar o funcionamento geral e obter métricas básicas.

---

### 🔹 Load Test  
Simula usuários simultâneos e carga contínua, avaliando o desempenho em condições normais de uso.

- **Exemplo:**  
  - 100 usuários - 5 min  
  - 100 usuários - 10 min  
  - 0 usuários - 5 min  
- **Quando usar:** Para verificar se o sistema suporta a carga de produção e identificar gargalos iniciais.

---

### 🔹 Stress Test  
Avalia o sistema sob carga extrema, além dos limites normais de uso.

- **Exemplo:**  
  - 100 usuários - 5 min  
  - 200 usuários - 20 min  
  - 100 usuários - 5 min  
- **Quando usar:** Para identificar o ponto de falha do sistema e avaliar sua capacidade de recuperação.

---

### 🔹 Spike Test  
Aplica uma carga muito alta em um curto intervalo de tempo.

- **Exemplo:**  
  - 100 usuários - 1 min  
  - 2000 usuários - 30s  
  - 100 usuários - 1 min  
- **Quando usar:** Para verificar a resposta do sistema a picos repentinos de acesso.

---

### 🔹 Soak Test  
Testa o sistema por longos períodos para identificar degradações, vazamentos de memória e problemas de estabilidade.

- **Exemplo:**  
  - 100 usuários - 5 min  
  - 100 usuários - 8 horas  
  - 0 usuários - 1 min  
- **Quando usar:** Após mudanças importantes ou em sistemas que precisam estar sempre disponíveis.

---

### 🔹 Breakpoint Test  
Aponta os limites máximos do sistema, interrompendo o teste quando o sistema começar a falhar.

- **Exemplo:**  
  - 20.000 usuários - 2 horas  
- **Quando usar:** Para entender os limites superiores do sistema, especialmente após grandes alterações na infraestrutura ou no código.

---

## 🧭 Guia Rápido de Testes

| Tipo        | Carga                    | Duração              | Uso Recomendado                                                                 |
|-------------|--------------------------|----------------------|----------------------------------------------------------------------------------|
| **Smoke**   | Baixa                    | Curta (segundos/min) | Validação rápida após mudanças no código/sistema.                              |
| **Load**    | Média (produção)         | Média (5–60 min)     | Medir desempenho com carga esperada do dia a dia.                              |
| **Stress**  | Alta                     | Média (5–60 min)     | Testar limites sob carga crescente.                                            |
| **Spike**   | Muito alta (repentina)   | Curta (minutos)      | Validar resiliência a picos súbitos de usuários.                               |
| **Soak**    | Média                    | Longa (horas)        | Avaliar estabilidade a longo prazo.                                            |
| **Breakpoint** | Crescente até falhar | Indeterminada         | Encontrar o ponto de quebra do sistema.                                        |

🔗 [Documentação oficial dos testes](https://grafana.com/docs/k6/latest/testing-guides/test-types/)

---

## 🚀 Como Usar

### 1. Subir o ambiente com Docker Compose

```sh
docker compose up -d
```

### 2. Build da imagem com xk6

Navegue até a pasta `xk6` e execute:

```sh
docker build -t k6-dashboard .
```

### 3. Executar um teste

Escolha o tipo de teste e rode com:

```sh
docker run -it -p 5665:5665 \
  -v $(pwd)/k6:/scripts \
  --network host \
  k6-dashboard \
  run --out dashboard=period=2s /scripts/test-types/smoke_test.js
```

> 💡 Substitua o arquivo `test-types/smoke_test.js` pelo tipo de teste que deseja executar (e.g., `test-types/load_test.js`, `test-types/stress_test.js` etc.)