# 🌐 Cloudflare Setup for Design Token System

## 🚀 **Option 1: Cloudflare Pages (Recommended)**

### **Benefits:**
- ✅ **Instant cache purging** (no delays)
- ✅ **Free tier available**
- ✅ **Global CDN**
- ✅ **Better performance than jsDelivr**

### **Setup Steps:**

1. **Connect to GitHub:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub account
   - Select `MIICollaboration/design-token-system`

2. **Build Settings:**
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```

3. **Environment Variables:**
   ```
   NODE_VERSION=18
   ```

4. **Custom Domain (Optional):**
   - `tokens.yourdomain.com`
   - Or use provided `.pages.dev` domain

### **Result:**
Your tokens will be available at:
```
https://your-project.pages.dev/css/styles.css
```

## 🔧 **Fix Cloudflare Pages Caching Issues:**

### **Problem:** Cloudflare Pages still caches CSS files aggressively

### **Solution 1: Add Cache Headers (Recommended)**

Create `_headers` file in your `dist` folder:

```
# dist/_headers
/css/*
  Cache-Control: public, max-age=60, s-maxage=60
  
/css/styles.css
  Cache-Control: public, max-age=30, s-maxage=30
  Vary: Accept-Encoding
```

### **Solution 2: Cloudflare Pages API Purge**

```javascript
// OutSystems code with Cloudflare Pages cache purge
function loadFreshTokensCloudflare() {
    // Step 1: Purge Cloudflare Pages cache
    fetch('https://api.cloudflare.com/client/v4/pages/projects/YOUR_PROJECT_ID/purge_cache', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).catch(function() {
        console.log('Cache purge attempted');
    });
    
    // Step 2: Wait and load fresh CSS
    setTimeout(function() {
        const existingLink = document.querySelector('link[data-design-tokens]');
        if (existingLink) existingLink.remove();
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://your-project.pages.dev/css/styles.css?v=' + Date.now();
        link.setAttribute('data-design-tokens', 'true');
        document.head.appendChild(link);
        
        console.log('✅ Fresh tokens from Cloudflare Pages');
    }, 1000);
}

loadFreshTokensCloudflare();
```

### **Solution 3: Force Fresh Cache (Simplest)**

```javascript
// Super aggressive cache busting for Cloudflare Pages
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const timestamp = Date.now();
const random = Math.random().toString(36).substring(7);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://your-project.pages.dev/css/styles.css?v=' + timestamp + '&r=' + random;
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);

console.log('✅ Tokens loaded with aggressive cache busting');
```

### **Solution 4: Add Build-Time Cache Buster**

Update your `package.json` build script:

```json
{
  "scripts": {
    "build": "style-dictionary build && node add-cache-buster.js"
  }
}
```

Create `add-cache-buster.js`:

```javascript
// add-cache-buster.js
const fs = require('fs');
const path = require('path');

const timestamp = Date.now();
const stylesPath = path.join(__dirname, 'dist/css/styles.css');

if (fs.existsSync(stylesPath)) {
    let content = fs.readFileSync(stylesPath, 'utf8');
    
    // Add timestamp comment at top
    content = `/* Build: ${timestamp} */\n` + content;
    
    fs.writeFileSync(stylesPath, content);
    console.log(`✅ Cache buster added: ${timestamp}`);
}
```

---

## 🔧 **Option 2: Cloudflare Workers (Advanced)**

### **Create instant cache purging with API:**

```javascript
// Cloudflare Worker script
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/purge-cache') {
      // Purge cache instantly
      await fetch('https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_TOKEN',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: ['https://your-domain.com/css/styles.css']
        })
      });
      
      return new Response('Cache purged', { status: 200 });
    }
    
    // Proxy to GitHub
    const githubUrl = `https://raw.githubusercontent.com/MIICollaboration/design-token-system/main/dist${url.pathname}`;
    const response = await fetch(githubUrl);
    
    // Add cache headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    
    return newResponse;
  },
};
```

---

## 🌟 **Option 3: Alternative CDNs**

### **unpkg.com (Faster than jsDelivr):**
```javascript
// Better cache control
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://unpkg.com/your-package@latest/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);
```

### **Statically.io (GitHub-focused):**
```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.statically.io/gh/MIICollaboration/design-token-system/main/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);
```

---

## 🎯 **Quick Setup: Cloudflare Pages**

### **1. GitHub Actions for Auto-Deploy:**

```yaml
# .github/workflows/deploy-cloudflare.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build tokens
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: design-token-system
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### **2. OutSystems Code (Cloudflare):**

```javascript
// For Cloudflare Pages (instant updates)
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) {
    existingLink.remove();
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://your-project.pages.dev/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);

console.log('✅ Tokens loaded from Cloudflare');
```

---

## 🚀 **Recommendation:**

**Start with Cloudflare Pages** - it's free, fast, and has instant cache control!

Would you like me to help set this up?
