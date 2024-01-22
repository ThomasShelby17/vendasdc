const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbL = new JsonDatabase({ databasePath:"./databases/myJsonLigados.json" })
const perso = new JsonDatabase({ databasePath:"./databases/myJsonPerso.json" })
const persos = new JsonDatabase({ databasePath:"./databases/Personalizar.json" })
const ms = require(`ms`)

module.exports = {
    name: "atualizar", 
    run: async(client, message, args) => {
        
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`Você não pode selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      message.delete();
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);

      
      const dateStr = Date.now() + ms(`72h`)
      const date = new Date(dateStr);
      const unixTimestamp = Math.floor(date.getTime() / 1000);
                            

     const embed1 = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)}・Sistema de Atualização`)
        .setDescription(`<:relogio:1141398569107075213> **・Sistema de atualização acaba:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)`)
        .setColor(`${db.get(`${args[0]}.color`)}`)
        
     message.channel.send({embeds: [embed1]})
     
      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel(`${persos.get(`botao`)}`)
            .setEmoji(`<:Carrinho_WJ:1141013966332645377>`)
            .setStyle(perso.get(`perso`)),
      );
    
let descricao = `${persos.get(`descricao`)}`;
descricao = descricao.replace("#{desc}", `${db.get(`${args[0]}.desc`)}`);
descricao = descricao.replace("#{nome}", `${db.get(`${args[0]}.nome`)}`);
descricao = descricao.replace("#{preco}", `${db.get(`${args[0]}.preco`)}`);
descricao = descricao.replace("#{estoque}", `${db.get(`${args[0]}.conta`).length}`);

let titulo = `${persos.get(`titulo`)}`;
titulo = titulo.replace("#{nome}", `${config.get(`title`)}`);
           
           
      const embed = new Discord.MessageEmbed()
        
        .setDescription(descricao)
        .setImage(`${db.get(`${args[0]}.imagem`)}`)
        .setFooter(`${persos.get(`rodape`)}`)
        .setColor(`${db.get(`${args[0]}.color`)}`)
        
     message.channel.send({embeds: [embed], components: [row]})
     
      const lopp = setInterval(function () {
          
      const time2 = setTimeout(function () {
          console.log('Acabou de atualizar.')
      clearInterval(lopp);
      }, 259200000)
      
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);
      message.channel.bulkDelete(1);

      const embed1 = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)}・Sistema de Atualização`)
        .setDescription(`<:relogio:1141398569107075213> **・Sistema de atualização acaba:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)`)
        .setColor(`${db.get(`${args[0]}.color`)}`)
        
      message.channel.send({embeds: [embed1]})
      message.channel.send({embeds: [embed], components: [row]})
      }, 1800000)
      
    }
}