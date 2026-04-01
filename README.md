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


Commit meldingene må se slik ut for riktig versjonering:

Patch:
git commit -m "fix: correct null pointer issue"

Minor:
git commit -m "feat: add login endpoint"

Major:
git commit -m "feat!: redesign authentication flow"

or:

git commit -m "feat: new auth system BREAKING CHANGE: old tokens no longer valid"

