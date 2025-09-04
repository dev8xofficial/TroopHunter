# ------------------------------------------------------------------------------------------------------------
# ------------ Ansible Commands ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# To create/edit vault secrets

ansible-vault create secrets/github_token
ansible-vault edit secrets/github_token
github_token: "xxxxxxxxxxxx"

# To run ansible script

# Deploy only to development
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "!*_stag:!*_prod"

# Deploy only to staging
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "!*_dev:!*_prod"

# Deploy only to production
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.connectops.yml --limit "connect_ops_*:!*_dev:!*_stag"
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.registry.yml --limit "docker_*:!*_dev:!*_stag"
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "!*_stag:!*_dev"

# Deploy development and staging
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "!*_prod"

# Deploy development and production
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "!*_stag"

# Deploy development, staging and production
ansible-playbook --ask-vault-pass -i inventories/combined/hosts.ini playbooks/main.yml --limit "*_prod"

ansible-playbook --ask-vault-pass playbooks/main.scraper.yml


# ------------------------------------------------------------------------------------------------------------
# ------------ Accessing K8s from Local Machine --------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

ssh -i secrets/id_rsa_k8s_ctrlr k8s-ctrlr-dev@192.168.1.225
sudo cp /etc/kubernetes/admin.conf /home/k8s-ctrlr-dev/admin.conf
sudo chown k8s-ctrlr-dev:k8s-ctrlr-dev /home/k8s-ctrlr-dev/admin.conf
sudo scp -i terraform/secrets/id_rsa_k8s_ctrlr k8s-ctrlr-dev@192.168.1.225:/home/k8s-ctrlr-dev/admin.conf ~/kubeadm-dev-config
export KUBECONFIG=~/kubeadm-config
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get nodes
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get pods

ssh -i secrets/id_rsa_k8s_ctrlr k8s-ctrlr-stag@192.168.1.215
sudo cp /etc/kubernetes/admin.conf /home/k8s-ctrlr-stag/admin.conf
sudo chown k8s-ctrlr-stag:k8s-ctrlr-stag /home/k8s-ctrlr-stag/admin.conf
sudo scp -i terraform/secrets/id_rsa_k8s_ctrlr k8s-ctrlr-stag@192.168.1.215:/home/k8s-ctrlr-stag/admin.conf ~/kubeadm-stag-config
export KUBECONFIG=~/kubeadm-config
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get nodes
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get pods

ssh -i secrets/id_rsa_k8s_ctrlr k8s-ctrlr-prod@192.168.1.205
sudo cp /etc/kubernetes/admin.conf /home/k8s-ctrlr-prod/admin.conf
sudo chown k8s-ctrlr-prod:k8s-ctrlr-prod /home/k8s-ctrlr-prod/admin.conf
sudo scp -i terraform/secrets/id_rsa_k8s_ctrlr k8s-ctrlr-prod@192.168.1.205:/home/k8s-ctrlr-prod/admin.conf ~/kubeadm-prod-config
export KUBECONFIG=~/kubeadm-config
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get nodes
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get pods

rm -f ~/.ssh/known_hosts
ssh-keygen -f "/root/.ssh/known_hosts" -R "192.168.1.205"
sudo ssh-keygen -R 192.168.1.205

# ------------------------------------------------------------------------------------------------------------
# ------------ Generate Keys ---------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

openssl rand -base64 32

# ------------------------------------------------------------------------------------------------------------
# ------------ Host setup to access websites -----------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

/etc/hosts
```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
192.168.1.205 troophunter.prod
192.168.1.215 troophunter.stag
192.168.1.225 troophunter.develop
192.168.1.205 troophunter.loc
192.168.1.205 dev8x.prod
192.168.1.215 dev8x.stag
192.168.1.225 dev8x.develop
192.168.1.205 dev8x.loc 
192.168.1.205 helloabdul.prod
192.168.1.215 helloabdul.stag
192.168.1.225 helloabdul.develop
192.168.1.205 helloabdul.loc
```

C:\Windows\System32\drivers\etc\hosts
```
192.168.1.205 troophunter.prod
192.168.1.215 troophunter.stag
192.168.1.225 troophunter.develop
192.168.1.205 troophunter.loc
192.168.1.205 dev8x.prod
192.168.1.215 dev8x.stag
192.168.1.225 dev8x.develop
192.168.1.205 dev8x.loc 
192.168.1.205 helloabdul.prod
192.168.1.215 helloabdul.stag
192.168.1.225 helloabdul.develop
192.168.1.205 helloabdul.loc
```

Flush DNS cache (optional but recommended):
Open Command Prompt as Administrator and run:

```
ipconfig /flushdns
```