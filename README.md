# How to run project

# Step 1 - Run docker application

# Step 2 - Run below command in the root directory of project.

    npm run build:prod

# Step 2(a) - If you want to run multiple projects than clone git repo in multile places. Change env files accordingly than run below commands.

    npm run build:stag
    npm run build:dev

# Step 3 - Run any command mentioned below in order to run the project.

    npm run start:prod
    npm run start:stag
    npm run start:dev

# Step 4 - Run command mentioned below in order to run the cid/cd flow in the project root directory.

    npm run start:ci

# ------------------------------------------------------------------------------------------------------------
# ------------ Important Information About Docker ------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Outer Ports/Inner Ports
Ports in .env, Dockerfile, inner ports in docker-compose would stay same. Only outer ports would differentiate and can be used in browser to access different services.

# ------------------------------------------------------------------------------------------------------------
# ------------ Helping Commands ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

# Run the following command to remove the already committed files/folders from the repository.

    git rm --cached -r logs **pycache**

# Run to discard all changes in git branch

    git reset --hard HEAD

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

# Run the following command to know which port is using which application or service in Mac

    lsof -i -n -P | grep LISTEN

## Copy folders and files from macOS to ubuntu server

    rsync -avz --progress \
        --exclude 'node_modules/' \
        --exclude 'production/' \
        --exclude '.turbo/' \
        /Users/abdulrehman/Workstation/hellobadul/microservices/TroopHunterNew/ \
        ubuntu-server@192.168.1.200:/home/ubuntu-server/TroopHunter/prod/

# Copy .env files from macbook to ubuntu server

    scp -rp /Users/abdulrehman/Workstation/hellobadul/development/troophunter/backend/.env ubuntu-server@192.168.1.200:/home/ubuntu-server/troophunter

# ------------------------------------------------------------------------------------------------------------
# ------------ Remove cloudflared from Ubuntu Server ---------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------

### 1. 🛑 Stop the Tunnel (if Running as a Service)

Check if it’s running:

```bash
ps aux | grep cloudflared
````

If it's running as a systemd service:

```bash
sudo systemctl stop cloudflared
sudo systemctl disable cloudflared
```

---

### 2. 🗑️ Delete the Tunnel Configuration and Certificate

Cloudflared stores its tunnels and certs in:

```bash
~/.cloudflared/
```

Remove the directory:

```bash
rm -rf ~/.cloudflared
```

If you ran `cloudflared` with `--config /etc/cloudflared/config.yml`, also remove:

```bash
sudo rm -rf /etc/cloudflared
```

---

### 3. ❌ Uninstall `cloudflared`

If installed via `.deb` package:

```bash
sudo apt remove cloudflared
sudo apt purge cloudflared
```

If downloaded manually to `/usr/local/bin/cloudflared`:

```bash
sudo rm -f /usr/local/bin/cloudflared
```

Also check:

```bash
which cloudflared
```

And remove whatever path it shows.

---

### 4. 🧯 Remove Systemd Service File (if Exists)

```bash
sudo rm -f /etc/systemd/system/cloudflared.service
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
```

---

### 5. 🧹 Clean Up Any Logs (Optional)

```bash
sudo journalctl --vacuum-time=1s
```

---

## ✅ Final Check

Ensure nothing is running or installed:

```bash
which cloudflared
ps aux | grep cloudflared
```

---

## ℹ️ Optional

Let me know if you also want to remove the tunnel from the [Cloudflare Zero Trust Dashboard](https://dash.teams.cloudflare.com/) or disassociate it from your domain/DNS settings.

```

Let me know if you want this in downloadable `.md` file or want to add usage history/cleanup from Cloudflare dashboard too.
```
