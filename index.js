const { Client, Collection} = require("discord.js")
class ClassClient extends Client{
  constructor(client_options,{token,prefix}){
    super(client_options)
    
    if(!token) throw "Token?"
    this.commands = new Collection()
    this.prefix = prefix || "cc."
    this.login(token)
    this.on("ready", r => {
      console.log("CC | Client " + this.user.tag + " is ready!")
    })
    
    this.on("message", message => {
      let prefix = this.prefix()
      this.commands.forEach(c => {
        let cmd = message.content.slice(prefix.length)
        if(cmd == c.name || c.aliases.includes(cmd)){
          c.run(this,message)
        }
      })
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
    this.commands.set(cmd.name,cmd)
    console.log("CC | Command " + cmd.name + " is loaded")
  }
  
 
}
module.exports = ClassClient