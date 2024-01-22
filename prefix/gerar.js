const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const ms = require(`ms`);
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "gerar", 
    run: async(client, message, args) => {
    
    if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        
const dateStr = Date.now() + ms(`${args[0]}d`)
                            const date = new Date(dateStr);
                            const unixTimestamp = Math.floor(date.getTime() / 1000);
                
 message.channel.send(`<:carteira:1115827529559842876>・Codigo de tempo gerado: \`${unixTimestamp}\``)
        
    }
}