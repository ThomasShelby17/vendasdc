const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "produtos", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(db.all().length == 0) return message.reply(`❌・Não há nenhum produto criado no momento!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const itens = db.all().map(item => ``)
      const embed = new Discord.MessageEmbed()        
        .setTitle(`${config.get(`title`)}・Produtos Existentes`)
        .setThumbnail(config.get(`thumbnail`))
        .setColor(config.get(`color`))
      
        db.all().map(item => {
          embed.addField(`${item.ID}`, `\`\`\`${item.data.nome}\`\`\``, true)
        })
      message.reply({embeds: [embed]})
    }
}