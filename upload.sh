#!/bin/bash

echo "========================================"
echo "Uploading Photo Calo AI to GitHub"
echo "========================================"
echo ""

# Configure Git (replace with your email)
echo "Step 1: Configuring Git..."
git config --global user.name "Raiden13th"
read -p "Enter your GitHub email: " email
git config --global user.email "$email"
echo "✓ Git configured"
echo ""

# Initialize repository
echo "Step 2: Initializing Git repository..."
git init
if [ $? -ne 0 ]; then
    echo "✗ ERROR: Failed to initialize repository"
    exit 1
fi
echo "✓ Repository initialized"
echo ""

# Add all files
echo "Step 3: Adding all files..."
git add .
if [ $? -ne 0 ]; then
    echo "✗ ERROR: Failed to add files"
    exit 1
fi
echo "✓ Files added"
echo ""

# Create commit
echo "Step 4: Creating first commit..."
git commit -m "Initial commit: Photo Calo AI app with modern design"
if [ $? -ne 0 ]; then
    echo "✗ ERROR: Failed to create commit"
    exit 1
fi
echo "✓ Commit created"
echo ""

# Rename branch to main
echo "Step 5: Renaming branch to main..."
git branch -M main
echo "✓ Branch renamed"
echo ""

# Add remote
echo "Step 6: Adding GitHub remote..."
git remote add origin https://github.com/Raiden13th/Photo-Calo-Counter.git
if [ $? -ne 0 ]; then
    echo "⚠ Remote might already exist, updating..."
    git remote set-url origin https://github.com/Raiden13th/Photo-Calo-Counter.git
fi
echo "✓ Remote added"
echo ""

# Push to GitHub
echo "Step 7: Pushing to GitHub..."
echo "You may be prompted to log in to GitHub"
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✓ SUCCESS! Project uploaded to GitHub!"
    echo "========================================"
    echo ""
    echo "View your project at:"
    echo "https://github.com/Raiden13th/Photo-Calo-Counter"
else
    echo ""
    echo "✗ ERROR: Failed to push to GitHub"
    echo ""
    echo "This might be because:"
    echo "  1. You need to authenticate with GitHub"
    echo "  2. You need a Personal Access Token"
    echo ""
    echo "To create a token:"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Click 'Generate new token (classic)'"
    echo "  3. Select 'repo' scope"
    echo "  4. Use the token as your password when prompted"
fi

echo ""
read -p "Press Enter to exit..."

