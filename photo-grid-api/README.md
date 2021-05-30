# photo-grid (React/Redux, Mongo and Express API with Docker)

This project is written as a full-stack ReactJS, Redux(Saga) with a Mongo DB and an Express with Typescript backend API. The React, Express, and Mongo are defined using [Docker Compose](https://docs.docker.com/compose/), which runs three independent containers for Database (Mongo), Express API and React App simultaneously.

![](https://github.com/sameera9th/custom-photo-gird/blob/main/readme-gif/demo.gif?raw=true)

The React source (`photo-grid-client/src`) was built using [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html).

## Requisites
* [Docker](https://docs.docker.com/)
* npm >= 6
* NodeJS >= 10

## Quick Reference
* React Dev Server (frontend) -- This React application is written using Redux and Redux-Saga. You can find the React application from here (`photo-grid-client/src`)
    * http://localhost:3000*
     * **IMPORTANT**: If you do any modify `photo-grid-client/src`, sometimes It'll take few seconds to reflect the changes in the containers.
* Express API (backend) -- You can find the Express API from here (`photo-grid-api/src`)
    * http://localhost:3001/api/*
    * **IMPORTANT**: If you do any modify `photo-grid-api/src`, sometimes It'll take few seconds to reflect the changes in the containers.
    * Environment variables - All the environment variable are initialized inside the Docker compose file [./docker-compose.yml]
* Mongo
  * Port: 27017
* Docker Environment Configuration
  * React App Docker file  (`photo-grid-client/Dockerfile`)
  * Express API Docker file  (`photo-grid-api/Dockerfile`)
  * Docker compose file [./docker-compose.yml](docker-compose.yml)

> * **Note on localhost** - if you use the optional Vagrant VM instead of native Docker, the endpoint url will be either your VM IP address, or the host you've defined in `/etc/hosts`.

## File Structure
This is not an exhaustive list, just some worth noting
```
+-- /photo-grid-api                 : Express Server
|   +-- /images                     : Store all the images
|   +-- /package.json               : Express dependencies
|   +-- /src                        : Express API Source
|       +-- /api-doc                : API documentation
|       +-- /configs                : Configurations of the API
|       +-- /controllers            : Business logic implemented
|       +-- /models                 : Data layer
|       +-- /routes                 : API endpoints for each service
|       +-- /services               : Addtional services/methods required for the API
|       +-- /test                   : Test configurations
|       +-- /utils                  : Utilities required for the API
|       +-- /validation-schemas     : Request validations
|       +-- /app.ts                 : Source code of express app
|       +-- /index.ts               : API initiate file
|   +-- /tsconfig.json              : Express API Typescript configs
|   +-- /.dockerignore              : Docker ignore files
|   +-- /Dockerfile                 : Docker build spec for (local) Express
+-- /photo-grid-client              : React application
|   +-- /public                     : React public assets
|   +-- /src                        : React app source
|       +-- /components             : UI components
|       +-- /context                : React context files
|       +-- /redux                  : Redux files
|       +-- /utils                  : Utility methods and configurations
|       +-- /App.js                 : App file [source code]
|       +-- /index.js               : App initiate file
|       +-- /store.js               : Redux store configuration file
|   +-- /package.json               : React dependencies
+-- /docker-compose.yaml            : Start React, Express and Mongo environments (local development)
```
### Starting the application

> **First** - move to root `./`, then you can simply type `docker-compose up`. This command will read the docker-compose.yml file, which specifies build parameters that sets up the local development environment. The Express API will be running on `http://localhost:3001` and React App will be running on `http://localhost:3000`

![Starting the application](https://s3.gifyu.com/images/screen-capture_uIqk2TFu_5eod.gif)

### Starting React Application

> **First** - move to `/photo-grid-client`, first you need to intall dependencies using `npm install` or `yarn install` then you can start the dev server using `npm start`. The defaul port for the react application is 3000, you can check if the application started successfully visiting `http://localhost:3000`

### Starting Express Application

> **First** - move to `/photo-grid-api`, then you can simply type `docker-compose up`. This command will read the docker-compose.yml file, which specifies build parameters that sets up the local development environment. The Express API will be running on `http://localhost:3001`
> **First** - move to `/photo-grid-api`, first you need to intall dependencies using `npm install` or `yarn install` then you can start the dev server using `npm start`. The defaul port for the react application is 3001, you can check if the API started successfully visiting `http://localhost:3001/api`

### Manually rebuilding the images (not usually necessary)
`docker-compose build`
> **Note**: If anytime you make a change to source code, you have to run this command and then run `docker-compose up` again.

### API Documentation
The API document has created using [Swagger](https://swagger.io/). You can go to `http://localhost:3001/doc/` and check the available endpoints in this API. Some APIs have restricted access with authorization token which means you will have to generate authorization token and use it in order to access those.

![](https://github.com/sameera9th/custom-photo-gird/blob/main/readme-gif/swagger.gif?raw=true)

### Run API tests

Move to `/photo-grid-api`, first you need to intall dependencies using `npm install` or `yarn install` then you can run the tests using `npm run test`. Please note that all the tests are there inside `/photo-grid-api/src/routes/__test__/*`. You can find the test configuration in here `/photo-grid-api/src/test/setup.ts`

> **Note**: There are no test converage for React application.