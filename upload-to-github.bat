@echo off
echo ========================================
echo Uploading Photo Calo AI to GitHub
echo ========================================
echo.

REM Set Git path (common installation locations)
set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_PATH%" set "GIT_PATH=C:\Program Files (x86)\Git\cmd\git.exe"

REM Check if git is in PATH
where git >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "GIT_CMD=git"
) else if exist "%GIT_PATH%" (
    set "GIT_CMD=%GIT_PATH%"
) else (
    echo ERROR: Git not found!
    echo Please install Git from: https://git-scm.com/download/win
    echo After installation, restart your terminal and run this script again.
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
"%GIT_CMD%" init
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to initialize git repository
    pause
    exit /b 1
)

echo.
echo Step 2: Adding all files...
"%GIT_CMD%" add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo.
echo Step 3: Creating first commit...
"%GIT_CMD%" commit -m "Initial commit: Photo Calo AI app with modern design"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create commit
    echo Note: If this is your first time using Git, you need to configure your name and email:
    echo.
    echo Run these commands:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    echo.
    pause
    exit /b 1
)

echo.
echo Step 4: Adding GitHub remote...
echo.
echo IMPORTANT: Please enter your GitHub repository URL
echo Example: https://github.com/yourusername/photo-calo-ai.git
echo.
set /p REPO_URL="Enter your GitHub repository URL: "

"%GIT_CMD%" remote add origin %REPO_URL%
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Remote might already exist, trying to update...
    "%GIT_CMD%" remote set-url origin %REPO_URL%
)

echo.
echo Step 5: Renaming branch to main...
"%GIT_CMD%" branch -M main

echo.
echo Step 6: Pushing to GitHub...
echo You may be prompted to log in to GitHub
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Your project is now on GitHub!
    echo ========================================
    echo.
    echo You can view it at: %REPO_URL%
) else (
    echo.
    echo ERROR: Failed to push to GitHub
    echo This might be because:
    echo   1. You need to authenticate with GitHub
    echo   2. The repository URL is incorrect
    echo   3. You don't have permission to push to this repository
)

echo.
pause

