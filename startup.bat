@echo off
start /b mongod
timeout /t 5 > nul
start /b npm start
timeout /t 5 > nul
start http://localhost:8040/
exit