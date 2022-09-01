# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

- git clone https://github.com/Nick1091/nodejs2022Q2-service


## Installing NPM modules

- checkout logging branch
- rename .env.example to .env
- npm install

## Running application

```
docker-compose up -d
```
## Stop application

```
docker-compose down
```
## Scanning images

```
npm run scan:app
```
```
npm run scan:db
``` 


## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix

```
npm run lint
```
