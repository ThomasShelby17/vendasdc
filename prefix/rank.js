const Discord = require("discord.js")
const wio = require("wio.db");
const config = new wio.JsonDatabase({ databasePath:"./config.json" });
const db = new wio.JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });

module.exports = {
  name: "rank",
  description: "Veja o ranking de usuários no servidor",
    run: async(client, message, args) => {
      var grana = db.all().filter(i => i.data.gastosaprovados).sort((a, b) => b.data.gastosaprovados - a.data.gastosaprovados);
      var texto = ""
      if(grana.length < 5) return message.reply(`Você **não tem** clientes o suficiente, atualmente temos **apenas ${grana.length}/5** clientes.`, message)
      
      for (var i in grana) {
        let pos = grana.indexOf(grana[i]) + 1
        let user = client.users.cache.get(grana[i].ID) ? client.users.cache.get(grana[i].ID).tag : "Desconhecido (saiu)"
        texto += `**<:owner:1109637023825928273>・${pos}・${user}**\n<:carteira:1115827529559842876>・R$${grana[i].data.gastosaprovados}\n`
      }
        
      const rank = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}・Ranking de Clientes`)
        .setDescription(texto.split("\n15. ")[0])
        .setColor(config.get(`color`))
        .setThumbnail(client.user.displayAvatarURL())
      message.reply({ embeds: [rank] });
  }
}