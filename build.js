const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// Custom transform for converting pixels to rem
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: function(token) {
    return ['spacing', 'fontSizes', 'borderRadius', 'borderWidth'].includes(token.type) && 
           typeof token.value === 'string' && 
           token.value.endsWith('px');
  },
  transformer: function(token) {
    const val = parseFloat(token.value);
    if (isNaN(val)) return token.value;
    return `${val / 16}rem`;
  }
});

// Custom format for CSS with utility classes
StyleDictionary.registerFormat({
  name: 'css/variables-with-utilities',
  formatter: function(dictionary, config) {
    const tokens = dictionary.allTokens;
    
    let css = `:root {\n`;
    tokens.forEach(token => {
      css += `  --${token.name}: ${token.value};\n`;
    });
    css += `}\n\n`;

    // Add utility classes for colors
    css += `/* Color Utilities */\n`;
    tokens.filter(token => token.type === 'color').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.bg-${className} { background-color: var(--${token.name}); }\n`;
      css += `.text-${className} { color: var(--${token.name}); }\n`;
      css += `.border-${className} { border-color: var(--${token.name}); }\n`;
    });

    // Add utility classes for spacing
    css += `\n/* Spacing Utilities */\n`;
    tokens.filter(token => token.type === 'spacing').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.p-${className} { padding: var(--${token.name}); }\n`;
      css += `.pt-${className} { padding-top: var(--${token.name}); }\n`;
      css += `.pr-${className} { padding-right: var(--${token.name}); }\n`;
      css += `.pb-${className} { padding-bottom: var(--${token.name}); }\n`;
      css += `.pl-${className} { padding-left: var(--${token.name}); }\n`;
      css += `.px-${className} { padding-left: var(--${token.name}); padding-right: var(--${token.name}); }\n`;
      css += `.py-${className} { padding-top: var(--${token.name}); padding-bottom: var(--${token.name}); }\n`;
      css += `.m-${className} { margin: var(--${token.name}); }\n`;
      css += `.mt-${className} { margin-top: var(--${token.name}); }\n`;
      css += `.mr-${className} { margin-right: var(--${token.name}); }\n`;
      css += `.mb-${className} { margin-bottom: var(--${token.name}); }\n`;
      css += `.ml-${className} { margin-left: var(--${token.name}); }\n`;
      css += `.mx-${className} { margin-left: var(--${token.name}); margin-right: var(--${token.name}); }\n`;
      css += `.my-${className} { margin-top: var(--${token.name}); margin-bottom: var(--${token.name}); }\n`;
    });

    // Add utility classes for typography
    css += `\n/* Typography Utilities */\n`;
    tokens.filter(token => token.type === 'fontSizes').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.text-${className} { font-size: var(--${token.name}); }\n`;
    });

    tokens.filter(token => token.type === 'fontWeights').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.font-${className} { font-weight: var(--${token.name}); }\n`;
    });

    // Add utility classes for border radius
    css += `\n/* Border Radius Utilities */\n`;
    tokens.filter(token => token.type === 'borderRadius').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.rounded-${className} { border-radius: var(--${token.name}); }\n`;
    });

    // Add utility classes for shadows
    css += `\n/* Shadow Utilities */\n`;
    tokens.filter(token => token.type === 'boxShadow').forEach(token => {
      const className = token.name.replace(/\./g, '-');
      css += `.shadow-${className} { box-shadow: var(--${token.name}); }\n`;
    });

    return css;
  }
});

// Custom format for TypeScript definitions
StyleDictionary.registerFormat({
  name: 'typescript/definitions',
  formatter: function(dictionary) {
    const buildTokenInterface = (obj, indent = '') => {
      let result = '';
      for (const [key, value] of Object.entries(obj)) {
        if (value.value !== undefined) {
          result += `${indent}  ${key}: {\n`;
          result += `${indent}    value: string;\n`;
          result += `${indent}    type: '${value.type}';\n`;
          result += `${indent}  };\n`;
        } else {
          result += `${indent}  ${key}: {\n`;
          result += buildTokenInterface(value, indent + '  ');
          result += `${indent}  };\n`;
        }
      }
      return result;
    };

    const tokens = dictionary.tokens;
    
    return `// Generated design token types
export interface DesignTokens {
${buildTokenInterface(tokens)}
}

export declare const tokens: DesignTokens;
export default tokens;
`;
  }
});

// Register a custom transform group
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'size/rem', 'color/css']
});

// Function to create enhanced config
function createConfig() {
  return {
    source: ['tokens/**/*.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables'
          },
          {
            destination: 'styles.css',
            format: 'css/variables'
          },
          {
            destination: 'utilities.css',
            format: 'css/variables-with-utilities'
          }
        ]
      },
      scss: {
        transformGroup: 'scss',
        buildPath: 'dist/scss/',
        files: [{
          destination: '_variables.scss',
          format: 'scss/variables'
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: 'dist/js/',
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6'
          },
          {
            destination: 'tokens.d.ts',
            format: 'typescript/definitions'
          }
        ]
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [{
          destination: 'tokens.json',
          format: 'json'
        }]
      }
    }
  };
}

// Build function
function buildTokens() {
  console.log('🎨 Building design tokens...');
  
  const config = createConfig();
  const styleDictionary = StyleDictionary.extend(config);
  
  // Clean build directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  styleDictionary.buildAllPlatforms();
  
  console.log('✅ Design tokens built successfully!');
  console.log('📁 Generated files:');
  console.log('   - dist/css/variables.css (CSS custom properties)');
  console.log('   - dist/css/utilities.css (CSS utilities)');
  console.log('   - dist/scss/_variables.scss (SCSS variables)');
  console.log('   - dist/js/tokens.js (JavaScript ES6)');
  console.log('   - dist/js/tokens.d.ts (TypeScript definitions)');
  console.log('   - dist/json/tokens.json (JSON format)');
}

// Run if called directly
if (require.main === module) {
  buildTokens();
}

module.exports = {
  buildTokens,
  StyleDictionary
};
