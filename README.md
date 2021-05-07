ClassClient - Simple command handler for discord.js

```
const CC = require("./cc")
const bot = new CC()
bot.login("token")
bot.prefix = '.'
bot.dirname = __dirname;
bot.ownerID = ["724536621868908635"]
bot.load_ext("ext.dev")
bot.add_cmd({
  name: "ping",
  description: "Pong!",
  run: message => message.reply(message.client.ws.ping)
})
```
