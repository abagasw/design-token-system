# 🎨 Token Studio for Figma Integration

This repository is compatible with [Token Studio for Figma](https://www.figmatokens.com/), allowing you to sync design tokens between Figma and your codebase.

## 🚀 Quick Setup

### 1. Install Token Studio Plugin
- Open Figma
- Go to Plugins → Browse all plugins
- Search for "Figma Tokens" (by Jan Six)
- Install the plugin

### 2. Connect to This Repository

1. **Open Token Studio in Figma**
   - Run the Figma Tokens plugin in any Figma file
   - Click on "Settings" (gear icon)

2. **Setup GitHub Sync**
   - Choose "GitHub" as your sync provider
   - Repository: `MIICollaboration/design-token-system`
   - Branch: `main`
   - File path: `figma-tokens.json`
   - Personal Access Token: (use the same token you used for pushing)

3. **Load Tokens**
   - Click "Pull from GitHub"
   - Your design tokens will load into Token Studio

## 📁 Files for Token Studio

- **`figma-tokens.json`** - Token Studio compatible format
- **`.tokenstudiorc`** - Configuration file for Token Studio

## 🎯 What You Can Do

### **In Figma:**
- Apply design tokens to your designs
- Create new tokens and sync them back
- Use token references (e.g., `{color.brand.primary}`)
- Generate token sets and themes

### **Token Categories Available:**
- **Colors**: Brand colors, neutral grays
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl
- **Typography**: Font sizes, weights, line heights
- **Border Radius**: none, sm, md, lg, xl, 2xl, full
- **Border Width**: none, thin, medium, thick
- **Box Shadows**: sm, base, md, lg, xl

## 🔄 Workflow

1. **Design in Figma** using tokens from Token Studio
2. **Modify tokens** in Token Studio interface
3. **Push changes** back to GitHub
4. **Automatic build** generates CSS/SCSS/JS files
5. **Use in development** via generated files

## 🛠️ Development Integration

After making changes in Token Studio:

```bash
# Pull latest changes
git pull origin main

# Rebuild design tokens
npm run build

# Generated files will be updated:
# - dist/css/styles.css
# - dist/css/variables.css  
# - dist/scss/_variables.scss
# - dist/js/tokens.js
```

## 📖 Token Studio Documentation

- [Official Documentation](https://docs.figmatokens.com/)
- [GitHub Sync Setup](https://docs.figmatokens.com/sync/github)
- [Token Types](https://docs.figmatokens.com/available-tokens)

## 🎨 Example Usage in Figma

1. **Select a shape or text**
2. **Open Token Studio panel**
3. **Apply tokens**:
   - Fill: `color.brand.primary`
   - Border radius: `borderRadius.md`
   - Spacing: `spacing.lg`

## 🔧 Troubleshooting

### Token Studio Can't Connect?
- Check your GitHub token has repository access
- Ensure repository is public or token has private repo access
- Verify branch name is `main`

### Tokens Not Updating?
- Click "Pull from GitHub" in Token Studio
- Check file path is `figma-tokens.json`
- Verify the JSON format is valid

### Build Errors?
- Run `npm install` to ensure dependencies
- Check `figma-tokens.json` syntax
- Run `npm run build` to see detailed errors
