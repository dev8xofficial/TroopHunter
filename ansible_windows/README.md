# ------------------------------------------------------------------------------------------------------------
# ------------ Automation for Ubuntu -------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Step 1 - Run below commands in ubuntu server to allow user password free access

    sudo adduser ubuntu-server
    sudo su - ubuntu-server
    sudo visudo
    ubuntu-server ALL=(ALL) NOPASSWD:ALL

# Step 2 - Run below commands in ubuntu server to add user in sudo group

    sudo usermod -aG sudo ubuntu-server

# Step 3 - Add static ip in the router.

    192.168.1.200
    Install Linux ProtonVPN
    sudo apt install curl
    Install pgadmin 4 (apt)
    sudo apt install bridge-utils
    sudo apt install net-tools
    sudo apt install openssh-server

# Step 4 - Run below commands in ansible container to copy public key in ubuntu server

    Go to /etc/ansible directory and run below command.
    ssh-copy-id -i secrets/id_ed25519_ubuntu ubuntu-server@192.168.1.200

# Step 5 - RUn this command to execute the initial setup.

    ansible-playbook --ask-vault-pass playbooks/main.yml

# Step 5 - After deplying git code and before building project build. Add docker group in linux.

    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker

# Step 6 - Make sure to allow backend ports required to communicate with cloudflare

    sudo ufw allow 50000/tcp

# To find .ssh directory go to home/your-username/.ssh

    Its hidden as a result of the dot(.) before the name.
    So to find it do `ls -a` in your current location as seen in the image.

# ------------------------------------------------------------------------------------------------------------
# ------------ Automation for nginx --------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Step 1 - Create lxc/vm in proxmox

# Step 2 - Create new user

    sudo adduser nginx

# Step 3 - Make new user sudo user

    sudo usermod -aG sudo nginx

# Step 4 - Run below commands in lxc container to allow user password free access

    sudo visudo
    nginx ALL=(ALL) NOPASSWD:ALL

# Step 5 - Switch user

    sudo su - nginx

# Step 6 - Run below commands in ansible container to copy public key in lxc container

    Go to /etc/ansible directory and run below command.
    ssh-copy-id -i secrets/id_ed25519_ubuntu nginx@192.168.1.202

# Step 7 - Run this command to execute the initial setup for nginx.

    ansible-playbook --ask-vault-pass playbooks/main.nginx.yml

# Step 8 - Once below step completed, run the cloudlare command given into the tunnel.

    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && 

    sudo dpkg -i cloudflared.deb && 

    sudo cloudflared service install ...

# ------------------------------------------------------------------------------------------------------------
# ------------ Commands to execute automation for ubuntu and nginx -------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# To edit github_token secret, go to /etc/ansible

ansible-vault edit secrets/github_token

# To run ansible script

ansible-playbook --ask-vault-pass playbooks/main.prod.yml
ansible-playbook --ask-vault-pass playbooks/main.stag.yml
ansible-playbook --ask-vault-pass playbooks/main.dev.yml
ansible-playbook --ask-vault-pass playbooks/main.nginx.yml
ansible-playbook --ask-vault-pass playbooks/main.auth.yml
ansible-playbook --ask-vault-pass playbooks/main.scraper.yml

# Refresh terminal in ubuntu to see changes.

bash --login

# To remove a folder along files

sudo rm -r foldername

# To remove locked folder in ubuntu

sudo nautilus

# To remove known_hosts

ssh-keygen -f "/root/.ssh/known_hosts" -R "192.168.1.202"

# To remove cloudflared service

cloudflared service uninstall

# To remove cloudflare package

sudo apt-get remove cloudflared

# ------------------------------------------------------------------------------------------------------------
# ------------ Administrative commands of Ubuntu -------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Switch to root user
sudo su

# Change Permissions
sudo chmod -R u+rwx /TroopHunter

# Force Delete the Folder
sudo rm -rf /TroopHunter

# ------------------------------------------------------------------------------------------------------------
# ------------ PostgreSQL Extensions -------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# ERROR:  type "geometry" does not exist
CREATE EXTENSION postgis;

# ------------------------------------------------------------------------------------------------------------
# ------------ Install PostgreSQL ----------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Install postman
sudo snap install postman