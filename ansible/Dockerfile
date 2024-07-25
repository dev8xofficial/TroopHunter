FROM ubuntu:22.04

ENV ANSIBLE_VERSION 9.5.1

COPY ansible ./etc/ansible/
COPY ansible/inventory/hosts ./ansible/
COPY ansible/secrets/id_ed25519_ubuntu /root/.ssh/
COPY ansible/secrets/id_ed25519_ubuntu.pub /root/.ssh/

RUN apt-get update && apt-get install -y vim python3 python3-pip ssh
RUN pip3 install "ansible==${ANSIBLE_VERSION}"