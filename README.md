# microservice-example-login

This project is a demo for running a HTTP server that serve ```/login``` and ```/register``` endpoints.
For details please read the [API documents]().

## Concept

In this project we will run a HTTP server serves RESTful request, using mainly restify with typescript. For registering a user, we will store the user login data inside the memory, and for login, we will issue a JWT token with default 2 minutes expire time. The JWT token is signed with the JWT_SECRET provided by enviornment vairable.

The project is written in typescript and can be transpiled to javascript using ```tsc``` and the config file ```tsconfig.json```

## Setup for development

```javascript
# install dependencies
npm install

# modify the envirnment variables
mv .env-sample .env

# !! REMEMBER TO UPDATE THE JWT_SECRET

# use nodemon to monitor code changes and compile from typescript
npm run dev

# The server will listen to 127.0.0.1:6010 as default
```

### Logging Strategy

In this sample we use winston as the logger.
Depends on the need, user can change to use console logger or even log rotation by simply modifying the ```./src/utils/logger.ts```

## Running in docker

### Building the docker image

```sh
docker build .
```

Be noticed that if any of the test failed, the build process will be terminated.

### Environment Variables

To run in docker, enviroment variables should be provided otherwise default values will be used
Enviroment variables are listed in ```.env-sample```

### Exceptions

The dockerized image is running with pm2-docker, which will monitor the process and restart if process failed.
The settings such as restart count are stored inside ```server.config.js```
[link to pm2](https://github.com/pm2)

## TODOs

- JWT_SECRET
  - should be supplied with more secure way e.g. secrete for kubenetes
- gitsubmodules
  - some common files should be extracted to a seperate git repo as submodules. e.g. ```./proto``` or ```./src/utils```
