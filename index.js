const StyleDictionary = require('style-dictionary');

// Register custom transforms
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: function(token) {
    return token.attributes.category === 'size' || 
           token.type === 'spacing' || 
           token.type === 'fontSizes' || 
           token.type === 'borderRadius';
  },
  transformer: function(token) {
    const val = parseFloat(token.value);
    if (isNaN(val)) return token.value;
    return `${val / 16}rem`;
  }
});

// Register custom format for CSS custom properties with fallbacks
StyleDictionary.registerFormat({
  name: 'css/variables-with-fallbacks',
  formatter: function(dictionary) {
    return `:root {
${dictionary.allTokens.map(token => 
  `  --${token.name}: ${token.value};`
).join('\n')}
}

/* Utility classes */
${dictionary.allTokens.filter(token => token.type === 'color').map(token => 
  `.bg-${token.name.replace(/\./g, '-')} { 
    background-color: var(--${token.name}); 
  }
  .text-${token.name.replace(/\./g, '-')} { 
    color: var(--${token.name}); 
  }`
).join('\n')}

${dictionary.allTokens.filter(token => token.type === 'spacing').map(token => 
  `.p-${token.name.replace(/\./g, '-')} { 
    padding: var(--${token.name}); 
  }
  .m-${token.name.replace(/\./g, '-')} { 
    margin: var(--${token.name}); 
  }`
).join('\n')}
`;
  }
});

// Build the style dictionary
const styleDictionary = StyleDictionary.extend('./config.json');

console.log('🎨 Building design tokens...');
styleDictionary.buildAllPlatforms();
console.log('✅ Design tokens built successfully!');

// Export tokens for programmatic use
module.exports = {
  tokens: styleDictionary.tokens,
  buildTokens: () => styleDictionary.buildAllPlatforms()
};
