# Complete kubernetes setup in MacOS

## Step 1: Setup

Install Docker Desktop
Don't enable kubernetes

brew install kubectl
kubectl version --client
brew install minikube
minikube version
minikube start --cpus 6 --memory 4000 --driver=docker
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

minikube start --cpus 6 --memory 4000 --driver=docker

eval $(minikube docker-env)
minikube status

docker build -t main-dev:latest -f microservices/main/Dockerfile --target development .
docker build -t auth-dev:latest -f microservices/auth/Dockerfile --target development .
docker build -t businesses-dev:latest -f microservices/businesses/Dockerfile --target development .
docker build -t countries-dev:latest -f microservices/countries/Dockerfile --target development .
docker build -t queues-dev:latest -f microservices/queues/Dockerfile --target development .
docker build -t users-dev:latest -f microservices/users/Dockerfile --target development .

kubectl delete -f kubernetes/k8s/main/dev
kubectl apply -f kubernetes/k8s/main/dev
kubectl apply -f kubernetes/istio/
kubectl get pods
kubectl port-forward service/main-dev 50002:50002
kubectl logs deployment/main-dev -c main-dev
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0

## Step 3: Commands for kustomization environment based setup

minikube start --cpus 6 --memory 4000 --driver=docker

eval $(minikube docker-env)
minikube status

docker build -t main-dev:latest -f microservices/main/Dockerfile --target development .
docker build -t auth-dev:latest -f microservices/auth/Dockerfile --target development .
docker build -t businesses-dev:latest -f microservices/businesses/Dockerfile --target development .
docker build -t countries-dev:latest -f microservices/countries/Dockerfile --target development .
docker build -t queues-dev:latest -f microservices/queues/Dockerfile --target development .
docker build -t users-dev:latest -f microservices/users/Dockerfile --target development .

kubectl delete -k kubernetes/k8s/main/overlays/dev
kubectl apply -k kubernetes/k8s/main/overlays/dev
kubectl apply -f kubernetes/istio/
kubectl get pods
kubectl port-forward service/main-dev 50002:50002
kubectl logs deployment/main-dev -c main
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0
