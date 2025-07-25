# 🚨 Cloudflare Pages Cache Busting Solutions

## Problem: Font Family Tokens Not Updating
- ✅ Local build has: `--font-families-telkomsel-batik-sans: Telkomsel Batik Sans;`
- ✅ Local build has: `--font-families-poppins: Poppins;`
- ❌ Cloudflare Pages still serving old cached version

## 🔥 **Solution 1: Nuclear Cache Busting (Strongest)**

```javascript
// OutSystems "On Render" - Nuclear option
function loadTokensNuclear() {
    // Remove all existing design token links
    document.querySelectorAll('link[data-design-tokens]').forEach(function(link) {
        link.remove();
    });
    
    // Create multiple cache-busting parameters
    const timestamp = Date.now();
    const random1 = Math.random().toString(36).substring(7);
    const random2 = Math.random().toString(36).substring(7);
    const sessionId = Math.floor(Math.random() * 1000000);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://your-project.pages.dev/css/styles.css?' + 
                'v=' + timestamp + 
                '&r1=' + random1 + 
                '&r2=' + random2 + 
                '&sid=' + sessionId + 
                '&cache=bypass' +
                '&force=true' +
                '&nocache=' + Date.now();
    
    link.setAttribute('data-design-tokens', 'true');
    
    // Force reload by adding and removing
    document.head.appendChild(link);
    
    // Log for debugging
    console.log('🚀 Nuclear cache bust:', link.href);
}

loadTokensNuclear();
```

## 🔧 **Solution 2: Cloudflare API Cache Purge (Advanced)**

```javascript
// Purge specific file from Cloudflare cache
function purgeCloudflareCache() {
    // Replace with your actual Cloudflare Zone ID and API token
    fetch('https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "files": [
                "https://your-project.pages.dev/css/styles.css"
            ]
        })
    }).then(function() {
        console.log('✅ Cloudflare cache purged');
        
        // Wait 2 seconds then load fresh CSS
        setTimeout(function() {
            const existingLink = document.querySelector('link[data-design-tokens]');
            if (existingLink) existingLink.remove();
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://your-project.pages.dev/css/styles.css?fresh=' + Date.now();
            link.setAttribute('data-design-tokens', 'true');
            document.head.appendChild(link);
        }, 2000);
        
    }).catch(function(error) {
        console.log('⚠️ Cache purge failed, using fallback');
        loadTokensNuclear();
    });
}

purgeCloudflareCache();
```

## 🎯 **Solution 3: Force Browser Cache Clear**

```javascript
// Force browser to clear its own cache
function loadTokensWithBrowserCacheClear() {
    // Clear browser cache for this domain (if possible)
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                caches.delete(cacheName);
            });
        });
    }
    
    // Remove existing
    const existingLink = document.querySelector('link[data-design-tokens]');
    if (existingLink) existingLink.remove();
    
    // Add with aggressive cache busting
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://your-project.pages.dev/css/styles.css?' + 
                'v=' + Date.now() + 
                '&nocache=true' +
                '&force=' + Math.random() +
                '&clear=' + new Date().getTime();
    
    link.setAttribute('data-design-tokens', 'true');
    
    // Add cache control headers via link attributes
    link.setAttribute('data-no-cache', 'true');
    
    document.head.appendChild(link);
    
    console.log('🧨 Browser cache cleared, fresh tokens loaded');
}

loadTokensWithBrowserCacheClear();
```

## 🚀 **Recommendation:**

1. **Try Solution 1 (Nuclear)** first - it should work immediately
2. **If still cached**, use Solution 3 (Browser cache clear)
3. **For production**, set up Solution 2 (API purge) with your Cloudflare credentials

## 📝 **Debug Steps:**

1. Open browser DevTools → Network tab
2. Run your OutSystems code
3. Check if the CSS request shows:
   - **Status 200 (from cache)** = Still cached ❌
   - **Status 200** = Fresh from server ✅
   
## ⚡ **Quick Test:**

Open your Cloudflare Pages URL directly in a new incognito window:
```
https://your-project.pages.dev/css/styles.css
```

If you see the font family tokens there, but not in OutSystems, then it's a browser cache issue.
