@echo off
start /b npm start
timeout /t 15 > nul
start http://localhost:8040/
exit