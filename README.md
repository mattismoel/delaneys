# Website for Delaney's Bar & Bottleshop

This is the repository for the website at [delaneys.dk](https://delaneys.dk), 
a local bar and bottleshop in Odense, Denmark.


# Repository structure

The project is divided into three layers. A [PocketBase](https://pocketbase.io)
backend for data storage and user authorisation. This is found in *backend*,
though only setup files for automatically setting up the dockerised instance
upon build.

In *frontend* the website itself resides, containing a
[SvelteKit](https://sveltekit.dev) web application which again is dockerised
to a node server using [Bun](https://bun.dev).


# Building

The project is built with 
[Docker Swarm](https://https://docs.docker.com/engine/swarm/) and 
[Docker Stack](https://docs.docker.com/reference/cli/docker/stack/) in mind,
making for simple deployments.

Therefore a Docker Swarm must be initialised on the remote host machine.

```
docker swarm init
```

Thereafter a local *Docker Context* can be created to handle all Docker commands 
on the remote machine from your local machine.

```
docker context create <context_name> --docker "host=ssh://<remote_username>@delaneys.dk"
docker context use <context_nane>
```

Now all Docker commands are run directly on the remote machine.

Assuming you are in the project working directory, where the *compose.yaml* file
exists, simply run:

```
docker stack deploy -c ./compose.yaml <service_name> --with-registry-auth
```

This deploys the Docker Compose orchestration as a Docker service to the remote 
machine, using the local *compose.yaml* file.


# Development

The development setup is as easy as running:

```
docker compose -f ./compose.dev.yaml up
```

Now the dev website can be opened on *https://localhost*. The PocketBase API
can be found on *https://api.localhost*, and the dashboard on 
*https://api.localhost/_/*.
