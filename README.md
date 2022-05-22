# Storefront Backend Project

## Port number for db and server
The port for the server is 3000 and the database on port 8080


### The database schema and and API routes is in the REQUIREMENT.md
## Packages

express
npm i -S express, 
npm i -D @types/express

typescript
npm i -D typescript

db-migrate
npm install -g db-migrate

bcrypt
npm -i bcrypt,
npm -i -D @types/bcrypt

jsonwebtoken
npm install jsonwebtoken --sav,
npm i --save-dev @types/jsonwebtoken

jasmine
npm install -g jasmine,
npm i --save-dev @types/jasmine

supertest
npm i supertest, 
npm i --save-dev @types/supertest

## Migration
yarn mig-up

## start up

yarn watch

## testing

yarn test

## Setup db and server instructions.
#### Databases Creation.
#### We have to create the dev and test databases.

#### connect to postgres database psql -U postgres
#### run create a user
#### CREATE USER store_user WITH PASSWORD 'user123123';
#### run CREATE DATABASE store;  And then CREATE DATABASE test_store;
#### Connect to the databases and grant all privileges
#### Grant for dev database
#### \c store
#### GRANT ALL PRIVILEGES ON DATABASE store TO store_user;
#### Grant for test database
#### \c test_store
#### GRANT ALL PRIVILEGES ON DATABASE test_store TO store_user;