const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const tempo = new JsonDatabase({ databasePath:"./databases/myJsonTempo.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "tempo", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(message => setTimeout(() => message.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cinco')
            .setEmoji('<:relogio:1115838051856437390>')
            .setLabel('5 Minutos')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('dez')
            .setEmoji('<:relogio:1115838051856437390>')
            .setLabel('10 Minutos')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('quinze')
            .setEmoji('<:relogio:1115838051856437390>')
            .setLabel('15 Minutos')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('vinte')
            .setEmoji('<:relogio:1115838051856437390>')
            .setLabel('20 Minutos')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Configuração do tempo de pagamento`)
          .setDescription(`
• Escolha o tempo que os usuários vão ter para pagar por algum produto
• **Normalmente são 10 minutos, você tem entre 5/20 minutos**`)
          .setColor(`${config.get(`color`)}`)], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "cinco") {
               interaction.deferUpdate();
               row.components[3].setDisabled(true)
               row.components[2].setDisabled(true)
               row.components[1].setDisabled(true)
               row.components[0].setDisabled(true)
                message.edit({ components: [row] })
                
                 tempo.set(`minutos`, `5`)
                 tempo.set(`mili`, `300000`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                 
               }
           if (interaction.customId === "dez") {
               interaction.deferUpdate();
               row.components[3].setDisabled(true)
               row.components[2].setDisabled(true)
               row.components[1].setDisabled(true)
               row.components[0].setDisabled(true)
                message.edit({ components: [row] })
             tempo.set(`minutos`, `10`)
             tempo.set(`mili`, `600000`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                            
             }
           if (interaction.customId === "quinze") {
               interaction.deferUpdate();
               row.components[3].setDisabled(true)
               row.components[2].setDisabled(true)
               row.components[1].setDisabled(true)
               row.components[0].setDisabled(true)
                message.edit({ components: [row] })
             tempo.set(`minutos`, `15`)
             tempo.set(`mili`, `900000`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                
                 }
           if (interaction.customId === "vinte") {
               interaction.deferUpdate();
               row.components[3].setDisabled(true)
               row.components[2].setDisabled(true)
               row.components[1].setDisabled(true)
               row.components[0].setDisabled(true)
                message.edit({ components: [row] })
             tempo.set(`minutos`, `20`)
             tempo.set(`mili`, `1200000`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
           }
               })
             }
           }