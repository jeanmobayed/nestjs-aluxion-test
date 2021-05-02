## Description

This is a NestJS API to manage files.

## Configuration

For the database you need PostgreSQL.

Before starting the application you need to define an .env file in the root folder with the following environment variables. 

```
NODE_ENV=
PORT=

DB_NAME=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=

JWT_SECRET=
JWT_EXPIRE_TIME=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET=

EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASSWORD=

```
## Installation


```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# using Docker
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
