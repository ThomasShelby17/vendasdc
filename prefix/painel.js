const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "painel", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<:nao:1061554313253629972>・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row3 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('nomeconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Nome')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('corconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel(' Cor ')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('avatarconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Avatar')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cargoconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Cargo')
            .setStyle('SECONDARY'),
        );
        const row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokenconfig')
            .setEmoji('<:mp:1136044531985432596>')
            .setLabel('Acess Token Mercado Pago')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('prefixconfig')
            .setEmoji('<:commands:1068828039003254804>')
            .setLabel('Prefixo dos comandos')
            .setStyle('PRIMARY'),
        );
        const row4 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('statusconfig')
            .setEmoji('<:custom:1068828663233126410>')
            .setLabel('Status do bot')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('imagemconfig')
            .setEmoji('<:image:1068825092957671454> ')
            .setLabel('Banner das embeds')
            .setStyle('SECONDARY'),
        );
        const row5 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('categoriaconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Categoria')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logsconfig')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Logs')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logs2config')
            .setEmoji('<:mysql:1109636930599125012>')
            .setLabel('Logs Staff')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
          .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
          .setColor("00000b")], components: [row1, row4, row3, row5]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "nomeconfig") {
             interaction.deferUpdate();
             message.channel.send("❓・Qual o novo nome?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", title => {
                 title.delete()
                 client.user.setUsername(title.content);
                 const newt = title.content
                 config.set(`title`, newt)
                 msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
                          .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                   .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           if (interaction.customId === "corconfig") {
             interaction.deferUpdate();
             message.channel.send("❓・Qual a nova cor em hex?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", color => {
                 color.delete()
                 const newt = color.content
                 config.set(`color`, newt)
                 msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                   .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           if (interaction.customId === "avatarconfig") {
             interaction.deferUpdate();
             message.channel.send("❓・Qual o novo avatar do bot?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", thumbnail => {
                 thumbnail.delete()
                 thumbnail.attachments.forEach(attachment => {
                 const newt = attachment.proxyURL;
                 client.user.setAvatar(newt);
                 config.set(`thumbnail`, newt)});
                 msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                   .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           if (interaction.customId === "cargoconfig") {
             interaction.deferUpdate();
             message.channel.send("❓・Qual o novo cargo em id?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", role => {
                 role.delete()
                 const newt = role.content
                 config.set(`role`, newt)
                 msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                   .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "categoriaconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual a nova de categoria dos carrinhos em id?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", category => {
                category.delete()
                const newt = category.content
                config.set(`category`, newt)
                msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                const embednew = new Discord.MessageEmbed()
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                  .setTitle(`${config.get(`title`)}・Configuração do bot`)
                  .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                  .setColor("00000b")
                embed.edit({ embeds: [embednew] })
                })
              })
            }
           if (interaction.customId === "logsconfig") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual o novo canal de logs de vendas em id?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", logs => {
                logs.delete()
                const newt = logs.content
                config.set(`logs`, newt)
                msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                const embednew = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                  .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                  .setColor("00000b")
                embed.edit({ embeds: [embednew] })
                })
              })
            }
                      
          if (interaction.customId === "logs2config") {
            interaction.deferUpdate();
            message.channel.send("❓・Qual o novo canal de logs de vendas staff em id?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", logs_staff => {
                logs_staff.delete()
                const newt = logs_staff.content
                config.set(`logs_staff`, newt)
                msg.edit("<:mysql:1109636930599125012>・Alterado!")
                            
                const embednew = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
                  .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                  .setColor("00000b")
                embed.edit({ embeds: [embednew] })
                })
              })
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
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
          .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
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
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
          .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
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
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
          .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
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
                   .setTitle(`${config.get(`title`)}・Configuração do bot`)
        .addField(`<:owner:1109637023825928273> **・Dono:**`, `<@${config.get(`owner`)}> (\`${config.get(`owner`)}\`)`)
        .addField(`<:config:1115837571918995576> **・Aplicação:**`, `**${config.get(`title`)}**`)
        .addField(`<:relogio:1115838051856437390> **・Tempo do bot:**`, `<t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)`)
          .setDescription(`
> <a:fixo:1115828240603426857>・**Nome: ** ${config.get(`title`)}
> <a:fixo:1115828240603426857>・** Cor: ** ${"00000b"}
> <a:fixo:1115828240603426857>・**Avatar: ** [link](${config.get(`thumbnail`)})
> <a:fixo:1115828240603426857>・**Cargo: ** <@&${config.get(`role`)}>
> <a:fixo:1115828240603426857>・**Acess Token: ** ||${config.get(`access_token`)}||
> <a:fixo:1115828240603426857>・**Prefixo dos comandos: ** ${config.get(`prefix`)}\`comando\`
> <a:fixo:1115828240603426857>・** Status do bot: ** ${config.get(`status`)}
> <a:fixo:1115828240603426857>・**Banner: ** [link](${config.get(`imagem`)})
> <a:fixo:1115828240603426857>・**Categoria:** <#${config.get(`category`)}>
> <a:fixo:1115828240603426857>・**Logs:** <#${config.get(`logs`)}>
> <a:fixo:1115828240603426857>・**Logs staff:** <#${config.get(`logs_staff`)}>`)
                   .setColor("00000b")
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
             
           })
         }
       };