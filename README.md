# express api

A simple REST API in Node.js

API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/cars    |Get all cars           |
| GET         | api/cars/id |Get a specific car         |
| POST        | api/cars    |Create a new car         |
| PUT(WIP)        | api/cars/id    |Update an existing car|
| DELETE        | api/cars/id    |Delete an existing car|

## Quick Start

Clone the repo.

```bash
https://github.com/engFelipeMonteiro/express-api
cd express-api
```
Create the .env file.

```bash (.env)

DB_URL = localhost/my-employees
#TEST_DB_URL = localhost/test-my-employees
PORT = 5000 # in mac os may need to disable airplay
TOKEN_KEY = super_secret
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm run dev
```

For more details check [Build a Restful CRUD API with Node.js](https://dev.to/zagaris/build-a-restful-crud-api-with-node-js-2334).


