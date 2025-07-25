const fs = require('fs');
const path = require('path');

/**
 * Convert Token Studio format to Style Dictionary format
 * This script helps sync tokens between Figma Token Studio and Style Dictionary
 * Updated to support W3C DTCG format with $value and $type
 */

function convertTokenStudioToStyleDictionary(tokenStudioData) {
  const styleDictionaryTokens = {};
  
  // Handle W3C DTCG format with proper token set selection
  let tokenSet;
  
  // Check for W3C DTCG format structure
  if (tokenStudioData.global) {
    tokenSet = tokenStudioData.global;
  } else if (tokenStudioData.$tokens) {
    // W3C DTCG format with $tokens
    tokenSet = tokenStudioData.$tokens;
  } else {
    // Try to get the first available token set
    const availableTokenSets = Object.keys(tokenStudioData).filter(key => 
      !key.startsWith('$') && typeof tokenStudioData[key] === 'object'
    );
    
    if (availableTokenSets.length > 0) {
      tokenSet = tokenStudioData[availableTokenSets[0]];
    } else {
      throw new Error('No valid token set found in Token Studio data');
    }
  }
  
  if (!tokenSet) {
    throw new Error('No token set found in Token Studio data');
  }
  
  console.log('🔍 Found token set with keys:', Object.keys(tokenSet));
  
  // Recursive function to process tokens
  function processTokens(obj, result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      // Skip metadata keys
      if (key.startsWith('$')) {
        continue;
      }
      
      if (value && typeof value === 'object' && (value.value !== undefined || value.$value !== undefined)) {
        // This is a token with a value (support both W3C DTCG $value and Token Studio value)
        const tokenValue = value.$value || value.value;
        const tokenType = value.$type || value.type;
        
        console.log(`📝 Processing token: ${key} = ${tokenValue} (type: ${tokenType})`);
        
        result[key] = {
          value: convertValue(tokenValue, tokenType),
          type: convertType(tokenType)
        };
        
        // Preserve description if it exists
        if (value.description || value.$description) {
          result[key].description = value.description || value.$description;
        }
        
      } else if (value && typeof value === 'object') {
        // This is a nested group
        console.log(`📁 Processing group: ${key}`);
        result[key] = {};
        processTokens(value, result[key]);
      }
    }
    return result;
  }
  
  // Convert values based on type
  function convertValue(value, type) {
    if (type === 'spacing' || type === 'borderRadius' || type === 'borderWidth' || type === 'fontSizes') {
      return `${value}px`;
    }
    
    if (type === 'boxShadow') {
      if (Array.isArray(value)) {
        // Multiple shadows
        return value.map(shadow => {
          return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
        }).join(', ');
      } else {
        // Single shadow
        return `${value.x}px ${value.y}px ${value.blur}px ${value.spread}px ${value.color}`;
      }
    }
    
    return value;
  }
  
  // Convert token types
  function convertType(type) {
    const typeMap = {
      'fontSizes': 'fontSizes',
      'lineHeights': 'lineHeights',
      'fontWeights': 'fontWeights',
      'borderRadius': 'borderRadius',
      'borderWidth': 'borderWidth',
      'spacing': 'spacing',
      'color': 'color',
      'boxShadow': 'boxShadow'
    };
    
    return typeMap[type] || type;
  }
  
  return processTokens(tokenSet, styleDictionaryTokens);
}

function convertStyleDictionaryToTokenStudio(styleDictionaryData) {
  const tokenStudioData = {
    global: {},
    $themes: [],
    $metadata: {
      tokenSetOrder: ['global']
    }
  };
  
  // Recursive function to process Style Dictionary tokens
  function processTokens(obj, result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && value.value !== undefined) {
        // This is a token with a value
        result[key] = {
          value: convertValueToTokenStudio(value.value, value.type),
          type: value.type
        };
      } else if (value && typeof value === 'object') {
        // This is a nested group
        result[key] = {};
        processTokens(value, result[key]);
      }
    }
    return result;
  }
  
  function convertValueToTokenStudio(value, type) {
    if (type === 'spacing' || type === 'borderRadius' || type === 'borderWidth' || type === 'fontSizes') {
      // Remove 'px' suffix for Token Studio
      return typeof value === 'string' ? value.replace('px', '') : value;
    }
    
    return value;
  }
  
  tokenStudioData.global = processTokens(styleDictionaryData);
  return tokenStudioData;
}

// Main execution
async function syncTokens(direction = 'figma-to-style') {
  try {
    if (direction === 'figma-to-style') {
      console.log('🔄 Converting Token Studio format to Style Dictionary...');
      
      // Read Token Studio file
      const tokenStudioPath = path.join(__dirname, 'figma-tokens.json');
      
      if (!fs.existsSync(tokenStudioPath)) {
        console.log('⚠️ figma-tokens.json not found, skipping conversion');
        return;
      }
      
      const tokenStudioData = JSON.parse(fs.readFileSync(tokenStudioPath, 'utf8'));
      
      // Check if file is empty or invalid
      if (!tokenStudioData || Object.keys(tokenStudioData).length === 0) {
        console.log('⚠️ figma-tokens.json is empty, skipping conversion');
        return;
      }
      
      // Convert to Style Dictionary format
      const styleDictionaryTokens = convertTokenStudioToStyleDictionary(tokenStudioData);
      
      // Ensure tokens directory exists
      const tokensDir = path.join(__dirname, 'tokens');
      if (!fs.existsSync(tokensDir)) {
        fs.mkdirSync(tokensDir, { recursive: true });
      }
      
      // Write to tokens directory
      const outputPath = path.join(__dirname, 'tokens', 'tokens.json');
      fs.writeFileSync(outputPath, JSON.stringify(styleDictionaryTokens, null, 2));
      
      console.log('✅ Converted tokens saved to tokens/tokens.json');
      console.log('🔧 Run "npm run build" to generate CSS files');
      
    } else if (direction === 'style-to-figma') {
      console.log('🔄 Converting Style Dictionary format to Token Studio...');
      
      // Read Style Dictionary file
      const styleDictionaryPath = path.join(__dirname, 'tokens', 'tokens.json');
      
      if (!fs.existsSync(styleDictionaryPath)) {
        console.log('⚠️ tokens/tokens.json not found, skipping conversion');
        return;
      }
      
      const styleDictionaryData = JSON.parse(fs.readFileSync(styleDictionaryPath, 'utf8'));
      
      // Convert to Token Studio format
      const tokenStudioData = convertStyleDictionaryToTokenStudio(styleDictionaryData);
      
      // Write to Token Studio file
      const outputPath = path.join(__dirname, 'figma-tokens.json');
      fs.writeFileSync(outputPath, JSON.stringify(tokenStudioData, null, 2));
      
      console.log('✅ Converted tokens saved to figma-tokens.json');
      console.log('🎨 Push to Figma using Token Studio plugin');
    }
    
  } catch (error) {
    console.error('❌ Error during conversion:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Command line usage
const direction = process.argv[2] || 'figma-to-style';

if (!['figma-to-style', 'style-to-figma'].includes(direction)) {
  console.log('Usage: node sync-tokens.js [figma-to-style|style-to-figma]');
  console.log('  figma-to-style: Convert figma-tokens.json to tokens/tokens.json');
  console.log('  style-to-figma: Convert tokens/tokens.json to figma-tokens.json');
  process.exit(1);
}

syncTokens(direction);

module.exports = { convertTokenStudioToStyleDictionary, convertStyleDictionaryToTokenStudio };
