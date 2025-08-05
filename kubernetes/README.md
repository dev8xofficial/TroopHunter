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
docker pull 192.168.1.200:5000/auth-prod
cat /etc/docker/daemon.json
docker info | grep -A1 'Insecure Registries'
docker system df // To check docker space consumption
docker builder prune // to remove docker unused build cache
docker builder prune --all // To remove all build cache (used and unused)
docker volume prune // to remove docker volumes
docker volume ls -f dangling=true // to list down docker dangling volumes
docker system prune -af --volumes // to delete everything in docker



















Great question!  
Cloudflare now recommends using a **tunnel token** (from the Cloudflare dashboard) instead of the older `cert.json` credentials file.

### If you have a tunnel token (looks like `eyJh...`):

You should create a Kubernetes Secret containing a `token` file with the tunnel token as its contents.

---

## 1. Create a file with your tunnel token

Create a file named `token` (no extension) and paste your tunnel token into it:
```
eyJh...   # (your actual tunnel token)
```

---

## 2. Create the Kubernetes Secret & Run in root directory

```sh
kubectl create secret generic cloudflared-token --from-file=token=cloudflare/token
```
- This creates a secret named `cloudflared-token` with a key `token` containing your tunnel token.

---

## 3. Use the Token in Your Deployment

Update your `cloudflared` Deployment to mount the token and use the `--token` flag:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudflared
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cloudflared
  template:
    metadata:
      labels:
        app: cloudflared
    spec:
      containers:
        - name: cloudflared
          image: cloudflare/cloudflared:latest
          args:
            - tunnel
            - --no-autoupdate
            - run
            - --token
            - /etc/cloudflared/token
          volumeMounts:
            - name: cloudflared-token
              mountPath: /etc/cloudflared/token
              subPath: token
      volumes:
        - name: cloudflared-token
          secret:
            secretName: cloudflared-token
```

**Key points:**
- The token is mounted at `/etc/cloudflared/token`.
- The container runs:  
  `cloudflared tunnel --no-autoupdate run --token /etc/cloudflared/token`

---

## 4. No config.yaml needed

With the tunnel token, you do **not** need a `config.yaml` or `cert.json`.  
All configuration is handled by Cloudflare, and the token identifies the tunnel and its routes.

---

### Summary Table

| What you have         | What to do in Kubernetes                |
|-----------------------|-----------------------------------------|
| Tunnel token string   | Create a Secret with a `token` file     |
| `cert.json`           | (Old method, not needed for tokens)     |

---

**Let me know if you want a full manifest with your tunnel token secret included!**