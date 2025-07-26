#!/bin/bash

# 🧪 Test Cloudflare Pages Cache Headers

echo "🧪 Testing Cloudflare Pages Cache Headers..."
echo ""

# Wait for deployment (you might need to update the URL)
CLOUDFLARE_URL="https://design-token-system.pages.dev"
CSS_URL="${CLOUDFLARE_URL}/css/styles.css"

echo "📡 Testing URL: $CSS_URL"
echo ""

# Test cache headers
echo "🔍 Checking Cache-Control headers..."
curl -I "$CSS_URL" 2>/dev/null | grep -i "cache-control" || echo "❌ Cache-Control header not found"

echo ""
echo "🔍 Checking if font family tokens exist..."
curl -s "$CSS_URL" | grep -q "font-families-telkomsel-batik-sans" && echo "✅ Telkomsel Batik Sans found" || echo "❌ Telkomsel Batik Sans not found"
curl -s "$CSS_URL" | grep -q "font-families-poppins" && echo "✅ Poppins found" || echo "❌ Poppins not found"

echo ""
echo "🔍 Checking shadow tokens..."
curl -s "$CSS_URL" | grep -q "\-\-low:" && echo "✅ --low shadow token found" || echo "❌ --low shadow token not found"
curl -s "$CSS_URL" | grep -q "\-\-high:" && echo "✅ --high shadow token found" || echo "❌ --high shadow token not found"
curl -s "$CSS_URL" | grep -q "\-\-pressed:" && echo "✅ --pressed shadow token found" || echo "❌ --pressed shadow token not found"

echo ""
echo "🎯 Next Steps:"
echo "1. If tokens are found ✅ - Update your OutSystems code with the Cloudflare URL"
echo "2. If cache headers show 'no-cache' ✅ - Your _headers file is working!"
echo "3. If anything is missing ❌ - Check the GitHub Actions logs"
