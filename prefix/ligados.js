const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const dbL = new JsonDatabase({ databasePath:"./databases/myJsonLigados.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "ligados", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.channel.send(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('reembolsoL')
            .setEmoji('<:iniciando:1056779278861205524>')
            .setLabel('Ativar Reembolso')
            .setStyle('SECONDARY'),
        )
                .addComponents(
          new Discord.MessageButton()
            .setCustomId('reembolsoD')
            .setEmoji('<:iniciando:1056779278861205524>')
            .setLabel('Desativar Reembolso')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`Bot Store・Editando botões`)
          .setDescription(`
✨・reembolso: \` ${dbL.get(`reembolsoL`)} \``)
          .setColor("39363f")], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) {
           return;
          }

          
          if (interaction.customId === "reembolsoL") {
            interaction.deferUpdate();
            
                 dbL.set(`reembolsoL`, `false`)
                 message.channel.send("✅・Ativado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`Bot Store・Editando botões`)
                    .setDescription(`
✨・reembolso: \` ${dbL.get(`reembolsoL`)} \``)
                   .setColor("39363f")
                 embed.edit({ embeds: [embednew] })
                 
                 }
                           if (interaction.customId === "reembolsoD") {
            interaction.deferUpdate();
            
                 dbL.set(`reembolsoL`, `true`)
                 message.channel.send("✅・Desativado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`Bot Store・Editando botões`)
                    .setDescription(`
✨・reembolso: \` ${dbL.get(`reembolsoL`)} \``)
                   .setColor("39363f")
                 embed.edit({ embeds: [embednew] })
                 
                 }
             
           })
         }
       };