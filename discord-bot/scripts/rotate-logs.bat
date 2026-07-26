@echo off

cd /d C:\Users\SRB TROLLERSYT\Documents\Projects\xmd-official-website\discord-bot

if exist logs\bot-out.log (
    for %%A in (logs\bot-out.log) do (
        if %%~zA GTR 10485760 (
            move logs\bot-out.log logs\bot-out-%date:~-4%-%date:~4,2%-%date:~7,2%.log
        )
    )
)

if exist logs\bot-error.log (
    for %%A in (logs\bot-error.log) do (
        if %%~zA GTR 10485760 (
            move logs\bot-error.log logs\bot-error-%date:~-4%-%date:~4,2%-%date:~7,2%.log
        )
    )
)

pm2 reload xmd-discord-bot