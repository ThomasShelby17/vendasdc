const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "estoque", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`❌・Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`❌・Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`❌・Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const adb = args[0];
      const itens = db.get(`${adb}.conta`);
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('addestoque')
            .setEmoji('<:caixa:1115828666048450631>')
            .setLabel('Adicionar')
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('remestoque')
            .setEmoji('<:caixa:1115828666048450631>')
            .setLabel('Remover')
            .setStyle('SUCCESS'),
        );
        
        const row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('clestoque')
            .setEmoji('<:delete:1109637048190636032>')
            .setLabel('Limpar Tudo')
            .setStyle('DANGER'),
        );
        const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('bckestoque')
            .setEmoji('<:nuvem:1136836890809614386>')
            .setLabel('Backup')
            .setStyle('SECONDARY'),
        );
        const row3 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('rlestoque')
            .setEmoji('<a:loading:1067015746812649563>')
            .setLabel('Atualizar')
            .setStyle('PRIMARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)}・Gerenciando o(a) ${adb}`)
        .setDescription(`
<:config:1115837571918995576>・Descrição: ${db.get(`${adb}.desc`)}
<:config:1115837571918995576>・Nome: ${db.get(`${adb}.nome`)}
<:config:1115837571918995576>・Preço: R$${db.get(`${adb}.preco`)} Reais
<:config:1115837571918995576>・Estoque: ${db.get(`${adb}.conta`).length}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("076FFD")], components: [row, row1, row2, row3]})
      const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
      interação.on("collect", async (interaction) => {
       if (message.author.id != interaction.user.id) { 
        return
       }
                
       if (interaction.customId === "addestoque") {
         interaction.deferUpdate();
         msg.channel.send("<:config:1115837571918995576>・Envie os novos produtos no chat!").then(msg => {
          const filter = m => m.author.id === interaction.user.id;
          const collector = msg.channel.createMessageCollector({ filter })
          collector.on("collect", message => {
             const content = message.content.split('\n');
             const contasnb = message.content.split('\n').length;
             var contas = content;
             var etapa = 0;
             var etapaf = contasnb;
             collector.stop();
             message.delete()
             const timer = setInterval(async function() {
             if(etapa === etapaf) {
              msg.edit(`<:config:1115837571918995576>・Pronto, \`${etapaf}\`\ Produtos foram adicionados com sucesso!`)
              clearInterval(timer)
              return;
             }
             const enviando = contas[etapa];
             db.push(`${adb}.conta`, `${enviando}`)
             etapa = etapa + 1
           }, 100)   
        })
      })
    }
   if (interaction.customId === "remestoque") {
     interaction.deferUpdate();
     msg.channel.send("<:config:1115837571918995576>・Envie a linha do produto que você quer remover!").then(msg => {
      const filter = m => m.author.id === interaction.user.id;
      const collector = msg.channel.createMessageCollector({ filter, max: 1 })
       collector.on("collect", message1 => {
          const a = db.get(`${adb}.conta`);
          a.splice(message1.content, 1)
          db.set(`${adb}.conta`, a);
          message1.delete()
          msg.edit(`<:config:1115837571918995576>・O Produto número \`${message1}\`\ foi removido com sucesso!`)
        })
      })
    }
   if (interaction.customId === 'clestoque') {
     interaction.deferUpdate();
     const a = db.get(`${adb}.conta`);
     const removed = a.splice(0, `${db.get(`${adb}.conta`).length}`);
      db.set(`${adb}.conta`, a);
      msg.channel.send("<:config:1115837571918995576>・Estoque limpo!")
    }
   if (interaction.customId === 'bckestoque') {
        interaction.deferUpdate();
        message.channel.send("<:config:1115837571918995576>・Enviado com sucesso!")
        var quantia = 1;
        var contas = `${db.get(`${adb}.conta`)}`.split(',');
        var backup = `• ${contas.join(`\n• `)}`
        const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)}・Backup feito`)
        .setDescription(`\`\`\`${backup} \`\`\``)
        .setColor("076FFD")
        message.author.send({embeds: [embed] })
      }
                
    if (interaction.customId === 'rlestoque') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)}・Gerenciando o(a) ${adb}`)
           .setDescription(`
<:config:1115837571918995576>・Descrição: ${db.get(`${adb}.desc`)}
<:config:1115837571918995576>・Nome: ${db.get(`${adb}.nome`)}
<:config:1115837571918995576>・Preço: R$${db.get(`${adb}.preco`)} Reais
<:config:1115837571918995576>・Estoque: ${db.get(`${adb}.conta`).length}`)
           .setThumbnail(client.user.displayAvatarURL())
           .setColor("076FFD")
           msg.edit({ embeds: [embed] })
           msg.channel.send("<:config:1115837571918995576>・Atualizado!")
                }
              })
            }
          }