# cc
ClassClient - simple command handler for discord.js
```
const ClassClient = require ("cc")
const bot = new ClassClient({},{
token: "token",
prefix: (message) => "cc."
})

bot.addCommand({
name: "ping",
run: (bot,message) => message.reply(bot.ws.ping)
})
```
