# Project Title & Description

This NodeJS Express application demonstrates how to secure your rest endpoints using [JWT](https://jwt.io/) tokens.

## Model information
- [todo.js](/models/todo.js) - Model to store TODOs information 
- [user.js](/models/user.js) - Model to store username and password

## Route information
- `/api/signup` To register user with the system. credentials are stored in mongodb
- `/api/login` this route checks the user credentials against mongodb and return a JWT token 
- `/todo/list` route to list TODOs
- `/todo/add` route to add TODO

`/todo/list` and `/todo/add` are protected by JWT token.
These routes check JWT token using the function defined in `verifytoken.js` 

## Prerequisites
- [Node.js 6.11+](http://nodejs.org)
- [MongoDB](https://www.mongodb.org/downloads)

## Quick Start and Installation

The easiest way to get started is to clone the repository:

```bash
#Clone the Repository
$ git clone https://github.com/mohasinsutar/jwtdemo jwtdemo
#Change Directory
$ cd jwtdemo
#install dependancy using npm or yarn
$ npm install or $ yarn install
#then simply start your application
$ npm start or $ yarn run start
```
**Note** - Change mongodb url in app.js after cloning repo.

## Testing routes using curl

- Sign up User
```
curl -X POST http://localhost:3000/api/signup -d "{	"username": "john", "password": "secret","email": "john@example.org"}"
```
- Login User
```
curl -X POST http://localhost:3000/api/login -d "{"username": "John", "password": "secret"}"
```

    Sample response will be as follows

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE1MTA4MzA4NjJ9.rKazuZf85aRhtsR46g_EhL7AqqhkrzDvdkUyRc_Dvqk"
}
```
- Access /todo/list route using the token returned from above step
```
curl -X GET http://localhost:3000/todo/list -H "authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE1MTA4MzA4NjJ9.rKazuZf85aRhtsR46g_EhL7AqqhkrzDvdkUyRc_Dvqk" 
```
- Access /todo/add route using the token
```
curl -X POST http://localhost:3000/todo/add -H "authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE1MTA4MzA4NjJ9.rKazuZf85aRhtsR46g_EhL7AqqhkrzDvdkUyRc_Dvqk" -d "{ "name": "Task1", "description": "Random Description","status": "complete" }"
```

