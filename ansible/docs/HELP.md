# ------------------------------------------------------------------------------------------------------------
# ------------ Ansible Commands ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# To create/edit vault secrets

ansible-vault create secrets/github_token
ansible-vault edit secrets/github_token
github_token: "xxxxxxxxxxxx"

# To run ansible script

ansible-playbook --ask-vault-pass playbooks/main.connectops.yml
ansible-playbook --ask-vault-pass playbooks/main.registry.yml
ansible-playbook --ask-vault-pass playbooks/main.prod.yml
ansible-playbook --ask-vault-pass playbooks/main.stag.yml
ansible-playbook --ask-vault-pass playbooks/main.dev.yml
ansible-playbook --ask-vault-pass playbooks/main.scraper.yml

# ------------------------------------------------------------------------------------------------------------
# ------------ Accessing K8s from Local Machine --------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------


sudo cp /etc/kubernetes/admin.conf /home/k8s-ctrlr/admin.conf
sudo chown k8s-ctrlr:k8s-ctrlr /home/k8s-ctrlr/admin.conf
sudo scp -i terraform/secrets/id_rsa_k8s_ctrlr k8s-ctrlr@192.168.1.205:/home/k8s-ctrlr/admin.conf ~/kubeadm-config
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
# ------------ Verdicco Setup --------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Run below command in ubuntu vm
docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio

## Create .npmrc file in root directory of monorepo and paste below content
registry=http://192.168.1.100:4873

## Run below command in ubuntu vm to check verdicco storage size for node_modules
docker exec -it verdaccio sh
du -sh /verdaccio/storage