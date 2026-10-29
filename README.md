# API de Gerenciamento de Pedidos

API REST desenvolvida em Node.js e Express para gerenciamento de pedidos de uma pequena loja.

## 🚀 Como Executar o Projeto

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Iniciar a aplicação em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
   *(ou para execução padrão: `npm start`)*

3. Executar os testes automatizados com Jest:
   ```bash
   npm test
   ```

---

## 🏗️ Arquitetura e Padrões Aplicados

A aplicação foi desenvolvida utilizando a arquitetura em camadas para isolar responsabilidades:

- **`routes/`**: Recebe a requisição HTTP e direciona para o Controller responsável.
- **`controllers/`**: Extrai parâmetros, repassa os dados para os serviços e constrói a resposta HTTP.
- **`services/`**: Contém toda a regra de negócio, validações de domínio e manipulação do armazenamento em memória.

---

## 📌 Regras de Domínio e Validações

### Domínios Aceitos
- **Tipo (`tipo`)**: `entrega`, `retirada`, `local`.
- **Prioridade (`prioridade`)**: `baixa`, `normal`, `alta`.
- **Status (`status`)**: `recebido`, `em_preparacao`, `enviado`, `entregue`, `cancelado`.

### Fluxo Permitido de Alteração de Status
- `recebido` ➔ `em_preparacao`, `cancelado`
- `em_preparacao` ➔ `enviado`, `cancelado`
- `enviado` ➔ `entregue`, `cancelado`
- `entregue` / `cancelado` ➔ Estados finais (sem alterações permitidas).

---

## 🔗 Endpoints da API

### 1. Criar Pedido
- **Método**: `POST`
- **Rota**: `/pedidos`
- **Exemplo de Body**:
  ```json
  {
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal"
  }
  ```
- **Resposta**: HTTP `201 Created`

### 2. Listar Pedidos
- **Método**: `GET`
- **Rota**: `/pedidos`
- **Resposta**: HTTP `200 OK`

### 3. Consultar Pedido por ID
- **Método**: `GET`
- **Rota**: `/pedidos/:id`
- **Resposta**: HTTP `200 OK` ou `404 Not Found`

### 4. Atualizar Status
- **Método**: `PATCH`
- **Rota**: `/pedidos/:id/status`
- **Exemplo de Body**:
  ```json
  {
    "status": "em_preparacao"
  }
  ```
- **Resposta**: HTTP `200 OK`, `400 Bad Request` ou `404 Not Found`

---

## 🤖 Registro do Uso de Inteligência Artificial

- **Uso de IA**: Sim, como ferramenta de auxílio no desenvolvimento.
- **Tarefas**: Auxílio na estruturação inicial do esqueleto das camadas e geração das suítes de teste com Jest/Supertest.
- **Sugestão aceita/modificada**: A IA sugeriu originalmente utilizar uma biblioteca como `Joi` ou `Zod` para validação de esquemas. A sugestão foi **modificada/rejeitada** para manter o projeto leve e simples, preferindo realizar validações manuais nativas na camada `service`, garantindo controle total sobre as mensagens de erro HTTP 400 sem dependências externas.

## INTEGRANTES

* Marcos Gabriel Bonici da Silva - RGM: 43547800
* Guilherme Gusman Conceição - RGM: 43471668
* Mateus Xavier Pinheiro de Jesus - RGM: 45814503
* Luís Eduardo Rodrigues Munhoz - RGM: 43829333
* Igor da Silva Reis - RGM: 44123019
* Nathan Silva Barros - RGM: 43672027
* Gabriel de Almeida - RGM: 43473512
