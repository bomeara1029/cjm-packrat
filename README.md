# cjm-packrat
Data Repository and Workflow Management for 3D data captures, models, and scenes

## Setup instructions (Development):
*Note: `.env.dev` is required and it follows `.env.template`*

#### Prerequisites:
* It is recommended to install [Volta](https://volta.sh/) which keeps node version in check. The versions can be specified in `package.json` and when switched to the directory of the project, volta automatically switches to the correct node version.
* It is also recommended to use [Yarn](https://yarnpkg.com/) as the primary package manager for Packrat.


```
cd ~
curl https://get.volta.sh | bash
volta install node
volta install yarn
```
When switching to the `cjm-packrat` repo, the node version will automatically be pinned to the correct version by volta.

#### Steps:
1. Install the dependencies *(at the root level)*. [Lerna](https://lerna.js.org/) will ensure the subdirectories’ packages are also installed.

``` 
yarn
```

2. Export the environment variables *(at the root level)* after `.env.dev` has been configured.
```
export $(grep -v ‘^#’ .env.dev | xargs)
```

3. Generate GraphQL and Prisma code *(in the server directory)*.
*Note: make sure to generate them whenever changes have been made to the GraphQL schemas.*

```
cd server
yarn generate
```

4. If using Docker, build the Docker images and containers *(at the root)*. If they're already available then issuing the following command would start the containers.
*Note: if building the images and containers, this process can take an upwards of 20 minutes.*

**If setting up Packrat without Docker, skip to step 9**

```
cd .. 
yarn dev
```

5. Once the Docker images and containers are built, they should start in 10s-20s. The client should be reachable at `http://localhost:3000` and server should be reachable at `http://localhost:4000`, or the ports specified in `.env.dev`.

6. To follow debug logs for `client` or `server` container, run `yarn log:client` or `yarn log:server` *(at the root)*.

7. To log in and use Packrat, the database must be first initialized with data and user info *(in the server directory)*.

```
cd server
yarn initdbdock
```

8. After the database has been initialized, Solr enterprise-search needs to be indexed in order to populate the repository.
Navigate to `localhost:4000/solrindex` in the browser and wait for the result to appear. Once Solr finishes indexing, set up via Docker is complete!

*Note: sometimes a failure message will appear even upon successful indexing. Successful indexing can be seen in the server container logs and by visiting the repository and finding the newly populated entries.*

9. If setting up Packrat without Docker, compile the typescript code in a separate terminal *(for the common directory)*.
```
cd common
yarn start
```

10. Run each command in separate terminals *(at the root level)*:

**For client:**

``` 
yarn start:client
``` 

**For server:**

```
yarn start:server
``` 

11. Setting up Packrat without Docker gives users the flexibility to install and configure their own database and Solr caching as needed.


**Congratulations, Packrat is now ready for use!**


# Alternative docker workflow:

```
# If step 4 for building and starting the docker containers are failing, follow this alternative instead.
# Creates Devbox for packrat
yarn devbox:up
# Creates DB for devbox
yarn devbox:db
# Creates SOLR for devbox
yarn devbox:solr
# Create and Connects devbox-db, devbox-solr, and devbox to the same network
yarn devbox:network
# Drops you into shell inside the image
yarn devbox:start
```

*Note: if you get permission denied during the execution make sure to give it permission using:*
```
chmod 777 ./conf/scripts/devbox/*.sh
```

# Deployment instructions:
*Note: Make sure before you execute any script, you're root of the repository `cjm-packrat` and if you get permission denied for any script, make sure to do `chmod 777 path/to/script`.

## Docker images:
*Note: current supported environments are `dev` and `prod`*

1. Login into the server

2. Pull the latest changes
```
git pull
```
*Note: repository is already cloned in `/home/<user>/cjm-packrat`*

3. Switch to the branch you want to deploy. To deploy for `dev` environment you should be on `develop` branch, for `prod` environment
```
git checkout master
```
*Note: `.env.dev` and `.env.prod` are already available*

4. Deploy using the `deploy.sh` script
```
./conf/scripts/deploy.sh prod
```
If you get `permission denied for docker` then use
```
sudo chmod 777 /var/run/docker.sock
```
If you get `Error while loading shared libraries: libz.so.1` for `docker-compose` then do the following:
```
sudo mount /tmp -o remount,exec
```

5. Wait for the images to be built/updated, then use `./conf/scripts/cleanup.sh` script to cleanup any residual docker images are left (optional)

6. Make sure nginx is active using `sudo service nginx status --no-pager` or `docker ps` if it is dockerized. Run `./conf/scripts/refreshProxy.sh` or `yarn proxy` respectively if it needs to be restarted

7. If using the provided ldap server for authentication, make sure it is running with `docker ps` (or by visiting the `/ldap` subdirectory of your site) and restart it with `yarn ldap` if necessary

## LDAP

This repo comes with an LDAP server container that can be deployed for use as the main authentication method to log into Packrat. 

It is reachable at the `/ldap` route of the site and needs to be logged in with the credentials provided in the `.env` file used in creating the container.

Once logged in, if you are initializing the service, 

 - Expand the dropdown to the left and click "Create new entry here"
 - Choose "Generic: Organisational Unit" and give it a name
 - The organizational unit should appear in the tree to the left

To add a new user
 - Click "Create new entry here" under the unit
 - Choose "Default", then "inetOrgPerson"
 - Select "Email (mail)" as the RDN attribute
 - Fill out cn (common name), sn (surname), Password and Email of the user, then click "Create Object" at the bottom