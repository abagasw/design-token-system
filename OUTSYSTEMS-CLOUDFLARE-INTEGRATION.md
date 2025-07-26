# 🎯 OutSystems Code for Cloudflare Pages

## **Update Your OutSystems Integration:**

Replace your current URL with your new Cloudflare Pages URL:

### **For "On Render" Event:**

```javascript
// OutSystems - Cloudflare Pages integration
const existingLink = document.querySelector('link[data-design-tokens]');
if (existingLink) existingLink.remove();

const link = document.createElement('link');
link.rel = 'stylesheet';
// 👇 Replace with YOUR actual Cloudflare Pages URL
link.href = 'https://design-token-system.pages.dev/css/styles.css?v=' + Date.now();
link.setAttribute('data-design-tokens', 'true');
document.head.appendChild(link);

console.log('✅ Fresh tokens loaded from Cloudflare Pages');
```

### **Benefits with Cloudflare Pages:**

✅ **Instant Updates**: Your `_headers` file ensures no caching for `styles.css`  
✅ **Font Family Tokens**: `--font-families-telkomsel-batik-sans`, `--font-families-poppins`  
✅ **Shadow Tokens**: `--low`, `--high`, `--pressed`  
✅ **Global CDN**: Faster loading worldwide  

### **Your Token URLs:**

- **Main CSS**: `https://design-token-system.pages.dev/css/styles.css`
- **Variables**: `https://design-token-system.pages.dev/css/variables.css`
- **JSON**: `https://design-token-system.pages.dev/json/tokens.json`
- **JavaScript**: `https://design-token-system.pages.dev/js/tokens.js`

## **🔧 Testing Your Setup:**

1. **Deploy to Cloudflare**: Push code to trigger deployment
2. **Check _headers**: Verify cache control is working
3. **Test OutSystems**: Load tokens in your app
4. **Verify Updates**: Change a token and see instant updates

## **📊 Cache Behavior:**

- **styles.css**: No cache (always fresh) ⚡
- **Other files**: 60-second cache (fast + fresh) 🚀
