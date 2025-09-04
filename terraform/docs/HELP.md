# ------------------------------------------------------------------------------------------------------------
# ------------ Ubuntu VM Template | Kubernetes | Low Resources -----------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Navigate to a temporary directory in Proxmox Host

cd /var/lib/vz/template/iso

## Run the command

wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

## Then continue with VM template creation

qm create 9000 --name ubuntu-22.04-minimal-template --memory 256 --balloon 64 --cores 1 --net0 virtio,bridge=vmbr0 --agent enabled=1 --ostype l26
qm importdisk 9000 jammy-server-cloudimg-amd64.img local
ls /var/lib/vz/images/9000/
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local:9000/vm-9000-disk-0.raw
qm set 9000 --ide2 local:cloudinit
qm set 9000 --boot c --bootdisk scsi0
qm resize 9000 scsi0 2.5G
du -sh /var/lib/vz/images/9000/vm-9000-disk-0.raw
qm template 9000

# ------------------------------------------------------------------------------------------------------------
# ------------ Terraform Commands ----------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Move into terraform docker container, and run below commands

cd terraform/
rm -rf .terraform/ terraform.tfstate* .terraform.lock.hcl
terraform init
terraform plan

terraform workspace new development
terraform workspace new staging
terraform workspace new production

terraform workspace list
terraform workspace select development && terraform apply -var-file="secrets/development.tfvars" -target=module.k8s_vms

terraform workspace select staging && terraform apply -var-file="secrets/staging.tfvars" -target=module.k8s_vms

terraform workspace select production && terraform apply -var-file="secrets/production.tfvars" -target=module.connect_ops
terraform workspace select production && terraform apply -var-file="secrets/production.tfvars" -target=module.docker_registry
terraform workspace select production && terraform apply -var-file="secrets/production.tfvars" -target=module.k8s_vms


## To connect vms via ssh private key

ssh -i secrets/id_rsa_registry docker-registry@192.168.1.201
docker tag main-loc:latest 192.168.1.201:5000/main-loc:latest
docker push 192.168.1.201:5000/main-loc:latest