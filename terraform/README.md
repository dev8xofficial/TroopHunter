# ------------------------------------------------------------------------------------------------------------
# ------------ Ubuntu Template for Kubernetes on Low Resources -----------------------------------------------
# ------------------------------------------------------------------------------------------------------------

## Navigate to a temporary directory in Proxmox Host

    cd /var/lib/vz/template/iso

## Run the command

    wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

## Then continue with VM template creation

    qm create 9000 --name ubuntu-22.04-minimal-template --memory 512 --cores 1 --net0 virtio,bridge=vmbr0 --agent enabled=1 --ostype l26
    qm importdisk 9000 jammy-server-cloudimg-amd64.img local
    ls /var/lib/vz/images/9000/
    qm set 9000 --scsihw virtio-scsi-pci --scsi0 local:9000/vm-9000-disk-0.raw
    qm set 9000 --ide2 local:cloudinit
    qm set 9000 --boot c --bootdisk scsi0
    qm resize 9000 scsi0 8G
    qm template 9000

## Test by Cloning Manually (Optional)

    qm clone 9000 9001 --name test-cloudinit-vm
    qm start 9001

## Move into terraform docker container, and run below commands

    cd terraform/
    rm -rf .terraform/ terraform.tfstate* .terraform.lock.hcl
    terraform init
    terraform apply -auto-approve