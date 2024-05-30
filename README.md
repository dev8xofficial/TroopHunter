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

# ------------------------------------------------ Other commands for this project --------------------------------------------------------------------------------------------

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

# To see all docker containers running

    docker ps -a

# To see logs of all docker containers

    docker logs --details container_id

# Run the following command to know which port is using which application or service in Mac

    lsof -i -n -P | grep LISTEN

# Copy .env files from macbook to ubuntu server

    scp -rp /Users/abdulrehman/Workstation/hellobadul/development/helloabdul/backend/.env ubuntu-server@192.168.1.16:/home/ubuntu-server/helloabdul

# ------------------------------------------------ Virutal machines automatation setup --------------------------------------------------------------------------------------------

# Step 1 - Run below commands in ubuntu server to allow user password free access

    sudo visudo
    ubuntu-server ALL=(ALL) NOPASSWD:ALL

# Step 2 - Run below commands in ubuntu server to add user in sudo group

    sudo usermod -aG sudo ubuntu-server

# Step 3 - Add static ip in the router.

    192.168.1.100
    Install Linux ProtonVPN
    Install bridge-utils
    Install net-tools
    Install openssh-server

# Step 4 - Run below commands in ubuntu server to copy public key in ubuntu server

    Go to /etc/ansible directory and run below command.
    ssh-copy-id -i secrets/id_ed25519_ubuntu ubuntu-server@192.168.1.100

# Step 5 - RUn this command to execute the initial setup.

    ansible-playbook --ask-vault-pass playbooks/main.yml

# Step 5 - After deplying git code and before building project build.

    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker

# To find .ssh directory go to home/your-username/.ssh

    Its hidden as a result of the dot(.) before the name.
    So to find it do `ls -a` in your current location as seen in the image.
