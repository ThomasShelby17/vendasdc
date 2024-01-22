const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const metodo = new JsonDatabase({ databasePath:"./databases/myJsonMetodo.json" });
const perso = new JsonDatabase({ databasePath:"./databases/myJsonPerso.json" })

module.exports = {
    name: "criar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:planeta:1115828269774819348>・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`<a:planeta:1115828269774819348>・Você não deu nenhum ID a esse produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:planeta:1115828269774819348>・Você não pode colocar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:planeta:1115828269774819348>・Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Atualizar Embed')
            .setStyle('SECONDARY'),
      );
       
      const adici = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)}・Produtos do Servidor`)
        .setDescription(`
\`\`\`
Sem descrição ainda...
\`\`\`
**<a:planeta:1115828269774819348>・Nome: __Sem nome ainda...__**\n**<:carteira:1115827529559842876>・Preço: __exem:R$10__**\n**<:caixa:1115828666048450631>・Estoque: __0__**`)
        .setColor(config.get(`color`))
        .setImage(config.get(`imagem`))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [adici], components: [row]})
        
      const idproduto = args[0]
        db.set(`${idproduto}.idproduto`, `${idproduto}`)
        db.set(`${idproduto}.imagem`, `${config.get(`imagem`)}`)
        db.set(`${idproduto}.color`, `${config.get(`color`)}`)
        db.set(`${idproduto}.nome`, `Sem nome ainda...`) 
        db.set(`${idproduto}.cup`, `false`) 
        db.set(`${idproduto}.desc`, `Sem descrição ainda...`) 
        db.set(`${idproduto}.preco`, `10`)
        metodo.set(`${idproduto}.produto`, `Seu produto não foi configurado aqui, verifique seu produto na outra embed enviada.`)

        db.push(`${idproduto}.conta`, `${idproduto}`)
        const a = db.get(`${idproduto}.conta`);
        const removed = a.splice(0, 1);
        db.set(`${idproduto}.conta`, a);
       }
     }