# ------------------------------------------------------------------------------------------------------------
# ------------ Docker Registry Commands ----------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

docker tag main-prod:latest 192.168.1.201:5000/main-prod:latest
docker tag auth-prod:latest 192.168.1.201:5000/auth-prod:latest
docker tag businesses-prod:latest 192.168.1.201:5000/businesses-prod:latest
docker tag countries-prod:latest 192.168.1.201:5000/countries-prod:latest
docker tag queues-prod:latest 192.168.1.201:5000/queues-prod:latest
docker tag users-prod:latest 192.168.1.201:5000/users-prod:latest
docker tag troophunter-prod:latest 192.168.1.201:5000/troophunter-prod:latest
docker tag helloabdul-prod:latest 192.168.1.201:5000/helloabdul-prod:latest
docker tag dev8x-prod:latest 192.168.1.201:5000/dev8x-prod:latest

docker push 192.168.1.201:5000/main-prod:latest
docker push 192.168.1.201:5000/auth-prod:latest
docker push 192.168.1.201:5000/businesses-prod:latest
docker push 192.168.1.201:5000/countries-prod:latest
docker push 192.168.1.201:5000/queues-prod:latest
docker push 192.168.1.201:5000/users-prod:latest
docker push 192.168.1.201:5000/troophunter-prod:latest
docker push 192.168.1.201:5000/helloabdul-prod:latest
docker push 192.168.1.201:5000/dev8x-prod:latest

k8s-ctrlr@k8s-ctrlr:~$ sudo kubeadm config images pull --kubernetes-version=v1.33.4
[config/images] Pulled registry.k8s.io/kube-apiserver:v1.33.4
[config/images] Pulled registry.k8s.io/kube-controller-manager:v1.33.4
[config/images] Pulled registry.k8s.io/kube-scheduler:v1.33.4
[config/images] Pulled registry.k8s.io/kube-proxy:v1.33.4
[config/images] Pulled registry.k8s.io/coredns/coredns:v1.12.0
[config/images] Pulled registry.k8s.io/pause:3.10
[config/images] Pulled registry.k8s.io/etcd:3.5.21-0
k8s-ctrlr@k8s-ctrlr:~$ 

# ------------------------------------------------------------------------------------------------------------
# ------------ Docker Commands -------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Stop container/containers

    docker stop container_id
    docker stop $(docker ps -a -q)

# Run the following command to remove containers in your docker.

    docker system prune -f
    docker container prune
    docker container prune -f

# Run the following command to remove images in your docker.

    docker image prune -a -f
    docker image prune
    docker image prune -f
    docker rmi $(docker images -q)
    docker rmi auth-dev:latest

# Run the following command to remove all dangling images.

    docker image prune

# To see all docker containers running

    docker ps -a

# To see logs of all docker containers

    docker logs --details -f container_id

# To enter into container's terminal

    docker exec -it container_name bash

# To check the container ip address

    docker inspect container_name | grep -i ipaddress

# To see the docker resource usage

    docker stats

# To see the docker information

    docker info