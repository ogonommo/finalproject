[![Build project](https://github.com/ogonommo/finalproject/actions/workflows/deploy.yaml/badge.svg)](https://github.com/ogonommo/finalproject/actions/workflows/deploy.yaml)

# Movie Quotes (Final Project U11 DevOps)

## Project structure

**Movie Quotes** is a simple application serving quotes from popular sci-fi movies like **Star Wars**, **The Matrix**, and others. The project consists of a server NestJS app (also called _the api_) and a client React app.

You can find the following folders and files:

- `client` - contains the client code, including _Docker_ files for _docker-compose_ and for building the _Docker_ image
- `server` - contains the server code, including _Docker_ files for _docker-compose_ and for building the _Docker_ image
- `.github/workflows/deploy.yaml` - the project build workflow
- `k8s` - containers all the _Kubernetes_ components for project deployment
- `application.yaml` - the _ArgoCD_ configuration file

<br>

## Server

The server is build with _NestJS_ and _TypeORM_, which is also used for database versioning and migrations.

To run the server you need the following **environment variables** (shown with example values for the _MariaDB_ database):

```
DBHOST=localhost
DBPORT=3306
DBUSER=root
DBPASSWORD=1234
DB_DB=quotes
```

When making changes to entities, make sure to create a migration (or database delta) with

```sh
npm run migration:generate -- -n <Name of the migration>
```

**Note**: Migrations are automatically applied when the server starts.

To run the _Docker image_

```sh
docker run --name server-container -p 5000:5000 \
  --env DBHOST=localhost \
  --env DBPORT=3306 \
  --env DBUSER=root \
  --env DBPASSWORD=1234 \
  --env DB_DB=quotes \
  ogonommo/api
```

Make sure you have a running _MariaDB_ container:

```sh
docker run --name mariadb-container -p 3306:3306 \
  --env MYSQL_ROOT_PASSWORD=1234 \
  --env MYSQL_DATABASE=quotes \
  mariadb:10.7
```

<br>

## Client

The client is built with _React_.

To run the client image:

```sh
docker run --name client-container -p 3000:3000 \
  --env REACT_APP_HOST=http://localhost:5000 \
  ogonommo/client
```

Make sure you pass the correct host mapping to the `REACT_APP_HOST` environment variable.

<br>

## Testing locally

To easy testing on local machine there is a `docker-compose.yaml` provided for you.

To run it:

```sh
docker-compose up
```

<br>

## Deploying to Kubernetes

The `k8s` folder contains all the necessary component definitions in order to deploy the application to a Kubernetes cluster.

There are the three main services exposing the server, client, and mariadb pods. The _MariaDB_ deployment depends on the `db-persistent-volume-claim` in order to assure data persistency.

Service resources are finally exposed through _Ingress_.

Make sure you have the `mysqlrootpassword` secret set up in the current namespace:

```sh
kubectl create secret generic mysqlrootpassword --from-literal=MYSQLROOTPASSWORD=<root password> -n <current namespace>
```

**Note**: For the ArgoCD integration the namespace should be `finalproject`

To run the application:

```sh
kubectl apply -f ./k8s
```

<br>

## ArgoCD

In order to automate the CI/CD process you need to [install and configure](https://argo-cd.readthedocs.io/en/stable/getting_started/) ArgoCD.

To create and run the application:

```sh
kubectl apply -f application.yaml
```

<br>

## Complete flow

The git repository needs the following secrets in order for the deployment workflow to work:

- `DOCKERHUB_TOKEN` - issued from _Docker Hub_
- `DOCKERHUB_USERNAME` - your username for _Docker Hub_
- `SONAR_TOKEN` - issued from _SonarCloud_ when you register the project with your repo (make sure to turn off **SonarCloud Automatic Analysis**)

1. make changes to client and/or server
1. update the `deploy.yaml` workflow to increase tag versions of client and/or server
1. push changes to the repo
1. wait for the workflow to complete and get images deployed to _Docker_
1. update the client and/or server deployment files in the `k8s` folder to target the new image tags
1. push changes to the repo
1. wait for ArgoCD to pull the new images, run the new pods and kill the old ones

<br>

## Improvement ideas

### Client app

In order to get the correct url to the server, currently the react application makes the following check

```html
<script>
  var HOST = !"%REACT_APP_HOST%".includes("REACT_APP_HOST")
    ? "%REACT_APP_HOST%"
    : `${window.location.protocol}//${window.location.host}/api`;
</script>
```

When the app is running through `docker-compose` _Webpack_ will update the `%REACT_APP_HOST%` literal with the environment variable value found in the `docker-compose.yaml` file. The image building process is not utilizing the variable, and even if it did, it will evaluate it only on build and have its value persist in the _Docker_ image. This process can be improved by making the value of the variable _dynamic_ through _bash_ scripts or other mechanisms.

<br>

### Secrets, variables

Secrets, environment variables can be managed better by using configuration maps.

<br>

### CI/CD

The process can be automated better, so a second push to the repo isn't needed for _ArgoCD_ to update container images
