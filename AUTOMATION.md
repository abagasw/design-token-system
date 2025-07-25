# 🤖 Automated Token-to-CSS Generation

This repository automatically converts your design tokens to CSS whenever tokens are updated, using GitHub Actions.

## 🚀 How It Works

### **Automatic Triggers**
The system automatically runs when you:
- ✅ Push changes to `figma-tokens.json` (from Figma Token Studio)
- ✅ Push changes to `tokens/tokens.json` (manual edits)
- ✅ Update any files in the `tokens/` directory

### **What Happens Automatically**
1. **🔍 Detection**: GitHub Actions detects which token files changed
2. **🔄 Conversion**: Automatically converts between Figma and Style Dictionary formats
3. **🏗️ Build**: Generates CSS, SCSS, and JavaScript files in the `dist/` folder
4. **📝 Commit**: Commits the generated files back to the repository
5. **🚀 Deploy**: Updates GitHub Pages with the latest CSS files

## 📁 Workflow Files

### **1. Token Sync Workflow** (`.github/workflows/token-sync.yml`)
**Purpose**: Intelligent bidirectional sync between Figma and Style Dictionary formats

**Triggers**:
- Changes to `figma-tokens.json`
- Changes to `tokens/tokens.json`
- Manual workflow dispatch

**Features**:
- ✅ Smart detection of which format was updated
- ✅ Automatic conversion between formats
- ✅ CSS generation and deployment
- ✅ Detailed commit messages showing what changed

### **2. Simple CSS Builder** (`.github/workflows/build-css.yml`)
**Purpose**: Simple workflow that just builds CSS from any token changes

**Triggers**:
- Any token file changes
- Build script changes
- Manual workflow dispatch

**Features**:
- ✅ Always ensures CSS is up-to-date
- ✅ Handles both Figma and Style Dictionary tokens
- ✅ Fast and reliable

## 🎨 Usage Examples

### **Scenario 1: Update Tokens from Figma**
1. In Figma Token Studio, push your tokens to GitHub
2. GitHub Actions automatically:
   - Detects `figma-tokens.json` was updated
   - Converts to Style Dictionary format
   - Builds CSS files
   - Commits and deploys

### **Scenario 2: Manual Token Edits**
1. Edit `tokens/tokens.json` directly in GitHub or locally
2. GitHub Actions automatically:
   - Detects Style Dictionary tokens changed
   - Builds CSS files
   - Commits and deploys

### **Scenario 3: Manual Workflow Trigger**
1. Go to **Actions** tab in GitHub
2. Select "Token Sync and Build"
3. Click "Run workflow"
4. Choose sync direction if needed

## 📦 Generated Files

After any token update, these files are automatically generated in `dist/`:

```
dist/
├── css/
│   └── styles.css          # CSS custom properties
├── scss/
│   └── _variables.scss     # SCSS variables
├── js/
│   └── tokens.js          # JavaScript ES6 module
└── json/
    └── tokens.json        # Flat token structure
```

## 🔗 Access Your CSS

Your CSS files are automatically deployed to:
**https://miiCollaboration.github.io/design-token-system/**

Use in your projects:
```html
<link rel="stylesheet" href="https://miiCollaboration.github.io/design-token-system/css/styles.css">
```

## 🛠️ Manual Commands

You can also run these commands locally:

```bash
# Convert Figma tokens to CSS (automatic sync + build)
npm run sync:from-figma

# Convert Style Dictionary tokens to Figma format
npm run sync:to-figma

# Just build CSS from existing tokens
npm run build

# Clean and rebuild everything
npm run build:clean
```

## 🔧 Configuration

### **Token Sources**
- **Figma Format**: `figma-tokens.json` (Token Studio for Figma)
- **Style Dictionary Format**: `tokens/tokens.json`

### **Build Configuration**
- **Style Dictionary Config**: `config.json`
- **Build Script**: `build.js`
- **Sync Script**: `sync-tokens.js`

### **GitHub Actions**
- **Main Sync**: `.github/workflows/token-sync.yml`
- **Simple Build**: `.github/workflows/build-css.yml`

## 📊 Workflow Status

Check the status of automatic builds:
- Go to the **Actions** tab in your GitHub repository
- View recent workflow runs
- See detailed logs and summaries

## 🚨 Troubleshooting

### **Workflow Not Running?**
- Check that files are being pushed to the `main` branch
- Verify the file paths match the workflow triggers
- Look at the Actions tab for error messages

### **CSS Not Updating?**
- Check if the workflow completed successfully
- Verify GitHub Pages is enabled in repository settings
- Clear your browser cache

### **Token Conversion Issues?**
- Check the workflow logs for conversion errors
- Ensure your token files have valid JSON syntax
- Verify token structure matches expected format

## 💡 Tips

1. **Commit Messages**: The workflows create descriptive commit messages showing what changed
2. **No Conflicts**: Workflows include `[skip ci]` to prevent infinite loops
3. **Smart Detection**: Only runs conversion when actually needed
4. **Manual Override**: You can always trigger workflows manually from the Actions tab

---

🎉 **Your design tokens now automatically become CSS whenever you make changes!**
