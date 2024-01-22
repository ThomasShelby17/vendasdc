const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonKeys.json" });

module.exports = {
    name: "resgatarkey", 
    run: async(client, message, args, interaction) => {
      
      if(!args[0]) return message.reply(`:x:・Coloque no mínimo uma key`)
      if(args[1]) return message.reply(`:x:・Você não pode colocar mais de uma key!`)
      if(args[0] !== `${db.get(`${args[0]}.idgift`)}`) return message.reply(`:x:・Key inválida!`)
      if(`${db.get(`${args[0]}.status`)}` == `Resgatado`) return message.reply(`:x:・Key já resgatado!`)
      var texto = ""
      var quant = 1
      var estoque = `${db.get(`${args[0]}.estoque`)}`.split(',');
            
      for(let i in estoque) {
        texto = `${estoque[i]}`
        quant++
      }
      
      db.set(`${args[0]}.status`, `Resgatado`)
      db.delete(`${args[0]}.estoque`)
      
      message.react(`🎁`)
      
      const embed = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Key Resgatada`)
          .addField(`🎁・Cargo:`, `Erro de permissão, consulte um atendente.`)
          .addField(`🎁・Código:`, `${args[0]}`)
          .setColor(config.get(`color`))
      message.author.send({embeds: [embed]})
      
      const membro = interaction.user.id
                                               const roles = role.id === texto
                                               membro.roles.add(role)
                                               
    }
  }      