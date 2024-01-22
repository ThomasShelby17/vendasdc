const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbL = new JsonDatabase({ databasePath:"./databases/myJsonLigados.json" })
const perso = new JsonDatabase({ databasePath:"./databases/myJsonPerso.json" })
const persos = new JsonDatabase({ databasePath:"./databases/Personalizar.json" })

module.exports = {
    name: "setar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`Você não selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel(`${persos.get(`botao`)}`)
            .setEmoji(`<:buzzcarrinho:1141747883155144725>`)
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
        
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(descricao)
        .setImage(`${db.get(`${args[0]}.imagem`)}`)
        .setFooter(`${persos.get(`rodape`)}`)
        .setColor(`${db.get(`${args[0]}.color`)}`)
      message.channel.send({embeds: [embed], components: [row]})
    }
}