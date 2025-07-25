#!/bin/bash

# GitHub Repository Setup Script
# This script helps you push your design token system to GitHub

echo "🚀 Custom Design Token System - GitHub Setup"
echo "============================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a Git repository. Run 'git init' first."
    exit 1
fi

echo "📋 Before pushing to GitHub, please ensure you have:"
echo "   1. Created a new repository on GitHub"
echo "   2. Have your GitHub username and repository name ready"
echo ""

# Get repository information
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name: " REPO_NAME

# Validate inputs
if [ -z "$GITHUB_USERNAME" ] || [ -z "$REPO_NAME" ]; then
    echo "❌ Error: GitHub username and repository name are required."
    exit 1
fi

# Construct GitHub URL
GITHUB_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""
echo "🔗 Repository URL: $GITHUB_URL"
echo ""

# Ask for confirmation
read -p "Do you want to add this remote and push? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Operation cancelled."
    exit 0
fi

echo ""
echo "🔄 Setting up remote repository..."

# Add remote origin
git remote add origin "$GITHUB_URL"

if [ $? -ne 0 ]; then
    echo "⚠️  Remote 'origin' might already exist. Trying to update..."
    git remote set-url origin "$GITHUB_URL"
fi

echo "✅ Remote origin set to: $GITHUB_URL"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Your design token system has been pushed to GitHub!"
    echo ""
    echo "📱 Your repository is now available at:"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "🌐 GitHub Pages (if enabled):"
    echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/demo.html"
    echo ""
    echo "📖 Next steps:"
    echo "   • Visit your repository on GitHub"
    echo "   • Enable GitHub Pages in repository settings (optional)"
    echo "   • Add collaborators if needed"
    echo "   • Create issues and milestones"
else
    echo ""
    echo "❌ Error: Failed to push to GitHub."
    echo "   Please check your credentials and repository settings."
    echo ""
    echo "💡 Manual steps:"
    echo "   1. Create a new repository on GitHub named '$REPO_NAME'"
    echo "   2. Run: git remote add origin $GITHUB_URL"
    echo "   3. Run: git push -u origin main"
fi
