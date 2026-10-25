@echo off
cd /d "%~dp0dist"
echo Serving built CV Master on http://localhost:8080
python -m http.server 8080
pause