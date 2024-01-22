const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "excluir", 
    run: async(client, message, args) => {
        if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:planeta:1115828269774819348>・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      const adb = args[0]
      db.delete(`${adb}`);
      message.channel.send("<:config:1115837571918995576>・Produto Deletado!")
            }
           }