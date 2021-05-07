const { Client, User, Team, Collection} = require("discord.js")
module.exports = class extends Client {
  constructor(options){
    super(options)
    this.ownerID = []
    this.commands = new Collection()
    this.ext = new Collection()
    this.on("ready", () => {
      console.log(this.user.tag + " is ready")
      this.fetchApplication().then(a => {
        if(a.owner instanceof User){
          this.ownerID.push(a.owner.id)
        }else if(a.owner instanceof Team){
          a.owner.members.forEach(m => {
            this.ownerID.push(m.user.id)
          })
        }
      })
    })
    
    this.on("message", message => {
      this.ext.forEach(ext => {
        if(ext.onmessage) ext.onmessage(message)
      })
        if(!this.prefix) this.prefix = '!'
        if(!message.content.startsWith(this.prefix)) return;
        const cmdn = message.content.slice(1).split(" ")[0]
        this.commands.forEach(cmd => {
          if(cmd.name == cmdn || cmd.aliases.includes(cmdn)) cmd.run(message)
        })
      })
      
      this.on("messageUpdate", (oldMessage,newMessage) => {
        this.ext.forEach(ext => {
        if(ext.onedit) ext.onedit(oldMessage,newMessage)
      })
      })
  }
  
  load_ext(name){
    if(!this.dirname) throw 'Missing dirname'
   let path = this.dirname + '/' + name.split("").map(m => m == '.' ? '/' : m).join("") + ".js"
   path = require(path)
   if(path.load) path.load(this)
   this.ext.set(name,path)
  }
  unload_ext(name){
    if(!this.dirname) throw 'Missing dirname'
     let pathn = this.dirname + '/' + name.split("").map(m => m == '.' ? '/' : m).join("") + ".js"
   let path = require(pathn)
   if(path.unload) path.unload(this)
   delete require.cache[require.resolve(pathn)]
   return this.ext.delete(name)
  }
  reload_ext(name){
    if(!this.dirname) throw 'Missing dirname'
     let pathn = this.dirname + '/' + name.split("").map(m => m == '.' ? '/' : m).join("") + ".js"
  let path = require(pathn)
   if(path.unload) path.unload(this)
   if(path.load) path.load(this)
  }
  add_cmd({name, description, aliases, run,hide}){
    if(!name) throw "No name"
    if(!description) description = 'Не задано'
    if(!aliases) aliases = []
    if(!run) run = message => message.reply("Данная команда ничего не делает ибо в ней забыли прописать 'run'")
    if(!hide) hide = false;
    this.commands.set(name,{name, description,aliases,run,hide})
  }
  isOwner(user){
    return this.ownerID.includes(user.id)
  }
  
  list_cmds(){
    let l = []
    this.commands.forEach(cmd => {
      if(!cmd.hide){
      l.push({name: cmd.name,description: cmd.description})
      }
    })
    return l;
  }
}