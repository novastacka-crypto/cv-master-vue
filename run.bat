@echo off
cd /d "%~dp0"
echo Starting CV Master (Vue)...
start "" cmd /c "npm run dev"
timeout /t 3 /nobreak >nul
start http://127.0.0.1:5173/#/
pause