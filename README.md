#  ***REMOVED*** On Demand
Keep in mind that all sensitive variables are stored as env vars.

## How to use:
A browsable API is implemented on http://127.0.0.1:8000/api/.

The models can be viewed in the *"***REMOVED***/app_name/model.py"* files.

The settings are defined in *"***REMOVED***/settings.py"*

The top level url routing can be found in the *"***REMOVED***"* folder.

All user uploaded and admin uploaded media files can be found in *"***REMOVED***/media"*.

## CI/CD Pipeline:
Gitlab CI was configured, as seen on the page, new environment variables are going to be set for it to work however. Keep them as environment variables to hide sensitive information.
Env vars:
* **DB_NAME**: postgres
* **POSTGRES_HOST**: postgres (the docker container name)
* **POSTGRES_PORT**: of your own choosing
* **POSTGRES_USER**: postgres user of your own choosing
* **SSH_PRIVATE_KEY_STAGING & SSH_PRIVATE_KEY_PRODUCTION**: private keys for deployment (**DO NOT** make these public)
* **URL_STAGING & URL_PRODUCTION**: urls to deploy to (DNS has to be configured as well)
* **USER**: the user name of the VPS that is being ssh'd into
* **DJANGO_ENV**: development
* **DJANGO_SECRET_KEY**: secret key has to be hidden for the cryptographic signature, can generate a new one
* **HOST**: 127.0.0.1
* **IP_STAGING & IP_PRODUCTION**: VPS server IPs to deploy to
* **PORT_STAGING & PORT_PRODUCTION**: VPS server ports to be able to rsync and ssh into

##  To run the project (backend development):

* Install requirements.txt into virtualenv
* Source virtualenv
* Start PostgreSQL instance
    - Create table "***REMOVED***"
* Django database manage.py:
    * Make migrations for all tables
    * Create superuser
    * Migrate
* Run the django development server on 127.0.0.1:8000
* Run the react development server on 127.0.0.1:3000 (**not** localhost)

### Dependencies:
* Django
* Django jet
* Django rest framework
* Django rest registration
* cors headers
* phone number field

##  To run the project (backend deployment):
Tech stack:
* Docker
* Docker-Compose
* Nginx
* Gunicorn (WSGI server)

To deploy the project, the frontend can be delivered through a CDN, but due to the projected low traffic of the website, it was decided to simply serve the frontend react static files through nginx. A let's encrypt certificate is issued for https.

Django static and django media files are configured on the /django_static/ and /django_media/ endpoints respectively with aliases. /api and /admin endpoints also exist for the django backend. the / root endpoint simply serves the frontend index.html that's transpiled.

All of this is enclosed in a single docker-compose file with the only ports being open being 80 & 443 for nginx, the rest of the docker containers run in the docker network to minimize the attack surface area. It is possible to decouple these containers however. We have found that simply running this whole stack on a 3eu/mo Hetzner server was enough.

The docker-compose file consists of:
* nginx:alpine
    - volumes
        * nginx.conf
        * cache
        * error.log
        * htpasswd
        * frontend build folder
        * django static
        * django media
        * certbot files (let's encrypt https)
        * dhparam (2048 DH for A+ rating on SSLLabs)
    - depends on:
        * django container

* django (no image)
    - ***REMOVED*** root folder volume
    - env vars:
        * DJANGO_SECRET_KEY
        * DB_NAME
        * postgres env vars
        * HOST
        * Email env vars

* certbot/certbot

* postgres:alpine
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - data volume
