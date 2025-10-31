@echo off
echo.
echo ========================================
echo   Smart ATM Simulation - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [2/4] Installing dependencies... This may take a few minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo [2/4] Dependencies already installed. Skipping...
)
echo.

echo [3/4] Starting backend server...
start "ATM Backend Server" cmd /k "npm run server"
timeout /t 3 /nobreak >nul
echo.

echo [4/4] Starting frontend development server...
start "ATM Frontend" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
echo.

echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

start http://localhost:3000

echo.
echo Press any key to close this window...
echo (The backend and frontend servers will keep running)
pause >nul
