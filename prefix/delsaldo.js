const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "addsaldo", 
    run: async(client, message, args) => {
    
    if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
         db.set(`${args[0]}.saldo`, `0`)
                
 message.channel.send(`<:carteira:1115827529559842876>・Valor removido do <@${args[0]}> `)
        
    }
}