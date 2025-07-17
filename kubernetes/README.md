# Complete kubernetes setup in MacOS

## Step 1: Setup

Install Docker Desktop
Don't enable kubernetes

brew install kubectl
kubectl version --client
brew install minikube
minikube version
minikube start --cpus 4 --memory 6144 --driver=docker
minikube status
minikube dashboard
kubectl get nodes
kubectl get pods -A
brew install istioctl
istioctl version
istioctl install
kubectl get pod -n istio-system
kubectl get pod
kubectl get ns default --show-labels
kubectl label namespace default istio-injection=enabled
kubectl get ns default --show-labels

## Step 2: Commands for normal environment based setup

minikube start --cpus 4 --memory 6144 --driver=docker

eval $(minikube docker-env) OR minikube ssh -- docker images
minikube status

docker build -t main-prod:latest -f microservices/main/Dockerfile --target development .
docker build -t auth-prod:latest -f microservices/auth/Dockerfile --target development .
docker build -t businesses-prod:latest -f microservices/businesses/Dockerfile --target development .
docker build -t countries-prod:latest -f microservices/countries/Dockerfile --target development .
docker build -t queues-prod:latest -f microservices/queues/Dockerfile --target development .
docker build -t users-prod:latest -f microservices/users/Dockerfile --target development .
minikube image load main-prod:latest
minikube image load auth-prod:latest
minikube image load businesses-prod:latest
minikube image load countries-prod:latest
minikube image load queues-prod:latest
minikube image load users-prod:latest

kubectl delete -f kubernetes/k8s/main/dev/
kubectl apply -f kubernetes/k8s/main/dev/
kubectl apply -f kubernetes/istio/
kubectl get pods
kubectl port-forward service/main-prod 50002:50002
kubectl port-forward svc/countries-db 5432:5432
kubectl logs deployment/main-prod -c main-prod -f
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0
kubectl describe pod main-prod-645558854c-mwr8b // ErrImageNeverPull error

minikube ssh
docker pull 192.168.1.200:5000/auth-prod
cat /etc/docker/daemon.json
docker info | grep -A1 'Insecure Registries'
docker system df // To check docker space consumption
docker builder prune // to remove docker unused build cache
docker builder prune --all // To remove all build cache (used and unused)
docker volume prune // to remove docker volumes
docker volume ls -f dangling=true // to list down docker dangling volumes
docker system prune -af --volumes // to delete everything in docker


## Step 3: Commands for kustomization environment based setup

minikube start --cpus 4 --memory 6144 --driver=docker

eval $(minikube docker-env) OR minikube ssh -- docker images
minikube status

docker build -t main-prod:latest -f microservices/main/Dockerfile --target development .
docker build -t auth-prod:latest -f microservices/auth/Dockerfile --target development .
docker build -t businesses-prod:latest -f microservices/businesses/Dockerfile --target development .
docker build -t countries-prod:latest -f microservices/countries/Dockerfile --target development .
docker build -t queues-prod:latest -f microservices/queues/Dockerfile --target development .
docker build -t users-prod:latest -f microservices/users/Dockerfile --target development .
minikube image load main-prod:latest
minikube image load auth-prod:latest
minikube image load businesses-prod:latest
minikube image load countries-prod:latest
minikube image load queues-prod:latest
minikube image load users-prod:latest

kubectl delete -k kubernetes/k8s/main/overlays/dev/
kubectl apply -k kubernetes/k8s/main/overlays/dev/
kubectl apply -f kubernetes/istio/
kubectl get pods
kubectl port-forward service/main-prod 50002:50002
kubectl port-forward svc/countries-db 5432:5432
kubectl logs deployment/main-prod -c main-prod -f
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0
kubectl describe pod main-prod-645558854c-mwr8b // ErrImageNeverPull error

minikube ssh
docker pull 192.168.1.200:5000/auth-prod
cat /etc/docker/daemon.json
docker info | grep -A1 'Insecure Registries'
docker system df // To check docker space consumption
docker builder prune // to remove docker unused build cache
docker builder prune --all // To remove all build cache (used and unused)
docker volume prune // to remove docker volumes
docker volume ls -f dangling=true // to list down docker dangling volumes
docker system prune -af --volumes // to delete everything in docker
