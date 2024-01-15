<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://github.com/CinePik/catalog/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/ci.yml/badge.svg" alt="Catalog CI Workflow Status" />
  </a>
  <a href="https://github.com/CinePik/catalog/actions/workflows/cd.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/cd.yml/badge.svg" alt="Catalog CD Workflow Status" />
  </a>
</p>

# CinePik Watchlist

Node.js microservice for user watchlist.

## Documentation

OpenAPI documentation available at [http://localhost:3002/api](http://localhost:3002/api).  
For accessing secured endpoints add your `access_token` provided to you at login to the `Authorization` header.


## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Prisma

If any changes are made to the schema.prisma file, run the following command to update the database.
I creates a migration, updates the database (also seeds?), and updates the Prisma client.

```bash
npm run prisma:migrate:dev
```

If you only want to seed the database, run the following command.

```bash
npm run prisma:seed
```

To update the Prisma client run the following command.

```bash
npm run prisma:client
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker

To run the app in a docker container, run the following commands.

```bash
docker network create cinepik-network

docker run -d --name cinepik-watchlist-db  --env-file .env --network cinepik-network -p 5432:5432 postgres:15.5-alpine

docker build -t cinepik-watchlist .

docker run -d -t --env-file .env --network cinepik-network -p 3001:3001 cinepik-watchlist
```

To manually upload the image to Docker Hub, run the following commands.

```bash
docker build -t cinepik-watchlist .

docker tag cinepik-watchlist:latest <dockerhub_username>/cinepik-watchlist:latest

docker push <dockerhub_username>/cinepik-watchlist:latest
```

### Docker Compose

You can also setup the database and application with docker-compose.

```bash
# Run the database and application
docker-compose up --build db app
# Trigger database seeding
docker-compose up --build seed

docker-compose down
```

## Kubernetes deployment

### Setup configs

Create config map for keycloak

```bash
kubectl create configmap keycloak-config --from-literal=KEYCLOAK_BASE_URL="http://cinepik-keycloak" --from-literal=KEYCLOAK_CLIENT_ID="nest-auth" --from-literal=KEYCLOAK_PORT=8080 --from-literal=KEYCLOAK_REALM="cinepik"
```

Create secret for keycloak

```bash
kubectl create secret generic keycloak-credentials --from-literal=KEYCLOAK_ADMIN="admin" --from-literal=KEYCLOAK_ADMIN_PASSWORD="<REPLACE_ME>" --from-literal=KEYCLOAK_CLIENT_SECRET="<REPLACE_ME>" --from-literal=KEYCLOAK_REALM_RSA_PUBLIC_KEY="<REPLACE_ME>"
```

Create a Secret for the database url environment variable in the deployment file.
Replace the value in the <> with the appropriate value.

```bash
kubectl create secret generic database-credentials --from-literal=DATABASE_URL=<db_url>
```

### Apply changes

We can create the deployment and service.

```bash
kubectl apply -f k8s/cinepik-watchlist.yml
kubectl apply -f k8s/cinepik-watchlist-svc.yml
```

### Seed the database in Kubernetes

To manually seed the database in Kubernetes, run the following command, which create a Job that runs the seed script.

```bash
kubectl apply -f k8s/seed-job.yml
```

### Other useful commands

```bash
kubectl get pods
kubectl delete deployment cinepik-watchlist-deployment
kubectl delete configmap <configmap name>
kubectl rollout restart deployment/cinepik-watchlist-deployment
kubectl logs <pod-id>
kubectl describe secret <secret-name>
kubectl get secret <secret-name>
kubectl get service
kubectl describe pods
```
