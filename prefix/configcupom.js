const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "configcupom", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`❌・Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`❌・Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idcupom`)}`) return message.reply(`❌・Esse ID de cupom não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const adb = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('qtdcupom')
            .setEmoji('<:config:1115837571918995576>')
            .setLabel('Quantidade')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('mincupom')
            .setEmoji('<:config:1115837571918995576>')
            .setLabel('Mínimo')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctcupom')
            .setEmoji('<:config:1115837571918995576>')
            .setLabel('Porcentagem')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('delcupom')
            .setEmoji('<:config:1115837571918995576>')
            .setLabel('Excluir')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relcupom')
            .setEmoji('<:config:1115837571918995576>')
            .setLabel('Atualizar')
            .setStyle('SECONDARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Configurando o(a) ${adb}`)
          .setDescription(`
<:config:1115837571918995576>・Quantidade: ${db.get(`${adb}.quantidade`)}

<:config:1115837571918995576>・Mínimo: ${db.get(`${adb}.minimo`)} Reais

<:config:1115837571918995576>・Porcentagem: ${db.get(`${adb}.desconto`)}%`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("076FFD")], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delcupom") {
           msg.delete()
           msg.channel.send("<:config:1115837571918995576>・Excluido!")
           db.delete(`${adb}`)
         }
         if (interaction.customId === "qtdcupom") {
             interaction.deferUpdate();
             msg.channel.send("❓・Qual a nova quantidade de usos?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("❌・Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.quantidade`, `${message.content}`)
                 msg.edit("<:config:1115837571918995576>・Alterado!")
             })
           })
         }
         if (interaction.customId === "mincupom") {
             interaction.deferUpdate();
             msg.channel.send("❓・Qual o novo mínimo para uso em reais?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${adb}.minimo`, `${message.content.replace(",", ".")}`)
                 msg.edit("<:config:1115837571918995576>・Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctcupom') {
             interaction.deferUpdate();
             msg.channel.send("❓・Qual o novo desconto em porcentagem?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if(isNaN(message.content)) return msg.edit("❌・Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.desconto`, `${message.content}`)
                 msg.edit("<:config:1115837571918995576>・Alterado!")
             })
           })
         }
         if (interaction.customId === 'relcupom') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)}・Configurando o(a) ${adb}`)
             .setDescription(`
<:config:1115837571918995576>・Quantidade: ${db.get(`${adb}.quantidade`)}

<:config:1115837571918995576>・Mínimo: ${db.get(`${adb}.minimo`)} Reais

<:config:1115837571918995576>・Desconto: ${db.get(`${adb}.desconto`)}%`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor("076FFD")
           msg.edit({ embeds: [embed] })
           message.channel.send("<:config:1115837571918995576>・Atualizado!")
             }
           })
         }
       }