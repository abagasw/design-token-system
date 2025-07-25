# CSS Import Rules for Design Token System

Use these CSS import rules to include your design tokens in your projects:

## 📦 **CDN Import Options**

### **Option 1: jsDelivr CDN (Recommended)**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
```

### **Option 2: GitHub Pages (Direct)**
```css
@import url("https://miiCollaboration.github.io/design-token-system/css/styles.css");
```

### **Option 3: RawGit CDN**
```css
@import url("https://raw.githack.com/MIICollaboration/design-token-system/main/dist/css/styles.css");
```

### **Option 4: GitHub Raw (Not recommended for production)**
```css
@import url("https://raw.githubusercontent.com/MIICollaboration/design-token-system/main/dist/css/styles.css");
```

## 🎯 **Usage Examples**

### **Basic HTML Usage**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        @import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
        
        body {
            background-color: var(--primary-navy-blue);
            color: var(--primary-pure-white);
        }
        
        .button {
            background: var(--gradients-dark-red);
            color: var(--text-primary);
        }
    </style>
</head>
<body>
    <h1>Using Design Tokens</h1>
    <button class="button">Styled Button</button>
</body>
</html>
```

### **CSS File Usage**
```css
/* At the top of your CSS file */
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");

/* Then use your tokens */
.header {
    background-color: var(--primary-navy-blue);
    color: var(--primary-pure-white);
}

.alert {
    background-color: var(--secondary-alert-orange);
    color: var(--text-primary);
}

.gradient-bg {
    background: var(--gradients-dark-blue);
}
```

### **SCSS/Sass Usage**
```scss
// Import the CSS tokens first
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");

// Or use the SCSS variables directly
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/scss/_variables.scss");

.component {
    background-color: var(--primary-telkomsel-red);
    border-radius: 8px;
    
    &:hover {
        background-color: var(--secondary-hovered-red);
    }
}
```

## 🔄 **Version-Specific Imports**

### **Latest Version (Always Updated)**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
```

### **Specific Commit (Static)**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@1a15add/dist/css/styles.css");
```

### **Tag/Release (If you create releases)**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@v1.0.0/dist/css/styles.css");
```

## 🚀 **Performance Considerations**

### **Preload for Better Performance**
```html
<head>
    <!-- Preload the CSS for better performance -->
    <link rel="preload" href="https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css" as="style">
    
    <!-- Then import it -->
    <style>
        @import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
    </style>
</head>
```

### **Alternative: Link Tag (Faster than @import)**
```html
<head>
    <!-- Faster loading than @import -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css">
</head>
```

## 📚 **Available Files**

You can import different formats based on your needs:

### **CSS Custom Properties**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
```

### **CSS Variables Only**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/variables.css");
```

### **CSS Utilities**
```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/utilities.css");
```

### **SCSS Variables**
```scss
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/scss/_variables.scss");
```

## 🎨 **Available Tokens**

After importing, you can use these CSS custom properties:

```css
/* Primary Colors */
var(--primary-navy-blue)
var(--primary-accessible-red)
var(--primary-telkomsel-red)
var(--primary-pure-white)

/* Secondary Colors */
var(--secondary-positive-green)
var(--secondary-alert-orange)
var(--secondary-negative-orange)
var(--secondary-link-blue)

/* Text Colors */
var(--text-primary)
var(--text-secondary)
var(--text-tertiary)
var(--text-disabled)

/* Gradients */
var(--gradients-dark-red)
var(--gradients-dark-blue)
var(--gradients-candy-red)
/* ... and many more! */

/* Accent Colors */
var(--accent-light-grey)
var(--accent-dark-grey)
var(--accent-light-blue)
/* ... and more */
```

## ⚡ **Quick Start**

Copy and paste this into your HTML or CSS:

```css
@import url("https://cdn.jsdelivr.net/gh/MIICollaboration/design-token-system@main/dist/css/styles.css");
```

Then start using your design tokens immediately! 🎉
