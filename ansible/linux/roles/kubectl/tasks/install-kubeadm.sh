#!/bin/bash

set -e

KUBE_VERSION="1.30.1-1.1"

echo "[Step 1] Disable swap"
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

echo "[Step 2] Install containerd"
apt update && apt install -y containerd
mkdir -p /etc/containerd
containerd config default | tee /etc/containerd/config.toml
systemctl restart containerd
systemctl enable containerd

echo "[Step 3] Add Kubernetes repo"
apt install -y apt-transport-https ca-certificates curl gpg lsb-release
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes main" | tee /etc/apt/sources.list.d/kubernetes.list
apt update

echo "[Step 4] Install kubeadm, kubelet, kubectl"
apt install -y kubelet=$KUBE_VERSION kubeadm=$KUBE_VERSION kubectl=$KUBE_VERSION
apt-mark hold kubelet kubeadm kubectl

echo "[Step 5] Init Kubernetes (control-plane)"
kubeadm init --pod-network-cidr=192.168.0.0/16

echo "[Step 6] Setup kubeconfig"
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

echo "[Step 7] Install Calico CNI"
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml

echo "[Done] Kubernetes setup complete!"
