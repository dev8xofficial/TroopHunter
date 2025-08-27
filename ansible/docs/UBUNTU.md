# ------------------------------------------------------------------------------------------------------------
# ------------ Pre Setup before Automation -------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Step 1 - Run below commands in ubuntu server to allow user password free access

    sudo adduser ubuntu-server
    sudo su - ubuntu-server
    sudo visudo
    ubuntu-server ALL=(ALL) NOPASSWD:ALL

# Step 2 - Run below commands in ubuntu server to add user in sudo group

    sudo usermod -aG sudo ubuntu-server

# Step 3 - Add static ip in the router.

    192.168.1.202
    Install Linux ProtonVPN
    sudo apt install curl
    Install pgadmin 4 (apt)
    sudo apt install bridge-utils
    sudo apt install net-tools
    sudo apt install openssh-server

# Step 4 - Run below commands in ansible container to copy public key in ubuntu server

    Go to /workspace/ansible directory and run below command.
    ssh-copy-id -i secrets/id_ed25519_ubuntu ubuntu-server@192.168.1.202

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
# ------------ Administrative commands and Others ------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Refresh terminal in ubuntu to see changes.

bash --login

# To remove a folder along files

sudo rm -r foldername

# To remove locked folder in ubuntu

sudo nautilus

# To remove cloudflared service

cloudflared service uninstall

# To remove cloudflare package

sudo apt-get remove cloudflared

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