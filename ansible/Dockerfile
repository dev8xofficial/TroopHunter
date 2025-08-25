FROM ubuntu:22.04

ENV ANSIBLE_VERSION=9.5.1
ENV TERRAFORM_VERSION=1.8.5

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl wget unzip gnupg software-properties-common \
    openssh-client vim python3 python3-pip ssh \
    && rm -rf /var/lib/apt/lists/*

# Install Ansible
RUN pip3 install "ansible==${ANSIBLE_VERSION}"

# Install Terraform
RUN curl -fsSL https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -o terraform.zip \
    && unzip terraform.zip \
    && mv terraform /usr/local/bin/ \
    && chmod +x /usr/local/bin/terraform \
    && rm terraform.zip

# Default working directory
WORKDIR /workspace
