const { Client, Collection} = require("discord.js")
class ClassClient extends Client{
  constructor(client_options,{token,prefix,blacklist}){
    super(client_options)
    
    if(!token) throw "Token?"
    this.commands = new Collection()
    this.prefix = prefix || "cc."
    this.blacklist = blacklist;
    this.login(token)
    this.on("ready", () => {
      console.log("CC | Client " + this.user.tag + " is ready!")
    })
    
    this.on("message", message => {
      if(message.channel.type == "dm") return;
      //if(blacklist(message).includes(message.author.id)) return;
      let prefix = this.prefix(message)
      if(!message.content.startsWith(prefix)) return;
      let cmd = message.content.slice(prefix.length).split(" ")[0]
      let command = this.commands.find(c => cmd == c.name || c.aliases.includes(cmd) )
      if(!command) return
      command.run(this,message)
    })
  }
  
  addCommand(command){
    let cmd = {}
    if(!command.name) throw "Command name?"
    if(!command.run) throw "Your command do nothing"
    cmd.name = command.name
    cmd.description = command.description || "Описание не задано"
    cmd.aliases = command.aliases || []
    cmd.run = command.run
    cmd.category = command.category
    this.commands.set(cmd.name,cmd)
    console.log("CC | Command " + cmd.name + " is loaded")
  }
  
 
}
module.exports = ClassClient
