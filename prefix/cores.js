const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const tempo = new JsonDatabase({ databasePath:"./databases/myJsonPerso.json" });
const perso = new JsonDatabase({ databasePath:"./databases/Personalizar.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "cores", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(message => setTimeout(() => message.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cinco')
            .setEmoji('<:carrinho:1116836145897164820>')
            .setLabel(`${perso.get(`botao`)}`)
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('dez')
            .setEmoji('<:carrinho:1116836145897164820>')
            .setLabel(`${perso.get(`botao`)}`)
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('quinze')
            .setEmoji('<:carrinho:1116836145897164820>')
            .setLabel(`${perso.get(`botao`)}`)
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('vinte')
            .setEmoji('<:carrinho:1116836145897164820>')
            .setLabel(`${perso.get(`botao`)}`)
            .setStyle('DANGER'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Personalização`)
          .setDescription(`
• **Escolha a cor que deseja no botão de Comprar**
• **Normalmente estão disponiveis 4 tipos de cores**`)
          .setColor(`${config.get(`color`)}`)], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "cinco") {
               interaction.deferUpdate();
                 tempo.set(`perso`, `SECONDARY`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                 
               }
           if (interaction.customId === "dez") {
               interaction.deferUpdate();
             tempo.set(`perso`, `SUCCESS`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                            
             }
           if (interaction.customId === "quinze") {
               interaction.deferUpdate();
             tempo.set(`perso`, `PRIMARY`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
                
                 }
           if (interaction.customId === "vinte") {
               interaction.deferUpdate();
             tempo.set(`perso`, `DANGER`)
                 message.channel.send("<:relogio:1115838051856437390>・Alterado!")
           }
               })
             }
           }