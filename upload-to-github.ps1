Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Uploading Photo Calo AI to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version 2>&1
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, restart your terminal and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to initialize git repository" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Repository initialized" -ForegroundColor Green

Write-Host ""
Write-Host "Step 2: Adding all files..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Files added" -ForegroundColor Green

Write-Host ""
Write-Host "Step 3: Creating first commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Photo Calo AI app with modern design"
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to create commit" -ForegroundColor Red
    Write-Host ""
    Write-Host "Note: If this is your first time using Git, you need to configure your name and email:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host '  git config --global user.name "Your Name"' -ForegroundColor Cyan
    Write-Host '  git config --global user.email "your.email@example.com"' -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Adding GitHub remote..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Please enter your GitHub repository URL" -ForegroundColor Cyan
Write-Host "Example: https://github.com/yourusername/photo-calo-ai.git" -ForegroundColor Gray
Write-Host ""
$repoUrl = Read-Host "Enter your GitHub repository URL"

git remote add origin $repoUrl
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Remote might already exist, trying to update..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}
Write-Host "✓ Remote added" -ForegroundColor Green

Write-Host ""
Write-Host "Step 5: Renaming branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch renamed" -ForegroundColor Green

Write-Host ""
Write-Host "Step 6: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted to log in to GitHub" -ForegroundColor Gray
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Your project is now on GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can view it at: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ ERROR: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "This might be because:" -ForegroundColor Yellow
    Write-Host "  1. You need to authenticate with GitHub" -ForegroundColor Gray
    Write-Host "  2. The repository URL is incorrect" -ForegroundColor Gray
    Write-Host "  3. You don't have permission to push to this repository" -ForegroundColor Gray
}

Write-Host ""
Read-Host "Press Enter to exit"

