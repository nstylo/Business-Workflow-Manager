# backend On Demand

Keep in mind that all sensitive variables are stored as env vars.

## How to use:

A browsable API is implemented on http://127.0.0.1:8000/api/.

The models can be viewed in the _"backend/app_name/model.py"_ files.

The settings are defined in _"backend/settings.py"_

The top level url routing can be found in the _"backend"_ folder.

All user uploaded and admin uploaded media files can be found in _"backend/media"_.

## CI/CD Pipeline:

Gitlab CI was configured, as seen on the page, new environment variables are going to be set for it to work however. Keep them as environment variables to hide sensitive information.
Env vars:

-   **DB_NAME**: postgres
-   **POSTGRES_HOST**: postgres (the docker container name)
-   **POSTGRES_PORT**: of your own choosing
-   **POSTGRES_USER**: postgres user of your own choosing
-   **SSH_PRIVATE_KEY_STAGING & SSH_PRIVATE_KEY_PRODUCTION**: private keys for deployment (**DO NOT** make these public)
-   **URL_STAGING & URL_PRODUCTION**: urls to deploy to (DNS has to be configured as well)
-   **USER**: the user name of the VPS that is being ssh'd into
-   **DJANGO_ENV**: development
-   **DJANGO_SECRET_KEY**: secret key has to be hidden for the cryptographic signature, can generate a new one
-   **HOST**: 127.0.0.1
-   **IP_STAGING & IP_PRODUCTION**: VPS server IPs to deploy to
-   **PORT_STAGING & PORT_PRODUCTION**: VPS server ports to be able to rsync and ssh into

## To run the project (backend development):

-   Install requirements.txt into virtualenv
-   Source virtualenv
-   Start PostgreSQL instance
    -   Create table "backend"
-   Django database manage.py:
    -   Make migrations for all tables
    -   Create superuser
    -   Migrate
-   Run the django development server on 127.0.0.1:8000
-   Run the react development server on 127.0.0.1:3000 (**not** localhost)

### Dependencies:

-   Django
-   Django jet
-   Django rest framework
-   Django rest registration
-   cors headers
-   phone number field

## To run the project (backend deployment):

Tech stack:

-   Docker
-   Docker-Compose
-   Nginx
-   Gunicorn (WSGI server)

To deploy the project, the frontend can be delivered through a CDN, but due to the projected low traffic of the website, it was decided to simply serve the frontend react static files through nginx. A let's encrypt certificate is issued for https.

Django static and django media files are configured on the /django_static/ and /django_media/ endpoints respectively with aliases. /api and /admin endpoints also exist for the django backend. the / root endpoint simply serves the frontend index.html that's transpiled.

All of this is enclosed in a single docker-compose file with the only ports being open being 80 & 443 for nginx, the rest of the docker containers run in the docker network to minimize the attack surface area. It is possible to decouple these containers however. We have found that simply running this whole stack on a 3eu/mo Hetzner server was enough.

The docker-compose file consists of:

-   nginx:alpine

    -   volumes
        -   nginx.conf
        -   cache
        -   error.log
        -   htpasswd
        -   frontend build folder
        -   django static
        -   django media
        -   certbot files (let's encrypt https)
        -   dhparam (2048 DH for A+ rating on SSLLabs)
    -   depends on:
        -   django container

-   django (no image)

    -   backend root folder volume
    -   env vars:
        -   DJANGO_SECRET_KEY
        -   DB_NAME
        -   postgres env vars
        -   HOST
        -   Email env vars

-   certbot/certbot

-   postgres:alpine
    -   POSTGRES_USER
    -   POSTGRES_PASSWORD
    -   data volume

## Frontend (_Reactjs 16.8_):

The frontend was kicked off by using [create-react-app](https://github.com/facebook/create-react-app). Instead of React Redux the [React Context Api](https://reactjs.org/docs/context.html) was used to manage global state.

### Running the frontend:

cd into _frontend/_ folder and run the following commands: </br>

( **important**: be sure to run the development server on 127.0.0.1 instead of localhost, one way of doing so would be to add a file called _.env.development.local_ into the _frontend/_ folder. This file should specify the env variable `HOST=127.0.0.1`. Be sure not to include this file into version control. More information on react env variables click [here](https://create-react-app.dev/docs/adding-custom-environment-variables).)

```javascript
npm install // install all dependencies
npm start // start development server
```

to test:

```javascript
npm test // run jest tests
```

### Notable Dependencies:

-   [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) (frontend routing)
-   [antd](https://ant.design/) (UI framework)
-   [axios](https://github.com/axios/axios) (http client)
-   [formik](https://github.com/jaredpalmer/formik) (form creation library)
-   [yup](https://github.com/jquense/yup) (form validation library)
-   [less](http://lesscss.org/) (css preprocessor)

For a complete overview of all dependencies, please refer to package.json

### File Structure:

The folder _src/_ contains all the frontend source code.

-   **App.js** is the file which contains the most top level component together also with the global state
-   **App.less** contains global css/less
-   **routers/** contains all second and lower level routers as well as custom routes (e.g. ProtectedRoute)
-   **utils/** contains files with non-component functions, such as requests, http client wrappers, parsers etc.
-   **res/** contains media files
-   **components/** contains the majority of react components

The subdirectories of **components/** should be rather straight forward. Is is roughly split up into fixed components ( such as layouts ), user components (i.e. only an authenticated user has access, hence all user pages should be wrapped into a ProtectedRoute Component), auth components (login, registration etc.) and other reusable components as well as forms.
