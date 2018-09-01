# Loopback Web Server

This is a web server connecting to the postgreSQL database.

## Starting the Web server

1. Start a postgreSQL database

For example (in the project root):
`docker-compose up database`

2. Set the environment variables

Variable | Description
---- | ----
NODE_ENV | Node environment (for example `development`, `test` or `production`)
PORT | For example, `3002` (default to `3002`)
DATABASE_URL : for example, postgres://dirt:password@127.0.0.1:5432/dirt

3. Install the packages

`npm run install`

4. Create the database

`npm run database:create`

5. Start the web server

`npm start`

6. Connect to the `api`, default [http://localhost/:3002/](http://localhost/:3002/)

*Tip*: You can use the Insomnia [workspace](../tools/insomnia)

## Test

`npm run test`

## Lint

`npm run lint`