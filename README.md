# Docker Workshop — Visão geral dos projetos

Este repositório contém três pequenos projetos de exemplo usados para ensinar conceitos do Docker: builds de imagens, volumes, redes e builds multi-stage para sites estáticos em produção.

Estrutura do repositório

- `code/projeto-1` — uma aplicação Express minimalista (app de demonstração simples)
- `code/projeto-2` — uma aplicação de tarefas com Express + PostgreSQL (demonstra volumes, SQL de inicialização, redes)
- `code/projeto-3` — uma aplicação React + Vite construída com Dockerfile multi-stage e servida pelo Nginx (demonstra builds multi-stage e imagens de produção)
- `docker-compose.yml` — orquestra os serviços `db`, `app` e `web` para a demonstração

Requisitos

- Docker e Docker Compose instalados na sua máquina
- Opcional: Node.js + npm se você quiser rodar os projetos localmente sem Docker

Como executar tudo (recomendado)

Na raiz do repositório:

```bash
docker compose up --build
```

Isso irá construir e iniciar os três serviços:

- Banco de dados Postgres (serviço `db`) com um volume nomeado `pgdata`
- API Backend (serviço `app`) escutando na porta 3000
- Site estático Frontend (serviço `web`) servido pelo Nginx na porta 8080

Acesse o frontend em: http://localhost:8080
Use a API backend em: http://localhost:3000/todos

Detalhes dos projetos

## projeto-1 — Aplicação Express minimalista

Localização: `code/projeto-1`

Objetivo
- Uma aplicação Node/Express muito pequena usada como exemplo básico de conteinerização de uma aplicação.

O que você vai aprender
- Construir uma imagem a partir de uma imagem base do Node
- Expor portas e mapeá-las com `docker run` ou Compose

Arquivos importantes
- `code/projeto-1/Dockerfile` — Dockerfile simples de estágio único
- `code/projeto-1/src/app.js` — ponto de entrada da aplicação (escuta na porta 3000)

Comandos

Construir e executar com docker run:

```bash
# from repo root
docker build -t projeto-1 ./code/projeto-1
docker run -p 3001:3000 --rm projeto-1
```

Observação: Mapeei a porta 3000 do container para a porta 3001 do host no exemplo para não conflitar com o backend no `projeto-2` quando ambos estiverem rodando.

## projeto-2 — Todo API (Express + PostgreSQL)

Localização: `code/projeto-2`

Objetivo
- Demonstra o uso de um container de banco de dados, volumes persistentes para dados, montagem de um script SQL de inicialização e redes de serviços.

O que você vai aprender
- Volumes nomeados para persistir dados do Postgres entre recriações de containers
- Como as redes do `docker-compose` permitem que serviços se comuniquem pelo nome do serviço (`db`)
- Montar `init.sql` em `/docker-entrypoint-initdb.d/` para inicializar o schema na primeira execução
- Conexão básica com o banco de dados usando `pg` e variáveis de ambiente no Node

Arquivos importantes
- `code/projeto-2/Dockerfile` — constrói a imagem do backend
- `code/projeto-2/init.sql` — schema inicial para a tabela `todos`
- `docker-compose.yml` — define os serviços `db` e `app` e o volume `pgdata`

Recomendado: executar com Compose (constrói, monta o `init.sql` e configura a rede automaticamente):

```bash
docker compose up --build
```

Se você preferir `docker run` (passos manuais)

```bash
# criar uma rede para os containers se comunicarem
docker network create todo-net

# executar Postgres com volume nomeado e conectar à rede
docker run -d \
  --name todo-db \
  --network todo-net \
  -e POSTGRES_USER=todo_user \
  -e POSTGRES_PASSWORD=todo_pass \
  -e POSTGRES_DB=todo_db \
  -v pgdata:/var/lib/postgresql/data \
  -v $(pwd)/code/projeto-2/init.sql:/docker-entrypoint-initdb.d/init.sql:ro \
  postgres:15

# construir a imagem do backend
docker build -t projeto-2 ./code/projeto-2

# executar o backend conectado à mesma rede e expor no host
docker run -d --name todo-app --network todo-net -p 3000:3000 \
  -e PGHOST=todo-db -e PGUSER=todo_user -e PGPASSWORD=todo_pass -e PGDATABASE=todo_db \
  projeto-2
```

Exemplo de uso da API (depois que o Compose ou ambos os containers estiverem rodando):

```bash
# criar uma tarefa
curl -X POST -H "Content-Type: application/json" -d '{"title":"Buy coffee"}' http://localhost:3000/todos

# listar tarefas
curl http://localhost:3000/todos

# deletar uma tarefa
curl -X DELETE http://localhost:3000/todos/1
```

Notas e dicas
- A configuração do Compose monta o `init.sql` para que a tabela `todos` seja criada na primeira inicialização do banco.
- O volume nomeado `pgdata` mantém os arquivos do banco no host, demonstrando persistência entre recriações de containers.

## projeto-3 — Build de produção React (multi-stage)

Localização: `code/projeto-3`

Objetivo
- Demonstrar builds multi-stage do Docker: construir assets em um estágio Node, depois copiar apenas o `dist/` estático para uma imagem leve do Nginx para produção.

O que você vai aprender
- Dockerfiles multi-stage (estágios separados de build e runtime)
- Por que imagens de produção não devem conter ferramentas de build ou arquivos fonte
- Servir arquivos estáticos com Nginx dentro de um container

Arquivos importantes
- `code/projeto-3/Dockerfile` — multi-stage: estágio de build `node:18-alpine` e depois runtime `nginx:alpine`
- `code/projeto-3/src/` — código fonte React

Construir e executar com docker run

```bash
# construir a imagem de produção (na raiz do repositório)
docker build -t react-prod-demo ./code/projeto-3

# executar, mapeando a porta 80 do container (nginx) para 8080 do host
docker run -d -p 8080:80 --name react-prod-demo react-prod-demo

# acesse http://localhost:8080
```

Ou execute com Compose (recomendado para o workshop já que inicia frontend + API + DB juntos):

```bash
docker compose up --build
```

Notas
- O build multi-stage mantém a imagem final pequena e pronta para produção.
- Para desenvolvimento com hot-reload, execute a aplicação localmente com `npm install` e `npm run dev` dentro de `code/projeto-3` (ou adicione um compose override para montar o código fonte e usar o servidor de desenvolvimento).

Comandos Docker úteis

```bash
# listar containers em execução
docker ps

# parar e remover containers iniciados com compose
docker compose down

# remover o volume nomeado (dados serão perdidos)
docker volume rm docker-workshop-devfest_pgdata

# inspecionar redes
docker network ls
```

Notas finais

Este repositório foi projetado para demonstrações ao vivo. Use `docker compose up --build` para a experiência mais limpa — ele configura serviços, redes e volumes automaticamente. Para ensino, tente as sequências manuais de `docker run` para mostrar os passos menores (criar redes, iniciar um banco com volume, construir e executar uma imagem de aplicação e depois conectá-los).

Se você quiser, posso adicionar:
- um `docker-compose.override.yml` para desenvolvimento (montar código fonte + nodemon/vite)
- healthchecks para o serviço Postgres e uma sonda de prontidão para o backend
- um script curto para semear tarefas de exemplo além do `init.sql`
