# Creating an R2 Bucket via Cloudflare Dashboard

Follow these steps to create an R2 bucket using the Cloudflare Web UI:

---

## 1. Log in
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in to your account.

## 2. Navigate to R2
- From the sidebar, select **R2**.

## 3. Create a Bucket
1. Click **Create bucket**.
2. Enter a **bucket name** (must be globally unique within your Cloudflare account).
3. (Optional) Choose a **region** if available (most accounts default to "Automatic").
4. Click **Create bucket** to finalize.

## 4. Get Bucket Details
- After creation, select your bucket.
- You’ll see:
  - **Bucket Name**
  - **Custom Domain** www.cdn.troophunter.com
  - **API Access Details** 
  - **Account ID** dash.cloudflare.com => R2 => API DropDown => Use R2 with APIs => https://xxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com

## 5. Configure Access (Optional)
- If you need programmatic access:
  1. Go to **R2 → Manage R2 API Tokens**.
  2. Click **Create API Token**.
  3. Assign permissions (e.g., `Object Read & Write`).
  4. Copy and securely store the **Access Key ID** and **Secret Access Key**.

---

✅ You now have an R2 bucket ready to use with your applications or Cloudflare Workers.
