# Resume API

The Resume API was developed for learning purposes as well as to provide a unique approach to viewing my resume. Users have to register an account to get a JSON Web Token (JWT), which is required in order to view the resume as a whole or specific sections of it. There is also an option to post comments! The API's stack consist of Node.js, Express.js, MongoDB for database and Swagger UI for frontend/documentation. 


Feel free to test [here]()!

## Credits
Looking around fo


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

[Work in progress]



