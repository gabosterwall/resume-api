# Resume API

Welcome to the Resume API! The API is developed with Node and Express with a MongoDB database, and provides a unique way to view my resume. It supports CRUD operations and incorporates user authentication using JSON Web Tokens (JWT).

Try it out [here]()!

## Table of Contents
1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Dependencies](#dependencies)
    - [Installation](#installation)
2. [Usage](#swagger-ui-documentation)
    - [Swagger-ui-documentation](#swagger-ui-documentation)
    - [Admin Endpoints](#admin-endpoints)
3. [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
    - [Authorization](#authorization)
4. [Technologies Used](#technologies-used)
5. [Dependencies](#dependencies)

## 1. Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js
- npm

[Download Here](https://nodejs.org/en/download)

### Dependencies
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose) for object data modelling for a [MongoDB](https://www.mongodb.com/) database.
- Authentication and authorization using [jwt (json web token)](https://www.npmjs.com/package/jsonwebtoken)
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) for error handling
- [bcryptjs](https://www.npmjs.com/package/dotenv) for hashing passwords
- [dotenv](https://www.npmjs.com/package/dotenv) for enviroment variables
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) for generating and serving a Swagger UI documentation
- [yaml](https://www.npmjs.com/package/yaml) for converting the openapi.yaml content (specification) 
- [nodemon](https://www.npmjs.com/package/nodemon) for development

### Installation
1. Clone the repository:
    ```
    git clone https://github.com/your-username/your-repository.git <your-name-here>
    ```
2. Install dependencies:
    ```
    cd <your-name-here>
    npm install
    ```
## 3. Usage

### Swagger UI Documentation
The API utilizes swagger-ui-express to generate and serve a Swagger UI for a interactive documentation. More information about the publicaly available endpoints are listed [there]().
There are other endpoints defined in the routes files which require admin permission. Admin permission is given to an account on registration based on a enviroment variable, for example a specific username or email. 

### Admin Endpoints



## 2. Authentication



