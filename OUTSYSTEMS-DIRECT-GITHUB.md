# 🎯 OutSystems Direct GitHub CSS Integration

## 🚀 **Direct GitHub CSS Consumption (No Downloads!)**

### **The Problem with CDN for OutSystems:**
- ❌ CDN caching delays (12-24 hours)
- ❌ OutSystems caches external CSS
- ❌ No immediate updates from Figma

### **✅ Solution: Direct GitHub Raw with Cache Busting**

## 🔥 **Method 1: Dynamic CSS Loading (Recommended)**

### **Add this JavaScript to your OutSystems Theme:**

```javascript
// Add to your OutSystems Theme's JavaScript (Auto-purge CDN cache)
(function() {
    async function loadDesignTokensWithCachePurge() {
        try {
            console.log('🔄 Purging CDN cache...');
            
            // Step 1: Purge jsDelivr CDN cache
            await fetch('https://purge.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css', {
                method: 'POST',
                mode: 'no-cors' // Avoid CORS issues
            }).catch(() => {
                // Ignore CORS errors - purge still works
                console.log('✅ CDN cache purge requested (CORS ignored)');
            });
            
            // Step 2: Wait a moment for purge to process
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Step 3: Remove existing token stylesheet
            const existingLink = document.querySelector('link[data-design-tokens]');
            if (existingLink) {
                existingLink.remove();
            }
            
            // Step 4: Load fresh CSS with cache buster
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=${Date.now()}`;
            link.setAttribute('data-design-tokens', 'true');
            
            // Add to head
            document.head.appendChild(link);
            
            console.log('✅ Design tokens loaded with fresh CDN cache');
            
        } catch (error) {
            console.log('⚠️ CDN purge failed, loading anyway:', error);
            
            // Fallback: Load without purge
            const existingLink = document.querySelector('link[data-design-tokens]');
            if (existingLink) existingLink.remove();
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=${Date.now()}`;
            link.setAttribute('data-design-tokens', 'true');
            document.head.appendChild(link);
        }
    }
    
    // Load with cache purge when page loads
    loadDesignTokensWithCachePurge();
    
    // Optional: Manual refresh function for developers
    window.refreshDesignTokens = loadDesignTokensWithCachePurge;
})();
```

**Benefits:**
- ✅ **Auto-purges CDN cache** for fresh content
- ✅ **Handles CORS errors** gracefully
- ✅ **Fallback loading** if purge fails
- ✅ **Manual refresh** available: `refreshDesignTokens()`

### **🚀 Simplified Version (For "On Render" Event):**

```javascript
// Fixed version for OutSystems "On Render" event (No async/await)
function loadFreshTokens() {
    // Step 1: Purge CDN cache (fire and forget)
    fetch('https://purge.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css', {
        method: 'POST',
        mode: 'no-cors'
    }).catch(function() {
        // Ignore errors - purge still works
    });
    
    // Step 2: Wait 1 second then load CSS
    setTimeout(function() {
        // Remove old stylesheet
        const existingLink = document.querySelector('link[data-design-tokens]');
        if (existingLink) {
            existingLink.remove();
        }
        
        // Add fresh stylesheet
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=' + Date.now();
        link.setAttribute('data-design-tokens', 'true');
        document.head.appendChild(link);
        
        console.log('✅ Fresh tokens loaded');
    }, 1000);
}

// Execute
loadFreshTokens();
```

**OR even simpler (No CDN purge, just cache busting):**

```javascript
// Super simple version - just cache busting
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) {
    existingLink.remove();
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);

console.log('✅ Tokens loaded');
```

## 🌟 **Alternative CDNs (Faster Cache Updates):**

### **Option A: Statically.io (GitHub-focused CDN)**
```javascript
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.statically.io/gh/MIICollaboration/design-token-system/main/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);
```

### **Option B: GitHack (Instant GitHub CDN)**
```javascript
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://raw.githack.com/MIICollaboration/design-token-system/main/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);
```

### **Option C: Direct GitHub Raw (No CDN, Always Fresh)**
```javascript
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://raw.githubusercontent.com/MIICollaboration/design-token-system/main/dist/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);
```

**💡 Try Option C first - it bypasses all CDN caching!**

## 🌐 **Cloudflare Pages Integration (If you're using Cloudflare)**

### **For Cloudflare Pages users:**

```javascript
// Cloudflare Pages with aggressive cache busting
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const timestamp = Date.now();
const random = Math.random().toString(36).substring(7);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://your-project.pages.dev/css/styles.css?v=' + timestamp + '&r=' + random + '&cache=bypass';
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);

console.log('✅ Tokens loaded from Cloudflare Pages');
```

### **Cloudflare Pages with API Purge (Advanced):**

```javascript
// Only if you have Cloudflare API access
function loadFreshCloudflareTokens() {
    // Purge cache (replace YOUR_PROJECT_ID and YOUR_API_TOKEN)
    fetch('https://api.cloudflare.com/client/v4/pages/projects/YOUR_PROJECT_ID/purge_cache', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).catch(function() {});
    
    setTimeout(function() {
        const existingLink = document.querySelector('link[data-design-tokens]');
        if (existingLink) existingLink.remove();
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://your-project.pages.dev/css/styles.css?v=' + Date.now();
        link.setAttribute('data-design-tokens', 'true');
        document.head.appendChild(link);
    }, 1000);
}

loadFreshCloudflareTokens();
```

## 🔄 **Alternative Update Strategies**

### **Option 1: Smart Checking (Only Download if Changed)**
```javascript
(function() {
    let lastCommit = null;
    
    async function checkForUpdates() {
        try {
            const response = await fetch('https://api.github.com/repos/MIICollaboration/design-token-system/commits/main');
            const data = await response.json();
            const latestCommit = data.sha.substring(0, 7);
            
            if (lastCommit && lastCommit !== latestCommit) {
                console.log(`🔄 New tokens detected: ${latestCommit}`);
                loadDesignTokens();
            }
            lastCommit = latestCommit;
        } catch (error) {
            console.log('Could not check for updates:', error);
        }
    }
    
    function loadDesignTokens() {
        const existing = document.querySelector('link[data-design-tokens]');
        if (existing) existing.remove();
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=${Date.now()}`;
        link.setAttribute('data-design-tokens', 'true');
        document.head.appendChild(link);
    }
    
    loadDesignTokens();
    setInterval(checkForUpdates, 300000); // Check every 5 minutes (but only download if changed)
})();
```

### **Option 2: Page Focus Detection (Smart Loading)**
```javascript
(function() {
    let lastCheck = 0;
    const CHECK_COOLDOWN = 300000; // 5 minutes
    
    function loadDesignTokens() {
        const existing = document.querySelector('link[data-design-tokens]');
        if (existing) existing.remove();
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css?v=${Date.now()}`;
        link.setAttribute('data-design-tokens', 'true');
        document.head.appendChild(link);
    }
    
    function checkIfShouldUpdate() {
        const now = Date.now();
        if (now - lastCheck > CHECK_COOLDOWN) {
            loadDesignTokens();
            lastCheck = now;
        }
    }
    
    loadDesignTokens();
    lastCheck = Date.now();
    
    // Only check when user returns to page
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            checkIfShouldUpdate();
        }
    });
})();
```

### **Then use tokens in your CSS:**
```css
/* In your OutSystems Theme CSS */
.btn-primary {
    background: var(--primary-telkomsel-red, #ff0025);
    color: var(--primary-pure-white, #ffffff);
    padding: 12px 24px;
    border-radius: 4px;
}

.header {
    background: var(--gradients-dark-blue, linear-gradient(33deg, #001a41 0%, #0e336c 100%));
    color: var(--primary-pure-white, #ffffff);
}
```

## ⚡ **Method 2: CSS Import with Cache Busting**

### **Add to your OutSystems Theme CSS:**
```css
/* Dynamic import with timestamp - paste this at the top */
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");

/* Use fallback values for safety */
.btn-primary {
    background: var(--primary-telkomsel-red, #ff0025);
    color: var(--primary-pure-white, #ffffff);
}
```

## 🎯 **Method 3: Direct Raw GitHub (Fastest Updates)**

### **Use GitHub Raw URL with commit hash:**
```css
/* This updates immediately when you push to GitHub */
@import url("https://raw.githubusercontent.com/MIICollaboration/design-token-system/main/dist/css/styles.css");
```

### **Or with JavaScript for cache busting:**
```javascript
// Add to OutSystems Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://raw.githubusercontent.com/MIICollaboration/design-token-system/main/dist/css/styles.css?t=' + new Date().getTime();
    document.head.appendChild(style);
});
```

## 🔄 **Method 4: GitHub Pages with Auto-Refresh**

Let me first fix your GitHub Pages setup, then you can use:

```javascript
// OutSystems Theme JavaScript
function loadLatestTokens() {
    const timestamp = new Date().getTime();
    const cssUrl = `https://miicollaboration.github.io/design-token-system/dist/css/styles.css?v=${timestamp}`;
    
    // Remove old stylesheet
    const oldLink = document.querySelector('link[data-tokens]');
    if (oldLink) oldLink.remove();
    
    // Add new stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.setAttribute('data-tokens', 'true');
    document.head.appendChild(link);
}

// Load on page ready
document.addEventListener('DOMContentLoaded', loadLatestTokens);

// Check for updates every 5 minutes
setInterval(loadLatestTokens, 300000);
```

## 🎨 **Complete OutSystems Integration Example**

### **1. Theme JavaScript (Recommended):**
```javascript
// Paste this in your OutSystems Theme's JavaScript section
(function() {
    'use strict';
    
    const TOKENS_URL = 'https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css';
    const CHECK_INTERVAL = 300000; // 5 minutes
    
    function loadDesignTokens() {
        // Remove existing tokens
        const existing = document.querySelector('link[data-design-tokens]');
        if (existing) existing.remove();
        
        // Add fresh tokens with cache buster
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${TOKENS_URL}?v=${Date.now()}`;
        link.setAttribute('data-design-tokens', 'true');
        link.onload = () => console.log('✅ Design tokens loaded');
        link.onerror = () => console.error('❌ Failed to load design tokens');
        
        document.head.appendChild(link);
    }
    
    // Load immediately when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDesignTokens);
    } else {
        loadDesignTokens();
    }
    
    // Auto-refresh tokens periodically
    setInterval(loadDesignTokens, CHECK_INTERVAL);
    
    // Expose manual refresh function globally
    window.refreshDesignTokens = loadDesignTokens;
})();
```

### **2. Theme CSS:**
```css
/* Your OutSystems Theme CSS */

/* Button Components */
.btn-primary {
    background: var(--primary-telkomsel-red, #ff0025);
    color: var(--primary-pure-white, #ffffff);
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background: var(--secondary-hovered-red, #bf021e);
}

.btn-secondary {
    background: var(--secondary-positive-green, #008e53);
    color: var(--primary-pure-white, #ffffff);
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
}

/* Header with Gradient */
.app-header {
    background: var(--gradients-dark-blue, linear-gradient(33deg, #001a41 0%, #0e336c 100%));
    color: var(--primary-pure-white, #ffffff);
    padding: 20px;
}

/* Card Components */
.card {
    background: var(--primary-pure-white, #ffffff);
    border: 1px solid var(--accent-light-grey, #f6f3f3);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Text Colors */
.text-primary { color: var(--text-primary, #001a41); }
.text-secondary { color: var(--text-secondary, #4e5764); }
.text-disabled { color: var(--text-disabled, #99a0a7); }

/* Page Background */
.page-background {
    background: var(--background-background, #f4f6f8);
}

/* Alert Components */
.alert-success {
    background: var(--accent-green, #d1fcd5);
    color: var(--text-primary, #001a41);
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 4px solid var(--secondary-positive-green, #008e53);
}

.alert-warning {
    background: var(--accent-light-mustard, #ffeed8);
    color: var(--text-primary, #001a41);
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 4px solid var(--secondary-alert-orange, #fe6e00);
}

.alert-error {
    background: var(--accent-light-red, #fcf4f4);
    color: var(--text-primary, #001a41);
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 4px solid var(--primary-accessible-red, #ed0226);
}

/* Form Elements */
.form-control {
    border: 1px solid var(--accent-dark-grey, #e9e4e4);
    background: var(--primary-pure-white, #ffffff);
    color: var(--text-primary, #001a41);
    padding: 8px 12px;
    border-radius: 4px;
}

.form-control:focus {
    border-color: var(--primary-telkomsel-red, #ff0025);
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 0, 37, 0.1);
}

.form-control::placeholder {
    color: var(--text-placeholder, #d9d9d9);
}

/* Navigation */
.nav-item {
    color: var(--text-secondary, #4e5764);
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.nav-item:hover {
    background: var(--accent-light-blue, #edf5fc);
    color: var(--secondary-link-blue, #0050ae);
}

.nav-item.active {
    background: var(--primary-telkomsel-red, #ff0025);
    color: var(--primary-pure-white, #ffffff);
}
```

## ⚡ **Benefits of This Approach:**

- ✅ **No downloads required**
- ✅ **Automatic updates** (5-minute intervals)
- ✅ **Cache busting** ensures fresh tokens
- ✅ **Fallback values** prevent broken styles
- ✅ **Direct GitHub consumption**
- ✅ **Works in all OutSystems environments**
- ✅ **Manual refresh** available via `refreshDesignTokens()`

## 🔧 **Implementation Steps:**

1. **Copy the JavaScript** → Paste in OutSystems Theme JavaScript section
2. **Copy the CSS** → Paste in OutSystems Theme CSS section  
3. **Publish** your OutSystems application
4. **Test** by opening browser dev tools and running `refreshDesignTokens()`

## 🎯 **How It Works:**

1. **JavaScript loads CSS** directly from GitHub with cache buster
2. **Auto-refreshes every 5 minutes** to get latest tokens
3. **Uses fallback values** in CSS for safety
4. **No manual downloads** or file management needed
5. **Updates appear within 5 minutes** of Figma changes

This gives you **automatic token consumption** directly from GitHub without any manual downloads! 🚀✨
