# Custom Design Token System

A comprehensive design token system built with Style Dictionary, similar to the Telkomsel design system.

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://yourusername.github.io/your-repo-name/demo.html)
[![npm version](https://img.shields.io/badge/npm-v1.0.0-green)](package.json)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

## 🎯 Features

- **Comprehensive Design Tokens**: Colors, typography, spacing, borders, shadows, and more
- **Multiple Output Formats**: CSS variables, SCSS variables, JavaScript ES6 modules, and JSON
- **Utility Classes**: Auto-generated utility classes for colors and spacing
- **Custom Transforms**: Pixel to rem conversion and other custom transformations
- **Type-Safe**: Structured token organization with clear typing

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Build Tokens

```bash
npm run build
```

This will generate tokens in multiple formats:
- `dist/css/variables.css` - CSS custom properties
- `dist/scss/_variables.scss` - SCSS variables
- `dist/js/tokens.js` - JavaScript ES6 module
- `dist/json/tokens.json` - JSON format

### Clean and Rebuild

```bash
npm run build:clean
```

## 📁 Project Structure

```
custom-design-tokens/
├── tokens/
│   └── tokens.json          # Source design tokens
├── dist/                    # Generated output files
│   ├── css/
│   ├── scss/
│   ├── js/
│   └── json/
├── config.json              # Style Dictionary configuration
├── index.js                 # Build script with custom transforms
└── package.json
```

## 🎨 Token Categories

### Colors
- **Brand Colors**: Primary, secondary, success, danger, warning, info
- **Neutral Colors**: White, black, and gray scale (50-900)

### Spacing
- **Scale**: xs (4px) → 3xl (64px)
- **Usage**: Padding, margins, gaps

### Typography
- **Font Sizes**: xs (12px) → 6xl (64px)
- **Line Heights**: none (1) → loose (2)
- **Font Weights**: thin (100) → black (900)

### Border & Layout
- **Border Radius**: none → full (9999px)
- **Border Width**: none → thick (4px)
- **Shadows**: sm → xl with proper opacity

## 💻 Usage Examples

### CSS
```css
/* Use CSS custom properties */
.button {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-md);
  border-radius: var(--borderradius-md);
  font-size: var(--fontSize-base);
}

/* Or use utility classes */
.card {
  @apply bg-color-neutral-white p-spacing-lg;
}
```

### JavaScript
```javascript
import tokens from './dist/js/tokens.js';

const primaryColor = tokens.color.brand.primary.value;
const mediumSpacing = tokens.spacing.md.value;
```

### SCSS
```scss
@import './dist/scss/variables';

.component {
  background-color: $color-brand-primary;
  padding: $spacing-md;
}
```

## 🔧 Customization

### Adding New Tokens
Edit `tokens/tokens.json`:

```json
{
  "color": {
    "brand": {
      "tertiary": {
        "value": "#purple",
        "type": "color"
      }
    }
  }
}
```

### Custom Transforms
Add custom transforms in `index.js`:

```javascript
StyleDictionary.registerTransform({
  name: 'custom/transform',
  type: 'value',
  matcher: function(token) {
    return token.type === 'spacing';
  },
  transformer: function(token) {
    return `${parseFloat(token.value) / 16}rem`;
  }
});
```

### Output Formats
Modify `config.json` to add new platforms or change existing ones:

```json
{
  "platforms": {
    "react-native": {
      "transformGroup": "react-native",
      "buildPath": "dist/rn/",
      "files": [{
        "destination": "tokens.js",
        "format": "javascript/es6"
      }]
    }
  }
}
```

## 🎭 Token Naming Convention

- **Hierarchical**: `category.subcategory.variant`
- **Semantic**: Meaningful names over values
- **Consistent**: Same pattern across all token types

Examples:
- `color.brand.primary`
- `spacing.md`
- `fontSize.2xl`
- `borderradius.lg`

## 🏗️ Build Process

1. **Source**: Design tokens defined in JSON format
2. **Transform**: Style Dictionary applies transformations
3. **Format**: Outputs in multiple formats (CSS, SCSS, JS, JSON)
4. **Distribute**: Generated files ready for consumption

## 📖 API Reference

### Available Tokens

#### Colors
- `color.brand.*` - Brand colors (primary, secondary, etc.)
- `color.neutral.*` - Neutral colors (white, black, gray.*)

#### Spacing
- `spacing.*` - Spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)

#### Typography
- `fontSize.*` - Font size scale
- `lineHeight.*` - Line height values
- `fontWeight.*` - Font weight values

#### Layout
- `borderradius.*` - Border radius values
- `borderWidth.*` - Border width values
- `shadow.*` - Box shadow definitions

## 🤝 Contributing

1. Add or modify tokens in `tokens/tokens.json`
2. Run `npm run build` to generate outputs
3. Test the generated tokens in your application
4. Submit a pull request with your changes

## 📄 License

ISC License - feel free to use this design token system in your projects!

## 🔗 GitHub Setup

To push this project to your GitHub account:

### Method 1: Using the Setup Script
```bash
./setup-github.sh
```

### Method 2: Manual Setup
1. Create a new repository on GitHub
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
3. Push to GitHub:
   ```bash
   git push -u origin main
   ```

### GitHub Pages Deployment
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source
4. The demo will be available at: `https://yourusername.github.io/your-repo-name/demo.html`

## 🚀 Continuous Integration
This project includes GitHub Actions workflow that:
- Automatically builds design tokens on every push
- Deploys the demo page to GitHub Pages
- Runs on Node.js 18 with npm caching for faster builds
