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

    Go to /workspace/ansible/linux directory and run below command.
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

    Go to /workspace/ansible/linux directory and run below command.
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

# To edit github_token secret, go to /workspace/ansible/linux

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
# ------------ Verdicco Setup --------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Run below command in ubuntu vm
docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio

## Create .npmrc file in root directory of monorepo and paste below content
registry=http://192.168.1.100:4873

## Run below command in ubuntu vm to check verdicco storage size for node_modules
docker exec -it verdaccio sh
du -sh /verdaccio/storage

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

# ------------------------------------------------------------------------------------------------------------
# ------------ Kubernetes Setup ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Create k8s-ctrlr and k8s-node ubuntu server vm

## 2vCPU, 2GB RAM, Start at boot, Set Start/shutdown order 15 seconds of node, Qemu Guest Agent Enabled

## k8s-ctrlr, k8s-node

    sudo apt install qemu-guest-agent
    exit

## Set Static IP addresses of k8s-ctrlr, k8s-node by using WinBox, Reboot both vms.

## SSH login in both vm via terminal

## k8s-ctrlr, k8s-node

    sudo apt update && sudo apt dist-upgrade
    sudo apt install containerd
    systemctl status containerd
    sudo mkdir /etc/containerd
    containerd config default | sudo tee /etc/containerd/config.toml
    ls -l /etc/containerd
    sudo nano /etc/containerd/config.toml
    SystemdCgroup = true

## k8s-ctrlr, k8s-node, Disable swap by commenting value of it in /etc/fstab

    sudo nano /etc/fstab

## k8s-ctrlr, k8s-node, Enable briding in /etc/sysctl.conf

    sudo nano /etc/sysctl.conf
    net.ipv4.ip_forward=1

## k8s-ctrlr, k8s-node, Enable briding in /etc/modules-load.d/k8s.conf

    sudo nano /etc/modules-load.d/k8s.conf
    br_netfilter
    sudo reboot

## k8s-ctrlr, k8s-node, Follow  guide to install kuberentes in liux 
    
    https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

## k8s-node

    sudo cloud-init clean
    sudo rm -rf /var/lib/cloud/instances
    sudo truncate -s 0 /etc/machine-id
    sudo rm /var/lib/dbus/machine-id
    sudo ln -s /etc/machine-id /var/lib/dbus/machine-id
    ls -l /var/lib/dbus/machine-id
    cat /etc/machine-id
    sudo poweroff

## k8s-ctrlr
    
    kubeadm config images pull
    sudo kubeadm init --control-plane-endpoint=192.168.1.206 --node-name ubuntu-server --pod-network-cidr=10.244.0.0/16

    kubeadm join 192.168.1.206:6443 --token eb4c53.gtutt006bddgm8ox \
        --discovery-token-ca-cert-hash sha256:767d653eb656387ee2d9ff6251012b863957ebb9451dc2e263f9f9a6fe3d137c \
        --control-plane

    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config

    kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

    kubeadm token create --print-join-command

## k8s-node, Copy/paste token here.

    sudo kubeadm join 192.168.1.206:6443 --token eb4c53.gtutt006bddgm8ox \
        --discovery-token-ca-cert-hash sha256:767d653eb656387ee2d9ff6251012b863957ebb9451dc2e263f9f9a6fe3d137c \
        --control-plane

    kubectl label node k8s-node-1 node-role.kubernetes.io/worker=worker

## k8s-ctrlr

    sudo nano pod.yml

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-example
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: linuxserver/nginx
      ports:
        - containerPort: 80
          name: "nginx-http"
```
    
    kubectl apply -f pod.yml

    kubectl get pods

    kubectl get pods -o wide

    sudo nano service-nodeport.yml

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-example
spec:
  type: NodePort
  ports:
    - name: http
      port: 80
      nodePort: 30080
      targetPort: nginx-http
  selector:
    app: nginx
```

## Cleanup before re-initialize the control plane

    sudo kubeadm reset -f
    sudo systemctl stop kubelet
    sudo systemctl stop containerd
    sudo rm -rf /etc/kubernetes
    sudo rm -rf /var/lib/etcd
    sudo rm -rf ~/.kube
    sudo systemctl start containerd
    sudo systemctl start kubelet

## Cleanup before re-initialize the worker node

    sudo kubeadm reset -f
    sudo systemctl stop kubelet
    sudo systemctl stop containerd
    sudo rm -rf /etc/cni/net.d
    sudo rm -rf /etc/kubernetes
    sudo rm -rf /var/lib/kubelet /var/lib/kubeadm.yaml
    sudo systemctl start containerd
    sudo systemctl start kubelet

## Access kubeadm cluster in other devices

    sudo cp /etc/kubernetes/admin.conf /home/k8s-ctrlr/admin.conf
    sudo chown k8s-ctrlr:k8s-ctrlr /home/k8s-ctrlr/admin.conf
    sudo scp -i terraform/secrets/id_rsa_k8s_ctrlr k8s-ctrlr@192.168.1.206:/home/k8s-ctrlr/admin.conf ~/kubeadm-config
    export KUBECONFIG=~/kubeadm-config
    sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get nodes
    sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get pods