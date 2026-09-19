@echo off
title MediKiosk - AI Clinical Intake & History Platform
echo Starting MediKiosk Production Server on http://localhost:3000 ...
cd /d "%~dp0"
call npm.cmd start
pause
