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

    Go to /workspace/ansible directory and run below command.
    ssh-copy-id -i secrets/id_ed25519_ubuntu nginx@IP

# Step 7 - Run this command to execute the initial setup for nginx.

    ansible-playbook --ask-vault-pass playbooks/main.nginx.yml

# Step 8 - Once below step completed, run the cloudlare command given into the tunnel.

    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && 

    sudo dpkg -i cloudflared.deb && 

    sudo cloudflared service install ...