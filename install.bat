@echo off
echo ========================================
echo Installing dependencies for sailab
echo ========================================

REM Activate sailab-web conda environment
call D:\anaconda\Scripts\activate.bat sailab-web

REM Navigate to sailab directory
cd /d %~dp0

REM Install npm dependencies with legacy peer deps
echo Installing npm packages...
npm install --legacy-peer-deps

echo.
echo ========================================
echo Installation complete!
echo ========================================
pause

