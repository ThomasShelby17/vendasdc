const Discord = require("discord.js")
const wio = require("wio.db");
const config = new wio.JsonDatabase({ databasePath:"./config.json" });
const perms = new wio.JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new wio.JsonDatabase({ databasePath:"./databases/myJsonGifts.json" });

module.exports = {
  name: "gift", 
  description: "Crie e gerencie um gift card",
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`Você **não está** na lista de pessoas!`, message)
       function codigo() {
        var gerados = "";
        var codigos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         for (var i = 0; i < 10; i++)
           gerados += codigos.charAt(Math.floor(Math.random() * codigos.length));
         return gerados;
       }
        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('concluir')
            .setEmoji('<:verificar:1041765791470735410>')
            .setLabel('Concluir')
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cancelar')
            .setEmoji('<:emoji_52:1041744057023594536>')
            .setLabel('Cancelar')
            .setStyle('DANGER'),
        );
        
        const gerado = codigo()        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${client.user.username}・Criação de Gift Card`)
          .addField(`⚡ Estoque:`, `Nenhum...`)
          .addField(`⚡ Código:`, `${gerado}`)
          .setColor(config.get(`color`))], components: [row]})
        
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "concluir") {
             interaction.deferUpdate()
             const idcodigo = gerado
              db.set(`${idcodigo}.idgift`, `${idcodigo}`)
              db.set(`${idcodigo}.status`, `Disponivel`)
              db.push(`${idcodigo}.estoque`, `${idcodigo}`)
              const a = db.get(`${idcodigo}.estoque`);
              const removed = a.splice(0, 1);
              db.set(`${idcodigo}.estoque`, a);
               
             message.reply(`Envie os **novos estoques** no chat!`, embed).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
               collector.stop();
               message.delete()
               var estoque = message.content.split('\n');            
               for (let i = 0; i != estoque.length; i++) {
                 db.push(`${idcodigo}.estoque`, `${estoque[i]}`)

                 if(i + 1 === estoque.length) {
                   var texto = ""
                   var quant = 1
                   var estoque = `${db.get(`${idcodigo}.estoque`)}`.split(',');
            
                   for(let i in estoque) {
                     texto = `${texto}${quant}°・${estoque[i]}\n`
                     quant++
                   }
                     
                   row.components[0].setDisabled(true)
                   row.components[1].setDisabled(true)
                   message.reply(`Gift \`${gerado}\`\ Criado com sucesso!`, msg, 1)
                   const embednew = new Discord.MessageEmbed()
                     .setTitle(`${client.user.username}・Criação de Gift Card`)
                     .addField(`⚡ Estoque:`, `${texto}`)
                     .addField(`⚡ Código:`, `${gerado}`)
                     .setColor(config.get(`color`))
                   embed.edit({ embeds: [embednew], components: [row] })
                 }
               }
             })
           })
         }
        
           if (interaction.customId === "cancelar") {
             embed.delete()
           }
         })
       }
     };