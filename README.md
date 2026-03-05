## Gestão de Pedidos de Viagem Corporativa

Aplicação **Full Stack** para gerenciar pedidos de viagem corporativa, composta por:

- **Backend** em `Laravel` expondo uma **API RESTful**.
- **Frontend** em `Vue 3 + Vite` com interface interativa para usuários finais e administradores.

### Arquitetura Geral

- **Autenticação**
  - Endpoint `POST /api/login` que devolve um **JWT** (`access_token`) no padrão `Bearer`.
  - O frontend armazena o token em `localStorage` e o envia no header `Authorization: Bearer <token>`.
  - Middleware `auth.jwt` no backend valida o token, carrega o usuário e protege as rotas.

- **Domínio de viagens**
  - Modelo `TravelRequest` com:
    - `id`
    - `requester_id` (usuário solicitante)
    - `requester_name`
    - `destination`
    - `departure_date`
    - `return_date`
    - `status` (`solicitado`, `aprovado`, `cancelado`)
  - Regras de negócio:
    - Apenas **admin** pode alterar o status.
    - Cancelamento só é permitido se o pedido **ainda não tiver sido aprovado**.
    - Ao aprovar/cancelar, uma **notificação por e-mail** é disparada para o solicitante.

### Endpoints principais (API RESTful)

- `POST /api/login`
  - Autenticação com `email` e `password`.
  - Retorna: `access_token`, `token_type`, `user`.

- `GET /api/travel-requests`
  - Lista pedidos de viagem.
  - Filtros opcionais via query string:
    - `status` (`solicitado|aprovado|cancelado`)
    - `destination`
    - `from_date` (data mínima de ida)
    - `to_date` (data máxima de volta)

- `POST /api/travel-requests`
  - Cria um pedido de viagem vinculado ao usuário autenticado.
  - Corpo:
    - `destination` (string)
    - `departure_date` (date, >= hoje)
    - `return_date` (date, >= `departure_date`)

- `GET /api/travel-requests/{id}`
  - Consulta detalhada de um pedido de viagem.

- `PATCH /api/travel-requests/{id}/status`
  - Atualiza status para `aprovado` ou `cancelado`.
  - Restrito a usuários com `role = admin`.

### Frontend (Vue.js)

- **Login**
  - Tela dedicada (`/login`) que consome `POST /api/login`.
  - Armazena o `access_token` e os dados do usuário.

- **Dashboard**
  - Rota `/` protegida (apenas autenticados).
  - Tabela com todos os pedidos e filtros por:
    - status,
    - destino,
    - período (data de ida/volta).

- **Criação de pedidos**
  - Formulário para criar um novo pedido, com feedback de sucesso/erro e loading.

- **Atualização de status**
  - Para usuários admin, ações de **Aprovar** e **Cancelar** diretamente na tabela.

- **Feedback ao usuário**
  - Mensagens claras de erro/sucesso em login, criação e atualização de pedidos.
  - Spinners de loading para operações assíncronas.

### Como rodar o projeto com Docker

- **Pré-requisitos**
  - Docker e Docker Compose instalados.

- **Passos**
  - Na pasta `backend`:
    - Copiar `.env.example` para `.env` e garantir `DB_CONNECTION=sqlite`.
  - Na pasta `frontend`:
    - Copiar `.env.example` para `.env` e garantir `VITE_API_BASE_URL=http://localhost:8000/api`.
  - Na raiz do projeto, execute:
    - `docker compose build`
    - `docker compose up`
  - Serviços:
    - Backend Laravel: `http://localhost:8000`
    - Frontend Vue (Vite): `http://localhost:5173`
  - O frontend já está configurado para enviar chamadas de `/api` para o serviço `backend` via variável `VITE_API_BASE_URL`.

### Como rodar localmente (sem Docker)

- **Backend (Laravel)**
  - Requisitos: PHP 8.2+, Composer, extensões `pdo_sqlite`, `xml`, `dom`.
  - Na pasta `backend`:
    - `composer install`
    - Copiar `.env.example` para `.env` e garantir `DB_CONNECTION=sqlite`.
    - `php artisan key:generate`
    - `touch database/database.sqlite`
    - `php artisan migrate`
    - `php artisan serve --host=0.0.0.0 --port=8000`

- **Frontend (Vue + Vite + TypeScript)**
  - Na pasta `frontend`:
    - `npm install`
    - `npm run dev -- --host 0.0.0.0 --port 5173`
  - Em desenvolvimento, o Vite faz proxy de `/api` para o backend configurado via `VITE_API_BASE_URL` (`http://localhost:8000/api`).
