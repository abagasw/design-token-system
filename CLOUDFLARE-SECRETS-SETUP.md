# 🔐 GitHub Secrets Setup for Cloudflare Pages

## **Required Secrets:**

Go to your GitHub repository: 
**https://github.com/MIICollaboration/design-token-system/settings/secrets/actions**

Add these secrets:

### **1. CLOUDFLARE_API_TOKEN**
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: Your API token from Cloudflare (starts with something like `abc123...`)

### **2. CLOUDFLARE_ACCOUNT_ID**  
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: Your Cloudflare Account ID (32-character string)

## **How to add secrets:**

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**  
3. Enter name and value
4. Click **"Add secret"**
5. Repeat for both secrets

## **✅ Once added, your GitHub Actions will be able to deploy to Cloudflare Pages automatically!**
