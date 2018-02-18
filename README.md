##Micro Service
Install the dependencies and running of the service:
```
npm install && npm start
```

running of the service (dev mode):
```
npm run start:watch
```

### Running of the service using docker
Creating of the container from image:
```
docker-compose up
```

Creating of the container without special image:
```
docker-compose -f docker-compose.dev.yml up
```

## Swagger documentation
Use http://localhost:3000/api/v1/swagger 