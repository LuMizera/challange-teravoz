# Teravoz call lifecicle

## Requirements

- Docker
- Docker-compose

## Run

After installing what is required you will need to run this command on the root folder of the project.

```
docker-compose -f docker-compose.yml up
```

## What I used

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for container managment
- [Node.js](https://nodejs.org/en/) with [Typescript compiler](https://www.typescriptlang.org/) for backend
  - [WS](http://expressjs.com/pt-br/) as WebSocket manager
- [React](https://reactjs.org/) for the frontend (Hooks)
  - [React-Redux](https://github.com/reduxjs/react-redux) as state container
  - [Sass](https://sass-lang.com/) as styles components
  - [Bulma.io](https://bulma.io/) as ui kit

## Description

This project will simulate the life cicle of a call on a call center, from the call start, to the end of the call.

The dashboard that was developed with Reactjs and Typescript can trigger the start of the lifecicle of the call and some events untill the call dies, and also has a dashboard so you can see all the calls on our api.

The api was made on Nodejs and Typescript, the api manages all the data and always will return on a websocket to mantain the frontend up-to-date.
The api also doesn't has a database, its data is stored pon a file called database.json.

## Warning

- The file database.json shoudn't be deleted, if it's deleted or isn't an array type it will break the entire application.

This project was made for the [teravoz challange](https://github.com/teravoz/challenge/blob/master/full-stack/README.md).
