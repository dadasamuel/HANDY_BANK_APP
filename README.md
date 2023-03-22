[POSTMAN DOCUMENTATION](https://documenter.getpostman.com/view/25871158/2s93JwM1xU)




## Installed Dependencies

1. Express
2. bcrypt
3. joi
4. jsonwebtoken
5. dotenv
6. mongodb

# API Endpoints
Homepage
https://handy-bank.herokuapp.com/

# User Signup Endpoint

Creates a new user and gives the user an account number

# User Login Endpoint
User can login with phone number and password. If user is blocked by admin, it returns `User blocked already`

# User Retrieve account Number
User can retrieve account number by inputting his phone number. This endpoint is authenticated such that if a user is not logged in. He cannot access the endpoint.

# Get All Users Endpoint
This endpoint is only for an ADMIN. Admin can see all registered users and their details. This endpoint is secured by authorization and authentication middleware such that if you are not logged in as an admin, you cannot access the endpoint.

# Block A User Endpoint
This endpoint is also only for an ADMIN. Admin can block a user by finding the user by emailAddress. This endpoint is secured by authorization and authentication middleware such that if you are not logged in as an admin, you cannot access the endpoint.

# Total Users Endpoint
This endpoint is only for an ADMIN. Admin can see the total number of registered users. This endpoint is secured by authorization and authentication middleware such that if you are not logged in as an admin, you cannot access the endpoint.

## Middlewares
1. joi
2. Authenticate
3. Authorize


## Error Responses
- `200 OK` - successfull request.
- `201 Created` - New resource has been successfully created.
- `400 User Bad Request` - existing in database
- `401 unauthorized` - invalid password, email etc
- `403 Forbidden` - invalid request 
- `404 Not Found` - The requested resource was not found.
- `500 Internal Server Error` - An error occurred on the server.
