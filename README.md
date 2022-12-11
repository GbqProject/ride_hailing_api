# ride_hailing_api

# Running the project with docker-compose

Execute in your terminal:
docker compose -f "docker-compose.yml" up -d --build

## Running the project in local

This project uses postgres. So you have to use a postgres server, adapt your credentials in backend\src\Common\Integrations\database_provider.ts file and execute the db\InitialDB.sql file in your server in order to create the database, tables and insert some data (make sure you uncomment the 'create database' line);

Execute in your terminal:
cd backend
npm install
npm start:dev
