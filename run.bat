@echo off
title Dossier - Due Diligence Platform
cls
echo ========================================================
echo       Dossier - Autonomous Due Diligence Research
echo ========================================================
echo.
echo [1/3] Checking dependencies...
python -c "import uvicorn, fastapi" 2>nul || pip install fastapi uvicorn
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend && npm install && cd ..
)

echo [2/3] Starting Backend API (Port 8006)...
start "Dossier API (Port 8006)" cmd /k "cd /d %~dp0backend && python -m uvicorn src.dossier.main:app --port 8006 --reload"

echo [3/3] Starting Frontend UI (Port 3006)...
start "Dossier UI (Port 3006)" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul
start http://localhost:3006
echo.
echo Dossier is running!
echo   Frontend : http://localhost:3006
echo   Backend  : http://localhost:8006/docs
echo.
echo Press any key to stop all Dossier processes...
pause >nul
taskkill /fi "WINDOWTITLE eq Dossier API*" /f >nul 2>&1
taskkill /fi "WINDOWTITLE eq Dossier UI*" /f >nul 2>&1
echo Done.
