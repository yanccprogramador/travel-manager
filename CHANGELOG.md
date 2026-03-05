## v0.1.0 - Gestão de viagens corporativas

- **Backend (Laravel)**
  - Criado modelo `TravelRequest` e migrações para armazenar pedidos de viagem com status (`solicitado`, `aprovado`, `cancelado`).
  - Adicionadas regras de negócio:
    - Apenas usuários com `role = admin` podem aprovar ou cancelar pedidos.
    - Pedidos já aprovados não podem mais ser cancelados.
  - Implementados endpoints RESTful:
    - `POST /api/login` para autenticação com retorno de **JWT**.
    - `GET /api/travel-requests` com filtros por status, destino e período.
    - `POST /api/travel-requests` para criação de pedidos atrelados ao usuário autenticado.
    - `GET /api/travel-requests/{id}` para consulta detalhada.
    - `PATCH /api/travel-requests/{id}/status` para atualização de status.
  - Implementado middleware `auth.jwt` com validação de token e carregamento do usuário.
  - Adicionadas notificações de aprovação/cancelamento via `TravelRequestStatusChanged`.

- **Frontend (Vue.js + Vite)**
  - Configurado roteamento com `vue-router`:
    - `/login` para autenticação.
    - `/` (dashboard) protegido por token.
  - Criada tela de **login** com consumo da API JWT e armazenamento do token em `localStorage`.
  - Implementado **Dashboard** com:
    - Formulário de criação de pedidos.
    - Tabela de pedidos com filtros (status, destino, período).
    - Ações de aprovação/cancelamento para usuários admin.
  - Incluídos spinners de loading e mensagens de feedback de erro/sucesso em todas as operações assíncronas principais.

## v0.2.0 - Docker e migração para TypeScript no frontend

- **Infraestrutura**
  - Adicionado `docker-compose.yml` para subir **backend Laravel** (porta 8000) e **frontend Vue** (porta 5173) em containers separados.
  - Criado `backend/Dockerfile` com PHP 8.3, Composer, SQLite e extensões necessárias para rodar migrações e servir a API.
  - Criado `frontend/Dockerfile` com Node 22 em modo de desenvolvimento (`npm run dev`) e proxy configurado para o backend via variável `BACKEND_URL`.

- **Frontend (TypeScript)**
  - Migrado o frontend para **TypeScript**:
    - Adicionados `tsconfig.json` e `src/env.d.ts`.
    - Criados `main.ts`, `router.ts` e `api.ts` com tipagens explícitas para autenticação e pedidos de viagem.
    - Atualizados componentes Vue para `<script setup lang="ts">` com tipagem de props, emits e estados reativos.
  - Ajustado `vite.config.js` para usar `BACKEND_URL` e funcionar tanto em Docker quanto em ambiente local.

## v0.2.1 - Usuário admin e seed automático

- **Seed de usuários**
  - Atualizado `UserFactory` para definir `role` padrão como `user`.
  - Ajustado `DatabaseSeeder` para criar/atualizar automaticamente:
    - Usuário padrão:
      - email: `test@example.com`
      - senha: `password`
      - role: `user`
    - Usuário administrador:
      - email: `admin@example.com`
      - senha: `password`
      - role: `admin`
  - Uso de `updateOrCreate` para tornar o seed idempotente e evitar erros de duplicidade.

- **Docker / primeiro startup**
  - Atualizado `backend/Dockerfile` para rodar `php artisan migrate --force` e `php artisan db:seed --force` na inicialização do container, garantindo que usuários padrão e admin existam no primeiro startup.


