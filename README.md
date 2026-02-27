# dat251-project

###### Setup
Building gradle:
```bash
    cd backend
    ./gradlew build
```
We are running the postgresql database in a docker container, so docker has to be running for the database setup to work. After starting docker run the following command to set up the database:
```bash
    docker run --name postgres -d -p 127.0.0.1:5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=greengafldb postgres:18-alpine
```