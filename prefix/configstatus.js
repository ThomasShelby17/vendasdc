const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "configstatus", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.channel.send(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokenconfig')
            .setEmoji('<:mp:1136044531985432596>')
            .setLabel('Acess Token Mercado Pago')
            .setStyle('PRIMARY'),
        );
        const row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('prefixconfig')
            .setEmoji('<:commands:1068828039003254804>')
            .setLabel('Prefixo dos comandos')
            .setStyle('SECONDARY'),
        );
        const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('statusconfig')
            .setEmoji('<:custom:1068828663233126410>')
            .setLabel('Status do bot')
            .setStyle('SECONDARY'),
        )
        const row3 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('imagemconfig')
            .setEmoji('<:image:1068825092957671454> ')
            .setLabel('Banner das embeds')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Configuração dos status`)
          .setDescription(`
<:aba:1068823118715551755>・Mercado Pago: \`\ Token Seguro \`
<:aba:1068823118715551755>・Prefixo: \` ${config.get(`prefix`)} \`
<:aba:1068823118715551755>・Status: \` ${config.get(`status`)} \`
<:aba:1068823118715551755>・Banner: [Link](${config.get(`imagem`)})`)
          .setColor(config.get(`color`))], components: [row, row1, row2, row3]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) {
           return;
          }

          if (interaction.customId === "tokenconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual o novo access token do seu mp?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", access_token => {
                 access_token.delete()
                 const newt = access_token.content
                 config.set(`access_token`, newt)
                 msg.edit("<a:sim:1115828258676678747>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração dos status`)
          .setDescription(`
<:aba:1068823118715551755>・Mercado Pago: \`\ Token Seguro \`
<:aba:1068823118715551755>・Prefixo: \` ${config.get(`prefix`)} \`
<:aba:1068823118715551755>・Status: \` ${config.get(`status`)} \`
<:aba:1068823118715551755>・Banner: [Link](${config.get(`imagem`)})`)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "prefixconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual o novo prefixo do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", prefix => {
                 prefix.delete()
                 const newt = prefix.content
                 config.set(`prefix`, newt)
                 msg.edit("<a:sim:1115828258676678747>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração dos status`)
          .setDescription(`
<:aba:1068823118715551755>・Mercado Pago: \`\ Token Seguro \`
<:aba:1068823118715551755>・Prefixo: \` ${config.get(`prefix`)} \`
<:aba:1068823118715551755>・Status: \` ${config.get(`status`)} \`
<:aba:1068823118715551755>・Banner: [Link](${config.get(`imagem`)})`)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
             
                  if (interaction.customId === "imagemconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual o link da imagem?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", imagem => {
                 imagem.delete()
                 const newt = imagem.content
                 config.set(`imagem`, newt)
                 msg.edit("<a:sim:1115828258676678747>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração dos status`)
          .setDescription(`
<:aba:1068823118715551755>・Mercado Pago: \`\ Token Seguro \`
<:aba:1068823118715551755>・Prefixo: \` ${config.get(`prefix`)} \`
<:aba:1068823118715551755>・Status: \` ${config.get(`status`)} \`
<:aba:1068823118715551755>・Banner: [Link](${config.get(`imagem`)})`)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }

             
          if (interaction.customId === "statusconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual os novos status do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", status => {
                 status.delete()
                 const newt = status.content
                 config.set(`status`, newt)
                 msg.edit("<a:sim:1115828258676678747>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração dos status`)
          .setDescription(`
<:aba:1068823118715551755>・Mercado Pago: \`\ Token Seguro \`
<:aba:1068823118715551755>・Prefixo: \` ${config.get(`prefix`)} \`
<:aba:1068823118715551755>・Status: \` ${config.get(`status`)} \`
<:aba:1068823118715551755>・Banner: [Link](${config.get(`imagem`)})`)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           })
         }
       };