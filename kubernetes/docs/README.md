# Complete kubernetes setup in MacOS

## Step 1: Setup

Install Docker Desktop
Don't enable kubernetes

brew install kubectl
kubectl version --client
brew install minikube
minikube version
minikube start --cpus 6 --memory 7000 --driver=docker
minikube status
minikube dashboard
kubectl get nodes
kubectl get pods -A
brew install istioctl
istioctl version
istioctl install
kubectl get pod -n istio-system
istioctl install -f istio-values.yaml --set profile=default
kubectl get pod
kubectl get ns default --show-labels
kubectl label namespace default istio-injection=enabled
kubectl get ns default --show-labels
sudo nano /etc/hosts Or C:\Windows\System32\drivers\etc\hosts
127.0.0.1       troophunter.local
127.0.0.1       troophunter.dev
127.0.0.1       troophunter.stag
127.0.0.1       troophunter.prod

## Step 2: Commands for normal environment based setup

minikube start --cpus 6 --memory 7000 --driver=docker

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
kubectl apply -f kubernetes/istio/dev/
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/k8s/main/prod/

# Applied NodePort service configuration
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/istio/ingressgateway-service.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/istio/gateway.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/istio/prod/

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/cluster-resources/namespace-quota.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config describe quota -n default
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/cluster-resources/default-limitrange.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.0/vertical-pod-autoscaler/deploy/vpa-v1-crd-gen.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.0/vertical-pod-autoscaler/deploy/vpa-rbac.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/cluster-resources/istio-values.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config apply -f kubernetes/k8s/main/prod/

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get rs -n default
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config describe deploy main-prod -n default
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get events -n default --sort-by=.metadata.creationTimestamp

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get ns default --show-labels
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config label ns default istio-injection=enabled --overwrite
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config rollout restart deploy main-prod -n default

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config describe rs main-prod-975547d85 -n default
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config get pods -n default -l app=main-prod
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete deploy main-prod -n default

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.0/vertical-pod-autoscaler/deploy/vpa-v1-crd-gen.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.0/vertical-pod-autoscaler/deploy/vpa-rbac.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f kubernetes/cluster-resources/namespace-quota.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f kubernetes/cluster-resources/default-limitrange.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f kubernetes/cluster-resources/istio-sidecar-injector.yaml
sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config delete -f kubernetes/cluster-resources/istio-values.yaml
sudo istioctl install -f kubernetes/cluster-resources/istio-values.yaml --set profile=default --kubeconfig=/Users/abdulrehman/kubeadm-config

sudo kubectl --kubeconfig=/Users/abdulrehman/kubeadm-config describe quota -n default

```
abdulrehman@Abduls-MacBook-Pro-M1 ~ % sudo cat /etc/hosts
Password:
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
192.168.1.205 troophunter.stag
192.168.1.205 troophunter.dev
192.168.1.205 troophunter.loc
192.168.1.205 dev8x.prod
192.168.1.205 dev8x.stag
192.168.1.205 dev8x.dev 
192.168.1.205 dev8x.loc 
192.168.1.205 helloabdul.prod
192.168.1.205 helloabdul.stag
192.168.1.205 helloabdul.dev 
192.168.1.205 helloabdul.loc
```

kubectl get pods
kubectl port-forward service/main-prod 50002:50002
kubectl port-forward svc/countries-db 5432:5432
kubectl logs deployment/main-prod -c main-prod -f
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0
kubectl describe pod main-prod-645558854c-mwr8b // ErrImageNeverPull error

minikube ssh
docker pull 192.168.1.201:5000/auth-prod
cat /etc/docker/daemon.json
docker info | grep -A1 'Insecure Registries'
docker system df // To check docker space consumption
docker builder prune // to remove docker unused build cache
docker builder prune --all // To remove all build cache (used and unused)
docker volume prune // to remove docker volumes
docker volume ls -f dangling=true // to list down docker dangling volumes
docker system prune -af --volumes // to delete everything in docker
kubectl get svc -n istio-system istio-ingressgateway
kubectl get svc -A | grep ingressgateway | cat


## Step 3: Commands for kustomization environment based setup

minikube start --cpus 6 --memory 7000 --driver=docker

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
kubectl apply -f kubernetes/istio/dev/
kubectl get pods
kubectl port-forward service/main-prod 50002:50002
kubectl port-forward svc/countries-db 5432:5432
kubectl logs deployment/main-prod -c main-prod -f
kubectl logs auth-db-0 -c postgres
kubectl logs auth-db-0
kubectl describe pod main-prod-645558854c-mwr8b // ErrImageNeverPull error
kubectl get svc -n istio-system istio-ingressgateway
kubectl get svc -A | grep ingressgateway | cat

minikube ssh
docker pull 192.168.1.201:5000/auth-prod
cat /etc/docker/daemon.json
docker info | grep -A1 'Insecure Registries'
docker system df // To check docker space consumption
docker builder prune // to remove docker unused build cache
docker builder prune --all // To remove all build cache (used and unused)
docker volume prune // to remove docker volumes
docker volume ls -f dangling=true // to list down docker dangling volumes
docker system prune -af --volumes // to delete everything in docker