
# disease classifier

This project seeks to solve the problem of late blight disease detection in the tomato plant. It uses the transfer learning technique to remove the boundary of limited resources faced when training models from scratch. It uses the popular MobilenetV2 as its base model.




## Overview
The project consists of two servers:

 - The CRUD server for persisting user and scan data.
 - The machine learning server is used for disease classification.

 The CRUD server sends a form of data to the classification server which returns a JSON response to the CRUD server. The received response and some user-specific data are also persisted in the database. The CRUD server is also responsible for user authentication.

NB: Save and load models with the same tensorflow versions. Use the following as a reference:
(https://github.com/tensorflow/tensorflow/issues/62363)
## Getting Started(CRUD server)

Clone the project

```bash
https://github.com/myspace20/thread.git
```

Go to the project directory

```bash
  cd thread
```

Install dependencies

```bash
  npm install
```

Copy and populate the .env file

```bash
  mv .env.example .env
```

Run migrations

```bash
  npm rum migrate
```

Run the application in dev or prod

```javascript
  npm run dev or npm run start
```


## Getting Started(classification server)

Go to the project directory

```bash
  cd machine-learning
```

Activate the python environment

- Linux
```bash
  source venv/bin/activate
```

- Windows
```bash
  path\Scripts\activate
```

- Install dependencies
```bash
pip install -r requirements. txt
```

- Run the program
```bash
python3 main.py
```
## Features

- User authentication using cookies with refresh and access tokens
- User authorization
- File uploads with supabase bucket storage and multer 
- Role-based access control(RBAC)


## Architecture
This project uses some of and follows the principles of both Clean Architecture and Domain-Driven Design.

i. The Protocol/Application layer is used to  receive and send HTTP requests to and from the client. Express routers are used for this purpose.

ii. The Model or Domain contains most of the business rules and logic and is contained within the services.

iii. The Infrastructure layer is responsible for communication with databases, third-party apis, email services and others.

-Database(Postgresql)

-Redis

-Supabase bucket storage

-Email(SMTP)

-Job Queues
## Tech Stack

- Node Js
- Express Js
- Postgresql
- Knex with Objection Js
- Redis for Job Queues
- typescript



## Development Toolkit

CRUD Server(NodeJs)

- husky
- prettier
- eslint
- github actions
- dotenv
- jest
- supertest
- jwt

Machine Learning(Flask)

 - tensorflow/keras
 - pillow 
 - Flask 
 - numpy 
## JWT RSA-256 Encryption

- Navigate to the scripts folder and run the keypair.mjs file to generate a key pair for RSA use cases(Such as a pair both refresh and access tokens respectively). Copy and place them in the .env file.

```bash
cd scripts
```
```bash
node keypair.mjs
```
- Sample result

```bash
Public Key:
 -----BEGIN PUBLIC KEY-----
......
......
......
-----END PUBLIC KEY-----

Private Key:
 -----BEGIN PRIVATE KEY-----
......
......
......
-----END PRIVATE KEY-----
```

- Set the dotenv config in the project entry file as follows

```javascript
import path  from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../.env'), override: true })
```
## Workflow with Github Actions

- Deployments
## Development Specification

- Do not write queries in the router and service files keep them in the repositories.
- Use pino for logging purposes.
- Checkout the .env.example file for required secrets and keys that are needed
## Documentation Specification

- Postman is used for documentation purposes.
To view and/or download documentation, go to the docs folder.
## Tests

- Unit tests
    ```bash
    npm run test
    ```
- e2e tests
## Monitoring

- Prom-client, for collecting metrics
- Grafna, for visualizations
- Cadvisor for container metrics