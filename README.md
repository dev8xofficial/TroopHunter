# How to run project

# Step 1 - Run docker application

# Step 2 - Run below command in the root directory of project.

    npm run build:prod

# Step 2(a) - If you want to run multiple projects than clone git repo in multile places. Change env files accordingly than run below commands.

    npm run build:stag
    npm run build:dev

# Step 3 - Run any command mentioned below in order to run the project.

    npm run start:prod
    npm run start:stag
    npm run start:dev

# Step 4 - Run command mentioned below in order to run the cid/cd flow in the project root directory.

    npm run start:ci

# ------------------------------------------------------------------------------------------------------------
# ------------ Helping Commands ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Run the following command to remove the already committed files/folders from the repository.

    git rm --cached -r logs **pycache**

# Run to discard all changes in git branch

    git reset --hard HEAD

# Stop container/containers

    docker stop container_id
    docker stop $(docker ps -a -q)

# Run the following command to remove containers in your docker.

    docker system prune -f

# Run the following command to remove images in your docker.

    docker image prune -a -f
    docker rmi $(docker images -q)

# Run the following command to remove all dangling images.

    docker image prune

# To see all docker containers running

    docker ps -a

# To see logs of all docker containers

    docker logs --details -f container_id

# To see the docker resource usage

    docker stats

# To see the docker information

    docker info

# Run the following command to know which port is using which application or service in Mac

    lsof -i -n -P | grep LISTEN

# Copy .env files from macbook to ubuntu server

    scp -rp /Users/abdulrehman/Workstation/hellobadul/development/helloabdul/backend/.env ubuntu-server@192.168.1.16:/home/ubuntu-server/helloabdul

