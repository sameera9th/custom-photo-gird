# photo-grid (React/Redux, Mongo and Express API with Docker)

This project is written as a full-stack ReactJS, Redux with a Mongo Database and an Express with Typescript backend API. The Express and Mongo are defined using [Docker Compose](https://docs.docker.com/compose/), which runs two independent containers for Database (Mongo), and Express simultaneously.

The React source (`photo-grid-client/src`) was built using [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html).

## Requisites
* [Docker](https://docs.docker.com/)
* npm >= 6
* NodeJS >= 10

## Quick Reference
* React Dev Server (frontend) -- This react application is written using Redux and Redux-Saga. You can find the React application from here (`photo-grid-client/src`), Since this section doesn't dockerized you have to start this using npm (`npm start`) or (`yarn start`)
    * http://localhost:3000*
* Express API (backend) -- You can find the Express API from here (`photo-grid-api/src`)
    * http://localhost:3001/api/grid*
    * **IMPORTANT**: If you do any modify `photo-grid-api/src` you will need to run `docker-compose build` to update the image
* Mongo
  * Port: 27017
* Docker Environment Configuration
  * Express and Mongo Environment: [./photo-grid-api/docker-compose.yml](docker-compose.yml)

> * **Note on localhost** - if you use the optional Vagrant VM instead of native Docker, the endpoint url will be either your VM IP address, or the host you've defined in `/etc/hosts`.

## File Structure
This is not an exhaustive list, just some worth noting
```
+-- /photo-grid-api               : Express Server
|   +-- /package.json             : Express dependencies
|   +-- /src                      : Express API Source
|   +-- /tsconfig.json            : Express API Typescript configs
|   +-- /.dockerignore            : Docker copy ignore (https://docs.docker.com/engine/reference/builder/
|   +-- /Dockerfile               : Docker build spec for (local) Express
|   +-- /docker-compose.yml       : start Express and Mongo environments (local development)
+-- /photo-grid-client            : React application
|   +-- /public                   : React public assets
|   +-- /src                      : React app source
|   +-- /package.json             : React dependencies
```
### Starting React Application

> **First** - move to `/photo-grid-client`, first you need to intall dependencies using `npm install` or `yarn install` then you can start the dev server using `npm start`. The defaul port for the react application is 3000, you can check if the application started successfully visiting `http://localhost:3000`

### Starting Express Application

> **First** - move to `/photo-grid-api`, then you can simply type `docker-compose up`. This command will read the docker-compose.yml file, which specifies build parameters that sets up the local development environment. The Express API will be running on `http://localhost:3001`

### Manually rebuilding the images (not usually necessary)
`docker-compose build`
> **Note**: If anytime you make a change to source code, you have to run this command and then run `docker-compose up` again.

### Run API tests

**First** - move to `/photo-grid-api`, first you need to intall dependencies using `npm install` or `yarn install` then you can run the tests using `npm run test`. Please note that all the tests are there inside `/photo-grid-api/src/routes/__test__/*`. Test coverage is only for insert photo service. 

> **Note**: There are no test converage for React application.