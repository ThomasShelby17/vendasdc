const Discord = require("discord.js");
const mercadopago = require("mercadopago")
const axios = require("axios")
const moment = require("moment")
const SlashCommandBuilder = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Discord.Client({ intents: 32767 });
const { Client } = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbs = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const dbS = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const dbc = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const dbP = new JsonDatabase({ databasePath:"./databases/myJsonPay.json" });
const dbV = new JsonDatabase({ databasePath:"./databases/myJsonAvaliar.json" });
const dbT = new JsonDatabase({ databasePath:"./databases/myJsonTermos.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const persos = new JsonDatabase({ databasePath:"./databases/Personalizar.json" });
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const dbL = new JsonDatabase({ databasePath:"./databases/myJsonLigados.json" });
const nv = new JsonDatabase({ databasePath:"./databases/myJsonS.json" });
const id = new JsonDatabase({ databasePath:"./databases/myJsonCard.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const tempo = new JsonDatabase({ databasePath:"./databases/myJsonTempo.json" });
const metodo = new JsonDatabase({ databasePath:"./databases/myJsonMetodo.json" });
const perso = new JsonDatabase({ databasePath:"./databases/myJsonPerso.json" });
const blacklist = new JsonDatabase({ databasePath:"./databases/Blacklist.json" });
const { Intents, Collection } = require('discord.js');
const ms = require(`ms`);
const fs = require('fs');
const discordModals = require('discord-modals');

const { WebhookClient } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');

client.interactions = new Discord.Collection();
client.register_arr = []
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});


client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const command = client.interactions.get(interaction.commandName);
    if (!command) return interaction.reply({
      content: "Algo deu errado・Talvez o comando não esteja registrado?",
      ephemeral: true
    });

    command.run(client, interaction);
  }
});

const register = require('./utils/slashsync');
client.on('ready', async () => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });


  console.log(`[ /・Slash Command ] - ✅ Carregado todos os comandos de Slash!`);
});


client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.get(`prefix`).toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    const args = message.content
        .trim().slice(config.get(`prefix`).length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./prefix/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) { ; }
});

moment.locale("pt-br");
client.login(config.get(`token`));


client.on('ready', () => {
    console.clear() 
	console.log(`🤍・Bot ligado com sucesso`);
    client.user.setActivity(`${config.get(`status`)}`, { type: "STREAMING", url: "https://twitch.tv/discord" });
});



process.on('unhandledRejection', (reason, p) => {
    console.log('❌ ・Algum erro detectado')
     console.log(reason, p)
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('❌ ・Vários erros encontrados')
     console.log(type, promise, reason)
  });   
  process.on('uncaughtExceptionMonito', (err, origin) => {
    console.log('❌ ・Sistema bloqueado')
     console.log(err, origin)
  });
  process.on('uncaughtException', (err, origin) => {
    console.log('❌ ・Erro encontrado')
     console.log(err, origin)
  });

client.on("ready", () => {

     
let apl = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1136838940335296653/Fkr2_MkZSt06e7yc_pD8OOJF8ao7ATUnfZ6sb5OOw_fPu6Gg0-31DxWJ_Hrsrj2TtFFz" });
webhook.send(
  { embeds: [
  new Discord.MessageEmbed()
    .setColor("#ff7f27")
    .setTitle(`Aplicação Ligada`)
    .setAuthor(`${config.get(`title`)} - (${apl})`, `${client.user.displayAvatarURL()}`)
    .setDescription(`
> <:discord:1061754837387190423> **・Nome/id:**
> ${config.get(`title`)} (\`${client.user.id}\`)
> 
> <:tempo:1062561982995239033> **・Tempo do bot:**
> <t:${config.get(`tempo`)}:f> (<t:${config.get(`tempo`)}:R>)
> 
> **<:mysql:1109636930599125012>・Link da Aplicação:**
> ||https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot||
> 
> <:terminal:1079932297886846997>**・Ultimas Logs:**
> 
\`\`\` 
[ /・Slash Command ] - ✅ Carregado todos os comandos de Slash!\n🤍・Bot Ligado com sucesso\`\`\``)
    .setThumbnail(client.user.displayAvatarURL())
]})

});

function verificarArquivos() {
    const diretorio = "./";
    const arquivos = fs.readdirSync(diretorio);
    for(let arquivo of arquivos) {
        if(arquivo.endsWith(".txt")) {
            fs.unlinkSync(diretorio + arquivo);
        }
    }

}
setInterval(verificarArquivos, 14400000);

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    const eprod = db.get(interaction.customId);
      if (!eprod) return;
      const severi = interaction.customId;
        if (eprod) {
          const quantidade = db.get(`${severi}.conta`).length;
          const row = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId(interaction.customId)
               .setLabel(`${persos.get(`botao`)}`)
               .setEmoji(`<:Carrinho_WJ:1141013966332645377>`)
               .setStyle(perso.get(`perso`)),
        );
    
let descricao = `${persos.get(`descricao`)}`;
descricao = descricao.replace("#{desc}", `${db.get(`${interaction.customId}.desc`)}`);
descricao = descricao.replace("#{nome}", `${db.get(`${interaction.customId}.nome`)}`);
descricao = descricao.replace("#{preco}", `${db.get(`${interaction.customId}.preco`)}`);
descricao = descricao.replace("#{estoque}", `${db.get(`${interaction.customId}.conta`).length}`);

let titulo = `${persos.get(`titulo`)}`;
titulo = titulo.replace("#{nome}", `${config.get(`title`)}`);
           
        const embed = new Discord.MessageEmbed()
          
          .setDescription(descricao)
          .setFooter(`${persos.get(`rodape`)}`)
          .setColor(db.get(`${interaction.customId}.color`))
          .setImage(`${db.get(`${interaction.customId}.imagem`)}`)
          .setThumbnail(client.user.displayAvatarURL())
        interaction.message.edit({ embeds: [embed], components: [row] })
        
          if (quantidade < 1) {
          const embedsemstock = new Discord.MessageEmbed()
            .setDescription(`<a:sininho:1141794970857111644>・Este produto está sem estoque, aguarde um reabastecimento!`)
            .setColor("RED")
            
        
            if (quantidade < 1) {
              const embedslogsss = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)}・Quantidade esgotada`)
              .setColor("RED")
              .setDescription(`**<a:sininho:1141794970857111644>・O estoque do produto \`\`${interaction.customId}\`\` Acabou e tem gente querendo comprar!\n\nProduto: \`\`${eprod.nome}\`\`**`)
              .setFooter({ text: `${config.get(`title`)} - Todos os direitos reservados` })
              client.channels.cache.get(config.get(`logs_staff`)).send({ embeds: [embedslogsss], content: `||<@&${config.get(`owner`)}>||` })
            }
           
         
         interaction.reply({ embeds: [embedsemstock], components: [
         
          new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setLabel('notificações ativadas')
                .setEmoji('<a:sininho:1141794970857111644>')
                .setStyle("SECONDARY")
                .setDisabled(true)
                .setCustomId('notificados'),
           )




         ], ephemeral: true })
         

          return;

        }
        
   
        //////////
        
      
            
        interaction.deferUpdate()
   
       if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) {
          return interaction.followUp({
              embeds: [
                  new Discord.MessageEmbed()
                      .setColor("RED")
                      .setDescription(`**<:recusou:1140942612484853821>・Você já tem um produto no carrinho!**`)
              ],
              ephemeral: true
          })
      }
            
        interaction.guild.channels.create(`🛒・carrinho-${interaction.user.username}`, {
          type: "GUILD_TEXT",
          parent: config.get(`category`),
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"]
            },
            {
             id: interaction.user.id,
             allow: ["VIEW_CHANNEL"],
             deny: ["SEND_MESSAGES"]
           }
         ]
       }).then(c => {
         
          const irparacarrinho = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(
              `<a:planet:1140941075196944454>・Seu carrinho foi criado em ( ${c} )`
            );

          const botaolink = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setStyle("LINK")
              .setLabel("🛒 • Atalho para Carrinho")
              .setURL(`https://discord.com/channels/${interaction.guild.id}/${c.id}`)
          );
          interaction.followUp({
            embeds: [irparacarrinho],
            components: [botaolink],
            ephemeral: true,
          });
          
           let quantidade1 = 1;
           let precoalt = eprod.preco;
           var data_id = Math.floor(Math.random() * 99999999999999);
           db3.set(`${data_id}.id`, `${data_id}`)
           db3.set(`${data_id}.status`, `Pendente (1)`)
           db3.set(`${data_id}.userid`, `${interaction.user.id}`)
           db3.set(`${data_id}.dataid`, `${moment().format('LLLL')}`)
           db3.set(`${data_id}.nomeid`, `${eprod.nome}`)
           db3.set(`${data_id}.qtdid`, `${quantidade1}`)
           db3.set(`${data_id}.precoid`, `${precoalt}`)
           db3.set(`${data_id}.entrid`, `Andamento`)
           const timer2 = setTimeout(function () {
             if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
             db3.delete(`${data_id}`)
           }, 1200000)
           
           const row = new Discord.MessageActionRow()

           .addComponents(
            new Discord.MessageButton()
            .setCustomId('addboton')
            .setEmoji('<:mais:1136838152640806963>')
            .setStyle('SECONDARY'),
           )
           .addComponents(
            new Discord.MessageButton()
              .setCustomId('asd')
              .setLabel('✏️')        
              .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
               .setCustomId('removeboton')
               .setEmoji('<:menos:1136838130620694528>')
               .setStyle('SECONDARY'),
             )
               .addComponents(
                new Discord.MessageButton()
                  .setCustomId('cancelarbuy')
                  .setLabel('')
                  .setEmoji('<:recusou:1140942612484853821>')
                  .setStyle('DANGER'),
           );

           
          const embedsdf = new Discord.MessageEmbed()
          .setTitle(`**${config.get(`title`)}・Termos de compra**`)
          .setDescription(`**${config.get(`termos`)}**`)
          .setColor(db.get(`${interaction.customId}.color`))
          

           const embedsstermos = new Discord.MessageEmbed()
             .setColor(db.get(`${interaction.customId}.color`))
             .setDescription(`<a:planet:1140941075196944454>・Olá <@${interaction.user.id}>, este é seu carrinho, fique á vontade para adicionar mais produtos ou fazer as modificações que achar necessário.\n\n<:nuvem:1136836890809614386>・Você pode abaixar os dados dessa compra apertando no botão abaixo\n\n**<a:sim:1140943382798159913>・Continuar:** Quando estiver tudo pronto aperte o botão abaixo, apertando ele você estará concordando com todos os termos no canal: <#1109636972261150730>, e estará continuando com sua compra!`)
             .setFooter({ text: `${config.get(`title`)} - Todos os direitos reservados.` })
             const row3 = new Discord.MessageActionRow()

             

           .addComponents(
            new Discord.MessageButton()
            .setCustomId('comprarboton')
            .setLabel('Aceitar e Continuar')
            .setEmoji("<a:sim:1140943382798159913>")
            .setStyle('SUCCESS'),

           )
           .addComponents(
           new Discord.MessageButton()
           .setCustomId('cancelarbuy')
           .setLabel('Discordar e Fechar')
           .setEmoji(`<:recusou:1140942612484853821>`)
           .setStyle("DANGER")
           )
            
            .addComponents(
            new Discord.MessageButton()
            .setLabel('Dados da Compra')
            .setEmoji("<:nuvem:1136836890809614386>")
            .setStyle("SECONDARY")
            .setCustomId(`email`)
            );

            
                                                
           const embedss = new Discord.MessageEmbed()
                          .setDescription(`<a:planet:1140941075196944454>  **・Produto:** \`${eprod.nome}\`\n<:Caixa:1141013432510992444> **・Quantidade:** \`${quantidade1}\`\n<:Carteira:1141013764154597417> **・Preço** \`R$${precoalt}\`\n<:Carrinho_WJ:1141013966332645377> **・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
             .setColor(db.get(`${interaction.customId}.color`))
  c.send({ embeds: [embedsstermos], content: `||<@${interaction.user.id}>||`, components: [row3], fetchReply: true }).then(msg => {
             const filter = i => i.user.id === interaction.user.id;
             const collector = msg.createMessageComponentCollector({ filter });
           
             collector.on("collect", intera => {
               intera.deferUpdate()
               if (intera.customId === 'cancelarbuy') {
                   
                   
const embedentrega = new Discord.MessageEmbed()
                                               .setDescription(`\`\`\`Compra Cancelada: Seu pagamento foi cancelado, fique ciente que todos **ADM** podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                     .setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                   const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                        
                 clearInterval(timer2);
                 db3.delete(`${data_id}`)
                 if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
               }
                        
     
                                     if (intera.customId === 'email') {
                                        
    const dd = `dados-${data_id}.txt`;
    const dadosUTF = `A Provedora ( ${config.get(`title`)} INC 2023 ) informa os dados gerados com UTF-8:\n\nInformações do Cliente:\n ${interaction.user.username} (${interaction.user.if}) \n\nInformações do Produto:\nNome: ${eprod.nome}\nValor: ${precoalt}\nQuantidade: ${quantidade1}\n\nInformações Gerais:\nServidor: ${interaction.guild.id}\nID Fornecido pelo Mercado Pago: ${data_id}`

fs.writeFile(dd, dadosUTF, (err) => {
    if (err) throw err;
    
    const attachment = new Discord.MessageAttachment(dd);
                                        
    const content = new Discord.MessageEmbed()
    .setTitle(`Backup De Dados UTF-8`)
    .setColor(`GREEN`)
    .setDescription(`<:nuvem:1140944169171427458> **・Dados Gerados Caso você precise se caso tiver algum problema com a compra do seu produto e precisar de um reembolso.**`)
  interaction.user.send(`<a:loadingJEFF:1141480627032567919>・<@${interaction.user.id}> Gerando seus dados UTF-8...`)
  const timer3 = setTimeout(function () {
  interaction.user.send({ embeds: [content], files: [attachment] });
  }, 8000)
}); 
 
 
                                                       }
                 if (intera.customId === "todoss") {
                 if (quantidade <= quantidade1) {
                
                   
                   const embedss2 = new Discord.MessageEmbed()
                     .setFooter(`Id da compra: ${data_id}`)
                     .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt} Reais\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                     .setThumbnail(client.user.displayAvatarURL())
                                  
                   msg.edit({ embeds: [embedss2] })
                 } else {
                    
            const rowa = new Discord.MessageActionRow()
                        .addComponents(
               new Discord.MessageButton()
                 .setCustomId('addboton')
                 .setLabel(' + ')
                 .setStyle('SECONDARY'),
           )
                      .addComponents(
               new Discord.MessageButton()
                 .setCustomId('todoss')
                 .setEmoji('<:docs:1061068251817332787>')
                 .setStyle('SUCCESS'),
           ) 
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('removeboton')
                 .setLabel(' - ')
                 .setStyle('SECONDARY'),
           )
           .addComponents(
               new Discord.MessageButton()
                 .setCustomId('entt')
                 .setEmoji('<:delete:1109637048190636032>')
                 .setStyle('DANGER'),
           );
           
           const row = new Discord.MessageActionRow()
    
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('comprarboton')
                 .setLabel(' Confirmar ')
                 .setEmoji('<a:sim:1140943382798159913>')
                 .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('cancelarbuy')
                 .setLabel(' Cancelar ')
                 .setEmoji('<:recusou:1140942612484853821>')
                 .setStyle('DANGER'),
           );
           
            rowa.components[0].setDisabled(true)
            rowa.components[2].setDisabled(true)
            rowa.components[1].setDisabled(true)
            
            msg.edit({ components: [row, rowa] })
            
            
let quantidade1 = 1
quantidade1 - 1
quantidade1 = quantidade
let precoalt = Number(eprod.preco)


                
                    
                    
                    if (quantidade === quantidade) {
   precoalt = Number(precoalt) * Number(quantidade);

}
                    
                   
                   const embedss = new Discord.MessageEmbed()
                     .setFooter(`ID da compra: ${data_id}`)
                     .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\` Reais`)
                     .setColor(db.get(`${interaction.customId}.color`))
                     .setThumbnail(client.user.displayAvatarURL())
                                  
                   msg.edit({ embeds: [embedss] })
                 }
               }
               
               
               if (intera.customId === "addboton") {
                 if (quantidade1++ >= quantidade) {
                   quantidade1--;
                   const embedss2 = new Discord.MessageEmbed()
                                .setDescription(`<a:planet:1140941075196944454> **・Produto:** \`${eprod.nome}\`\n<:caixa:1115828666048450631**・Quantidade:** \`${quantidade1}\`\n<:carteira:1115827529559842876**・Preço** \`R$${precoalt}\`\n<:carrinho:1116836145897164820**・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                    
                                  
                   msg.edit({ embeds: [embedss2] })
                 } else {
                     
 
    precoalt = Number(precoalt) + Number(eprod.preco);
    
    tttt = precoalt.toFixed(2); 
    precoalt = tttt
    
                   const embedss = new Discord.MessageEmbed()
                     .setDescription(`<a:planeta:1115828269774819348 **・Produto:** \`${eprod.nome}\`\n\n   <:caixa:1115828666048450631**・Quantidade:** \`${quantidade1}\`\n\n<:carteira:1115827529559842876**・Preço** \`R$${precoalt}\`\n\n<:carrinho:1116836145897164820**・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                    
                                  
                   msg.edit({ embeds: [embedss] })
                 }
               }
                 if (intera.customId === "removeboton") {
                     
                   if (quantidade1 <= 1) {
                     } else {
                         
                       precoalt = precoalt - eprod.preco;
                       quantidade1--;
                        precoalt = Number(precoalt);
                        tttt = precoalt.toFixed(2); 
                         precoalt = tttt
    
                       const embedss = new Discord.MessageEmbed()
.setDescription(`<a:planeta:1115828269774819348 **・Produto:**\`${eprod.nome}\`\n\n<:caixa:1115828666048450631**・Quantidade:** \`${quantidade1}\`\n\n<:carteira:1115827529559842876**・Preço** \`R$${precoalt}\`\n\n<:carrinho:1116836145897164820**・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                         .setColor(db.get(`${interaction.customId}.color`))
                        

                       msg.edit({ embeds: [embedss] })
                     }
                     
                   }
                 if (intera.customId === "entt") {
                   if (quantidade <= quantidade1) {
                     } else {
                         
                                     const rowa = new Discord.MessageActionRow()
                        .addComponents(
               new Discord.MessageButton()
                 .setCustomId('addboton')
                 .setLabel(' + ')
                 .setStyle('SECONDARY'),
           )
                      .addComponents(
               new Discord.MessageButton()
                 .setCustomId('todoss')
                 .setEmoji('<:docs:1061068251817332787>')
                 .setStyle('SUCCESS'),
           ) 
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('removeboton')
                 .setLabel(' - ')
                 .setStyle('SECONDARY'),
           )
           .addComponents(
               new Discord.MessageButton()
                 .setCustomId('entt')
                 .setEmoji('<:delete:1109637048190636032>')
                 .setStyle('DANGER'),
           );
           
           const row = new Discord.MessageActionRow()
    
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('comprarboton')
                 .setLabel(' Confirmar ')
                 .setEmoji('<a:sim:1140943382798159913>')
                 .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('cancelarbuy')
                 .setLabel(' Cancelar ')
                 .setEmoji('<:recusou:1140942612484853821>')
                 .setStyle('DANGER'),
           );
           
            rowa.components[0].setDisabled(false)
            rowa.components[2].setDisabled(false)
            rowa.components[1].setDisabled(false)
            
            msg.edit({ components: [row, rowa] })
            
                       precoalt = eprod.preco
                       quantidade1 = 1
                       const embedss = new Discord.MessageEmbed()
                       .setFooter(`Id da compra: ${data_id}`)
                       .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\` Reais`)  
                         .setColor(db.get(`${interaction.customId}.color`))
                         .setThumbnail(client.user.displayAvatarURL())

                       msg.edit({ embeds: [embedss] })
                     }
                   }

                   if (intera.customId === "comprarboton") {
                       
                       const aberto = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`<a:sim:1140943382798159913> **・O membro ${interaction.user.username}** (${interaction.user.id}) **abriu o carrinho do produto:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [aberto] })
                        
                       const embedentrega = new Discord.MessageEmbed()
                       .setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                       .setColor('YELLOW')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                     msg.channel.bulkDelete(50);
                     clearInterval(timer2);
                     const timer3 = setTimeout(function () {
                      if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                       db3.delete(`${data_id}`)
                      }, 1200000)
                     const row = new Discord.MessageActionRow()
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('continuarboton')
                           .setLabel('Continuar')
                           .setEmoji('<a:sim:1140943382798159913>')
                           .setStyle('SUCCESS'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('addcboton')
                           .setLabel('Cupom de Desconto')
                           .setDisabled(`${db.get(`${interaction.customId}.cup`)}`)
                           .setEmoji('<:cupom:1141021467857928334>')
                           .setStyle('PRIMARY'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarboton')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                                        
                    dbc.set(`usado`, `Não utilizado`)
                    
                    dbP.set(`pay.emoji`, `<:pix:1115828248446771313>`)
                    dbP.set(`pay.nome`, `Mercado Pago`)
                    
                     const embedss = new Discord.MessageEmbed()
                     .setDescription(`**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Dinheiro:1141014757978148894>・Valor Unitário:** \`R$${db.get(`${interaction.customId}.preco`).toLocaleString()}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Carteira:1141013764154597417>・Valor Total:** \`R$${precoalt}\`\n**<:cupom:1141021467857928334>・Cupom:** \`Nenhum\``)                                     
                     .setColor(db.get(`${interaction.customId}.color`))
                       .setThumbnail(client.user.displayAvatarURL())
                     c.send({ embeds: [embedss], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", intera2 => {
                         intera2.deferUpdate()
                         if (intera2.customId === 'addcboton') {
                           intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: true });
                            msg.channel.send(`<:cupom:1141021467857928334>・Digite o seu cupom:`).then(mensagem => {
                             const filter = m => m.author.id === interaction.user.id;
                             const collector = mensagem.channel.createMessageCollector({ filter, max: 1 });
                             collector.on("collect", cupom => {
                               if(`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit(`<:recusou:1140942612484853821>・Esse cupom não existe.`)
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 return;
                               }
                                 
                               var minalt = dbc.get(`${cupom}.minimo`);
                               var dscalt = dbc.get(`${cupom}.desconto`);
                               var qtdalt = dbc.get(`${cupom}.quantidade`);
                                 
                               precoalt = Number(precoalt) + Number(`1`);
                               minalt = Number(minalt) + Number(`1`);
                               if(precoalt < minalt) {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`<:recusou:1140942612484853821>・Você não atingiu o mínimo!`)
                                 return;
                               } else {
                              
                               precoalt = Number(precoalt) - Number(`1`);
                               minalt = Number(minalt) - Number(`1`);
                                   
                               if(`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`<:recusou:1140942612484853821>・Esse cupom saiu de estoque!`)
                                 return;
                               }
                                              
                               if(`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 dbc.set(`usado`, `Utilizado`)
                                 mensagem.edit(`<a:sim:1140943382798159913>・Cupom adicionado`)
                                  intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                   var precinho = precoalt;
                                   var descontinho = "0."+dscalt;
                                   var cupomfinal = precinho * descontinho;
                                   precoalt = precinho.toFixed(2) - cupomfinal;
                                   qtdalt = qtdalt - 1;
                                   row.components[1].setDisabled(true)
                                   const embedss2 = new Discord.MessageEmbed()
                                   .setDescription(`**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Dinheiro:1141014757978148894>・Valor Unitário:** \`R$${db.get(`${interaction.customId}.preco`).toLocaleString()}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Carteira:1141013764154597417>・Valor Total:** \`R$${precoalt}\`\n**<:cupom:1141021467857928334>・Cupom:** \`${dbc.get(`${cupom}.idcupom`)}\``)                                     
                                   .setColor(db.get(`${interaction.customId}.color`))
                                     .setThumbnail(client.user.displayAvatarURL())
                                   msg.edit({ embeds: [embedss2], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true })
                                   dbc.set(`${cupom}.quantidade`, `${qtdalt}`)
                                 }
                               }
                              }) 
                            })
                          }
                                    
                           if (intera2.customId === 'cancelarboton') {
                                             
                             clearInterval(timer3);
                             db3.delete(`${data_id}`)
                             if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                           }
                 
                           if (intera2.customId === "continuarboton") {
                             msg.channel.bulkDelete(50);
                             
                             msg.channel.send(`<a:load:1141016935576895658> **・Gerando Pagamento com dados UTF-8...**`)
                             
                             const time6 = setTimeout(function () {
                             
                             msg.channel.bulkDelete(50);
                             
                             clearInterval(timer3);
                             const venda = setTimeout(function () {
                              if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                               db3.delete(`${data_id}`)
                              }, 1200000)
                             mercadopago.configurations.setAccessToken(config.get(`access_token`));
                             var payment_data = {
                               transaction_amount: Number(precoalt),
                               description: `Pagamento (${interaction.guild.name})・${interaction.user.username}`,
                               payment_method_id: 'pix',
                                payer: {
                                  email: `${data_id}@gmail.com`,
                                  first_name: `${config.get(`title`)}`,
                                  last_name: 'Company',
                                   identification: {
                                     type: 'CPF',
                                     number: '16886350765'
                                   },
                                   address: {
                                     zip_code: '25585360',
                                     street_name: 'Parque Araruama',
                                     street_number: '20',
                                     neighborhood: 'R. Orquídeas',
                                     city: 'São João de Meriti',
                                     federal_unit: 'RJ'
                                   }
                                 }
                               };

                               mercadopago.payment.create(payment_data).then(function (data) {
                                 db3.set(`${data_id}.status`, `Pendente (2)`)
                                 const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                 const attachment = new Discord.MessageAttachment(buffer, "payment.png");
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('aa')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Pagar com Pix")
                                       .setStyle('SECONDARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('bb')
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Outras Formas de Pagamento")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('cancelarbuy')
                                       .setEmoji("<:recusou:1140942612484853821>")
                                       .setLabel("")
                                       .setStyle('DANGER'),
                                 );

                const tempin = tempo.get(`minutos`)
                if (tempin === null) tempin = 10;
const dateStr = Date.now() + ms(`${tempo.get(`minutos`)}m`)
                            const date = new Date(dateStr);
                            const unixTimestamp = Math.floor(date.getTime() / 1000);

                                const embed = new Discord.MessageEmbed()
                                .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\``)                               
                                  .setColor(db.get(`${interaction.customId}.color`))
                                  .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                msg.channel.send({ embeds: [embed], content: `<@${interaction.user.id}>`, components: [row] }).then(msg => {

                                const collector = msg.channel.createMessageComponentCollector();
                                const lopp = setInterval(function () {
                                  const time2 = setTimeout(function () {
                                    clearInterval(lopp);
                                  }, 1800000)
                                 axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                  headers: {
                                    'Authorization': `Bearer ${config.get(`access_token`)}`
                                  }
                                }).then(async (doc) => {
                            
                               if (doc.data.collection.status === "approved") {
                                   db3.set(`${data_id}.status`, `Processando`)
                               }
                                     
                               if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                   
                                   msg.channel.bulkDelete(99);
                                   
                                  const embederror = new Discord.MessageEmbed()
                                                                .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                                .setDescription(`Infelizmente alguem comprou esse produto antes de você, o reembolso foi feito pelo bot automaticamente.`)
                                                                .setColor("RED")
                                                                const embederror1 = new Discord.MessageEmbed()
                                                                .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                                .setDescription(`${interaction.user.username} Teve a compra reembolsada por comprar um produto que estava sem estoque (alguem comprou antes o produto)`)
                                                                .setColor("RED")
                                                            
                                                            if (db.get(`${severi}.conta`) < quantidade1) {
                                                                mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      var refund = { payment_id: `${data.body.id}` };
                                                       mercadopago.refund.create(refund).then(result => {
                                                        db3.set(`${data_id}.status`, `Reembolsado`)
                                                      }).catch(function (error) { interaction.user.send({ content: `<a:pretobranco:1115827538263023757>・Houve algum erro durante a transação ou esse pagamento foi pago por comandos , tente novamente!` }) });
                                                                clearTimeout(time2)
                                 clearInterval(lopp);
                                 clearInterval(venda);
                                 const vendadel = setTimeout(function () {
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 10000)
                                                                interaction.user.send({ embeds: [embederror] })
                                                                client.channels.cache.get(`${config.get(`logs_staff`)}`).send({ embeds: [embederror1] })
                                                }
                                    else {
                                      
                                      msg.channel.bulkDelete(50);
                                                        
                                 clearTimeout(time2)
                                 clearInterval(lopp);
                                 clearInterval(venda);
                                  const vendadel = setTimeout(function () {
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 1200000)
                                   const a = db.get(`${severi}.conta`);
                                   const canalif1 = client.channels.cache.get(config.canallogs);
                                     db2.add("pedidostotal", 1)
                                     db2.add("gastostotal", Number(precoalt))
                                     db2.add(`${moment().format('L')}.pedidos`, 1)
                                     db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.pedidosaprovados`, 1)

                                     if (a < quantidade1) {
                                       db3.set(`${data_id}.status`, `Reembolsado`)
                                       msg.channel.send(`<a:sim:1140943382798159913>・Pagamento reembolsado`)
                                       msg.channel.send(`<a:sim:1140943382798159913>・ID Da compra: ${data_id}`)
                                        mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                         var refund = { payment_id: `${data.body.id}` };
                                          mercadopago.refund.create(refund).then(result => {
                                           const message2new = new Discord.MessageEmbed()
                                             .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                             .setDescription(`Comprador: <@${data_id}>\nData da compra: ${moment().format('LLLL')}\nNome: ${eprod.nome}\nQuantidade: ${quantidade1}x\nPreço: ${precoalt}\nID da compra: \`\`\`${data_id}\`\`\``)
                                             .setColor(db.get(`${interaction.customId}.color`))
                                             .setThumbnail(client.user.displayAvatarURL())
                                           canalif1.send({ embeds: [message2new] })})
                                          } else {
                                           const removed = a.splice(0, Number(quantidade1));
                                            db.set(`${severi}.conta`, a);
                                            
const textFileName = `${data_id}.txt`;
const word = `${metodo.get(`${interaction.customId}.produto`)}`;

fs.writeFile(textFileName, word, (err) => {
    if (err) throw err;
    
    const embedentregasw = new Discord.MessageEmbed()
    .setTitle(`${config.get(`title`)}・Arquivo da Compra`)
    .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
    .setColor("GREEN")
    .setDescription(`**Aviso:** Se dentro do arquivo não tiver seu produto, ele foi entregue na embed abaixo (como produto normal)`)
    
    interaction.user.send({ embeds: [embedentregasw], files: [attachment] }) 
    
});
                                            
    const embedentrega = new Discord.MessageEmbed()
    .setDescription(`<:buzzcarrinho:1141747883155144725> | **Produto(s) Comprado(s):** ${eprod.nome}\n<:copia_e_cola:1141480046465384579>・**ID da compra:** ${data_id}\nSeu pagamento foi confirmado. Obrigado por confiar na equipe, fazemos o nosso trabalho focando na experiência em que você merece ter!.`)
    .setFooter(`Seu(s) Produto(s):`)
    .setColor(`d59a66`)
    .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                    
    const attachment = new Discord.MessageAttachment(textFileName);
                    
                    const sls = setTimeout(function () {
                    
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                                interaction.user.send("<:Caixa:1141013432510992444>**・Entrega do Produto:**")
                                   interaction.user.send(`${removed.join("\n")}`)}, 5000)
                        
                                              db3.set(`${data_id}.status`, `Concluido`)
                                              msg.channel.send(`<a:sim:1140943382798159913>・Pagamento aprovado!`)
                                               const membro = interaction.guild.members.cache.get(interaction.user.id)
                                               const role = interaction.guild.roles.cache.find(role => role.id === config.get(`role`))
                                               membro.roles.add(role)
                                               
                        dbV.set(`avaliacao`, `Nenhuma avaliação foi feita...`)
                        dbV.set(`mensagem`, `Nenhum Comentario`)
                                                   const rowavaliacao = new Discord.MessageActionRow()
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('1star')
                                                   .setEmoji('⭐')
                                                   .setLabel('1')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('2star')
                                                   .setEmoji('⭐')
                                                   .setLabel('2')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('3star')
                                                   .setEmoji('⭐')
                                                   .setLabel('3')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('4star')
                                                   .setEmoji('⭐')
                                                   .setLabel('4')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('5star')
                                                   .setEmoji('⭐')
                                                   .setLabel('5')
                                                   .setStyle('SECONDARY'),
                                               );
                                               
            const embedava = new Discord.MessageEmbed()
                                               .setTitle(`${config.get(`title`)}・Avaliação`)
                                               .setDescription("Avalie a sua compra apertando no botão abaixo.")
                                               .addField(`<:info:1141398209206439936>・Informações:`, `Escolha uma nota essa venda.`)
                                               .setFooter(`Você tem 45 segundos para avaliar...`)
                                               .setColor(db.get(`${interaction.customId}.color`))
            const timeava = setTimeout(function () {
            c.send({ embeds: [embedava], components: [rowavaliacao] })}, 1000)
            
                                            const reem = dbL.get(`reembolsoL`)
                                            
                                            if (reem === null) reem = false;
                                            
                                               const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('reembolso')
                                                     .setEmoji('<:MP:1141397777738387548>')
                                                     .setDisabled(`${dbL.get(`reembolsoL`)}`)
                                                     .setLabel('Reembolsar')
                                                     .setStyle('DANGER'),
                                               );
        
                                               const canalif = client.channels.cache.get(config.get(`logs_staff`))
                                               const message2 = await canalif.send({ embeds: [new Discord.MessageEmbed()
                                                 .setDescription(`**<:IDD:1141015458124922973>・Comprador:** ${interaction.user.tag} (${interaction.user.id})\n**<a:planet:1140941075196944454>・Produto(s) Comprado(s):** \`\`${eprod.nome}\`\`\n**<:Caixa:1141013432510992444>・Quantidade Comprada:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor Pago:** \`\`R$${precoalt}\`\`\n**📆・Data da compra:** ${moment().format('LLLL')}\n**<:mysql:1109636930599125012>・ID da compra:** \`\`${data_id}\`\`\n**<:mysql:1109636930599125012>・ID reembolso:** \`\`${data.body.id}\`\`\n**Cupom usado** ${dbc.get(`usado`)}\n**${dbP.get(`pay.emoji`)}・Forma de Pagamento:** ${dbP.get(`pay.nome`)}`)
                                                 .addField(`**Produto Entregue:** `, `\`\`\`${removed.join(" \n")}\`\`\``, true)
                                                 .setColor('GREEN')
                                                 
                         .setImage(config.get(`imagem`))
                                                 .setThumbnail(client.user.displayAvatarURL())], components: [row]})
                                               const interação = message2.createMessageComponentCollector({ componentType: "BUTTON", })
                                                interação.on("collect", async (interaction) => {
                                                 if (interaction.customId === "reembolso") {
                                                   const user = interaction.user.id
                                                   if (interaction.user.id !== `${perms.get(`${user}_id`)}`) return interaction.reply({ content: `<:recusou:1140942612484853821>・Você não está na lista de pessoas!`, ephemeral: true })
                                                   interaction.deferUpdate()
                                                     mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      var refund = { payment_id: `${data.body.id}` };
                                                       mercadopago.refund.create(refund).then(result => {
                                                        db3.set(`${data_id}.status`, `Reembolsado`)
                                                        message2.delete()
                                                        const message2new = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                          .setDescription(`**ID do comprador:** ${interaction.user.id}\n**Data da compra:** ${moment().format('LLLL')}\n**Produto:** ${eprod.nome}\n**Valor:** ${precoalt}\n**Quantidade:** \`${quantidade1}\`\n**Id da compra:** ${data_id}\n**${dbP.get(`pay.emoji`)}・Forma de Pagamento:** ${dbP.get(`pay.nome`)}`)                           
                                                        .setColor('YELLOW')
                                 
                                 .setImage(config.get(`imagem`))                         .setThumbnail(client.user.displayAvatarURL())
                                                        canalif.send({ embeds: [message2new] })
                                                      }).catch(function (error) { interaction.followUp({ content: `<a:pretobranco:1115827538263023757>・Houve algum erro durante a transação, tente novamente!`, ephemeral: true }) });
                                                    }
                                                  })

                         const time2 = setTimeout(function () {
                         const dateStr = Date.now() + ms(`1s`)
                         const date = new Date(dateStr);
                         const unixTimestamp = Math.floor(date.getTime() / 1000);
                         const embedaprovadolog = new Discord.MessageEmbed()
                         .setDescription(`**<:A_cracha:1141757107675344916>・Comprador: | ${interaction.user.tag} (${interaction.user.id})\n**<a:planeta:1141397827617050624>・Produto(s) Comprado(s): | \`\`${eprod.nome}\`\`\n**<:Caixa:1141013432510992444>・Quantidade Comprada:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor Pago: | \`\`R$${precoalt}\`\`\n**<a:data:1141757750569861221>・Data da compra: | <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)\n${dbV.get(`avaliacao`)}\n**<a:Estrela:1141399500385161337>・Avaliação: | ${dbV.get(`avaliacao`)}\n**${interaction.user.username}:** ${dbV.get(`mensagem`)}\n**<:cupom:1141021467857928334>・Cupom Usado: | ${dbc.get(`usado`)}\n${dbP.get(`pay.emoji`)}・Forma de Pagamento: |  ${dbP.get(`pay.nome`)}`)                        
                         .setColor(db.get(`${interaction.customId}.color`))
                            
                         .setImage(`${db.get(`${interaction.customId}.imagem`)}`) 
                         .setThumbnail(client.user.displayAvatarURL())
                                                  client.channels.cache.get(config.get(`logs`)).send({embeds: [embedaprovadolog]})}, 49900)
                                                 
                                                  db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)
                                                           
                                                    const row2 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel(`${persos.get(`botao`)}`)
                                                          .setEmoji(`<:Carrinho_WJ:1141013966332645377>`)
                                                          .setStyle(perso.get(`perso`)),
                                                    );
                                                    
let descricao = `${persos.get(`descricao`)}`;
descricao = descricao.replace("#{desc}", `${db.get(`${interaction.customId}.desc`)}`);
descricao = descricao.replace("#{nome}", `${db.get(`${interaction.customId}.nome`)}`);
descricao = descricao.replace("#{preco}", `${db.get(`${interaction.customId}.preco`)}`);
descricao = descricao.replace("#{estoque}", `${db.get(`${interaction.customId}.conta`).length}`);

let titulo = `${persos.get(`titulo`)}`;
titulo = titulo.replace("#{nome}", `${config.get(`title`)}`);
           
                                                                
                                                    const embed2 = new Discord.MessageEmbed()
                                                      
                                                      .setDescription(descricao)
                                                      .setColor(db.get(`${interaction.customId}.color`))
                                                      .setFooter(`${persos.get(`rodape`)}`)
                              
                         .setImage(`${db.get(`${interaction.customId}.imagem`)}`)
                         .setThumbnail(client.user.displayAvatarURL())
                                                    interaction.message.edit({ embeds: [embed2], components: [row2] })}}}})}, 10000)
                                                
                                                    collector.on("collect", interaction => {
                                                     if (interaction.customId === 'codigo') {
                                                      
                                 const embed = new Discord.MessageEmbed()
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planeta:1141397827617050624>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                    
                                    
                                    const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:PIX:1141760035161129081>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:QrCode:1141760284478930974>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),

                                       )
                                       .addComponents(
                                         new Discord.MessageButton()
                                           .setCustomId('bb')
                                           .setEmoji("<:MP:1141397777738387548>")
                                           .setLabel("Outras Formas de Pagamento")
                                           .setStyle('PRIMARY'),
                                 )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<a:No:1140942920933982218>')
                           .setStyle('DANGER'),
                     );
                                    row.components[0].setDisabled(true)
                                              
                                              
                                    msg.edit({ embeds: [embed], components: [row] })
                                    
                            const codigo = new Discord.MessageEmbed()
                            
                            .setColor(db.get(`${interaction.customId}.color`))
                            
                            .addField(`<:PIX:1141760035161129081> **・Pix copia e cola:**`, `${data.body.point_of_interaction.transaction_data.qr_code}`)
                            const row20 = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('codigocll')
                                                          .setEmoji('📱')
                                                          .setLabel('Copiar')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.reply({ embeds: [codigo], components: [row20] })
                                                                                        
                                                       }
                                  if (interaction.customId === 'mensagem') {
             interaction.channel.bulkDelete(2);
             interaction.deferUpdate();
             const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)}・Sistema de avaliação`)
                 .setColor("YELLOW")
                 .setDescription("<a:loadingJEFF:1141480627032567919>・Digite a sua mensagem avaliativa sobre a compra (ex: gostei, top, rapido):")
                 
                 interaction.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: true });
             interaction.channel.send({ embeds: [embed] }).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter});               collector.on("collect", yTRASHER => {
                 yTRASHER.delete()
                 const PAY = yTRASHER.content
                 dbV.set(`mensagem`, PAY)
                 collector.stop();
                 const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)}・Sistema de avaliação`)
                 .setColor("GREEN")
                 .setDescription(`<a:sim:1140943502839136347>・Obrigado pela mensagem avaliativa \`${dbV.get('mensagem')}\``)
                 msg.edit({ embeds: [embed] })
                 interaction.channel.send
                
                 interaction.channel.send({ content: `Utilize \`${config.get(`prefix`)}fechar\` para deletar o carrinho.` })
                 })
               })
                                      
                                  }
                                                                   if (interaction.customId === '1star') {
                                                        msg.channel.bulkDelete(20); 
                                                        dbV.set(`avaliacao`, `⭐ (1)`)
                                                        interaction.channel.send(`<a:sim:1140943502839136347> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '2star') {
                                                        msg.channel.bulkDelete(20);
                                            
                                                        dbV.set(`avaliacao`, `⭐⭐ (2)`)
                                                        interaction.channel.send(`<a:sim:1140943502839136347> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '3star') {
                                                        msg.channel.bulkDelete(20);
                                                
                dbV.set(`avaliacao`, `⭐⭐⭐ (3)`)
                                                        interaction.channel.send(`<a:sim:1140943502839136347> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '4star') {
                                                        msg.channel.bulkDelete(20);
                                                        (1);
                                            
                                                dbV.set(`avaliacao`, `⭐⭐⭐⭐ (4)`)
                                                        interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '5star') {
                                                        msg.channel.bulkDelete(20);
                                                
                                                dbV.set(`avaliacao`, `⭐⭐⭐⭐⭐ (5)`)
                                                interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                    //////////////////
                                                       if (interaction.customId === 'codigocll') {
                                                        interaction.reply({content: `${data.body.point_of_interaction.transaction_data.qr_code}`, ephemeral: true})
                                                       }
                                                       
                                                       
                                                       
                                                       
    if (interaction.customId === 'aa') {
     
     msg.channel.bulkDelete(40)
    
    
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:PIX:1141760035161129081>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:QrCode:1141760284478930974>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),
                                 )

                                 .addComponents(
                                   new Discord.MessageButton()
                                     .setCustomId('bb')
                                     .setEmoji("<a:sim:1140943502839136347>")
                                     .setLabel("Outras Formas de Pagamento")
                                     .setStyle('SECONDARY'),
                               )

                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<a:No:1140942920933982218>')
                           .setStyle('DANGER'),
                     );
     
     const embed = new Discord.MessageEmbed()
                                                         .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n**<a:planeta:1141397827617050624>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f>・(<t:${unixTimestamp}:R>)`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                    interaction.channel.send({ embeds: [embed], components: [row] })
                                                       }
                                                       
                                                       
  if (interaction.customId === 'bb') {
     
     msg.channel.bulkDelete(40)
    
mercadopago.configure({
    access_token: `${config.get(`access_token`)}`
});


let preference = {
    items: [
        {
            title:`cartão・${interaction.user.username} - ${eprod.nome}`,
            unit_price: Number(precoalt),
            quantity: 1
        }
    ]
};


mercadopago.preferences.create(preference)
    .then(function (response) {
        
        const payment_url = response.body.init_point;
        
        const privado = new Discord.MessageEmbed()
        .setTitle(`Pagamento Pendente`)
        .setColor(db.get(`${interaction.customId}.color`))
        .setDescription(`__Pagamento de cartão pendente__\n\n**Usuario:** ${interaction.user.username}\n**Valor:** ${precoalt} Reais\n**Produto:** ${eprod.nome}\n\n**Horario:** ${moment().format('LLLL')}\n\n**Link:** [Aperte aqui](${payment_url})\n\n__Verifique nos pagamentos pendentes do mercado pago para ver se o usuario pagou, utilize__ **${config.get(`prefix`)}pagar ${data_id}** __abaixo para setar a compra como pago (o sistema do bot não aprova automatico o pagamento por cartão gerado com checkout por link)__\n\n**Se ele não pagou, não confirme o pagamento**`)
        
        const privado1 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel('Pagamento Pendente')
                                                          .setEmoji("<a:pretobranco:1115827538263023757>")
                                                          .setStyle('SECONDARY')
                                                        .setDisabled(true),
                                                    );
                                            
        const canal = client.channels.cache.get(config.get(`logs_staff`))
        
        canal.send({ embeds: [privado], components: [privado1] })
        
                        
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setURL(`${payment_url}`)
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Realizar o Pagamento")
                                       .setStyle('LINK'),
                                   )

                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('veri')
                                       .setEmoji("<a:sim:1140943382798159913>")
                                       .setLabel("Paguei")
                                       .setStyle('SUCCESS'),
                                 )

                                 .addComponents(
                                  new Discord.MessageButton()
                                    .setCustomId('aa')
                                    .setEmoji("<:pix:1115828248446771313>")
                                    .setLabel("Pagar com PIX")
                                    .setStyle('SECONDARY'),
                                 )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
     
     const embed = new Discord.MessageEmbed()
                                                         .setDescription(`\`\`\`Pague com Outras Formas de Pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f>・(<t:${unixTimestamp}:R>)`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                    interaction.channel.send({ embeds: [embed], components: [row] })
                                    
                                    }).catch(function (error) {
    console.log(error);
});
                                                       }
                                                       
                                                       
                                                       
                                if (interaction.customId === "saldo") {
                                    
                                row.components[2].setDisabled(true)
                                                        msg.edit({ components: [row] })
                                
                                let saldo = dbS.get(`${interaction.user.id}.saldo`)
                                if (saldo === null) saldo = 0;
                                
                                if (precoalt > saldo) { interaction.reply(`<a:pretobranco:1115827538263023757>・Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`R$${saldo}\`, valor da compra: \`R$${precoalt}\``)
                                } else {
                                
let num1 = saldo;
let num2 = precoalt;
let result = num1 - num2;

                                dbS.set(`${interaction.user.id}.saldo`, result)
                                    
                                    db3.set(`${data_id}.status`, `Processando`)
                                                        interaction.reply(`<a:sim:1140943382798159913> **・Pagamento pago por saldo com sucesso!.** `)
                                                        
        dbP.set(`pay.emoji`, `<:Carteira:1141013764154597417>`)
        dbP.set(`pay.nome`, `Pago por Saldo`)
                                }
                      
                       }
                         if (interaction.customId === 'verify') {
                        
                         const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setStyle(`ALGO`)
                                       .setEmoji("<:MP:1141397777738387548>")
                                       .setLabel("Realizar o Pagamento")
                                       .setStyle('SECONDARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('verify')
                                       .setEmoji("<a:sim:1140943502839136347>")
                                       .setLabel("Validar Pagamento (adm)")
                                       .setStyle('SUCCESS'),
                                 )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                     
                        row.components[1].setDisabled(true)
                        row.components[0].setDisabled(true)
                        msg.edit({ components: [row] })
                                       
const dateStr = Date.now() + ms(`8s`)
                            const date = new Date(dateStr);
                            const unixTimestamp = Math.floor(date.getTime() / 1000);
                                                        interaction.reply({content: `<a:loading:1067015746812649563>・Verificando pagamento <t:${unixTimestamp}:R>`, ephemeral: true})
const ve = setTimeout(function () {
    
                          interaction.channel.send({content: `<:recusou:1140942612484853821>・Pagamento não encontrado.`})
           }, 8000)
                                                       }
                                                       
                                                    if (interaction.customId === 'saldo1') {
                                       
                                     if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `<a:pretobranco:1115827538263023757> **・Você **não** tem permissão para utilizar esse sistema.** `, ephemeral: true})
                                                           db3.set(`${data_id}.status`, `Processando`)
                                                           
        dbP.set(`pay.emoji`, `<:MP:1141397777738387548>`)
        dbP.set(`pay.nome`, `Pago por Cartão`)
                                                        interaction.reply({content: `<a:sim:1140943502839136347> **・Pagamento validado com sucesso (aguarde 5s).** `, ephemeral: true})
                                                       }
                                                       
                                                       
      if (interaction.customId === 'veri') {
       interaction.deferUpdate();
                                       
                                     if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `<a:sim:1140943502839136347> **・Chame um ADM para verificar seu pagamento por cartão (se você ainda não pagou, não chame um adm atoa).** `, ephemeral: true})
                
    
                                                        
    const embed = new Discord.MessageEmbed()
    .setTitle(`${config.get(`title`)}・Confirmar Validação`)
    .setColor(`RED`)
    .setDescription(`<a:load:1141016935576895658>・Você confirma que recebeu o pagamento da venda [ ${eprod.nome} - R$${precoalt} ](\`${data_id}\`) ?\nVocê pode ver se recebeu esse pagamento pela atividade do Mercado Pago\nSe o comprador ainda não pagou, não confirme a validação do Pagamento.`)
                                                        
                        const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('saldo1')
                                                     .setEmoji('<:mp:1136044531985432596>')
                                                     .setLabel('Validar Pagamento')
                                                     .setStyle('SUCCESS'),
                                               )
                                               .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('n')
                                                     .setEmoji('<:recusou:1140942612484853821>')
                                                     .setLabel('Não foi pago')
                                                     .setStyle('DANGER'),
                                               );
                                               
        interaction.channel.send({ embeds: [embed], components: [row] })
                                                        
                                                        
                                                       }
                              
                                                       
  if (interaction.customId === 'n') {
      
      msg.channel.bulkDelete(1)
      interaction.channel.send(`<:recusou:1140942612484853821>・Você ainda não pagou!`)
  }
                                                       
                                                       
                                                       if (interaction.customId === 'cancelarbuy') { 
                                                           
                if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                           
                    const embedentrega = new Discord.MessageEmbed()
                                               .setDescription(`\`\`\`Compra Cancelada: Seu pagamento foi cancelado, fique ciente que todos **adm** podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                                               .setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                                                       }
                                                       if (interaction.customId === 'cancelarpix') {
                                                           
                const embedentrega = new Discord.MessageEmbed()
                .setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                .setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [aberto] })
                                               
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        
                        channel.send({ embeds: [cancelado] })
                        
                        if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                       }
                       if (interaction.customId === 'aviss') {
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                                               
                        const aviso = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Sem Estoque`)
                        .setDescription(`<a:sininho:1141794970857111644> **・O membro ${interaction.user.username}** (${interaction.user.id}) **avisou que esta sem estoque do produto:** ${eprod.nome} `)
                        
                        
                        channel.send({ embeds: [aviso] })
                        
                                                       }
        if (interaction.customId === 'pronto') {
                        
                        if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                       }
                                                          if (interaction.customId === 'cartao') {
                                            

mercadopago.configure({
    access_token: `${config.get(`access_token`)}`
});


let preference = {
    items: [
        {
            title:`cartão・${interaction.user.username} - ${eprod.nome}`,
            unit_price: Number(precoalt),
            quantity: 1
        }
    ]
};


mercadopago.preferences.create(preference)
    .then(function (response) {
        
        const payment_url = response.body.init_point;
        
        const privado = new Discord.MessageEmbed()
        .setTitle(`Pagamento aberto`)
        .setColor("YELLOW")
        .setDescription(`__Pagamento de cartão (etc) pendente__\n\n**Usuario:** ${interaction.user.username}\n**Valor:** ${precoalt} Reais\n**Produto:** ${eprod.nome}\n**Horario:** ${moment().format('LLLL')}\n**Link:** [Aperte aqui](${payment_url})\n\n__Verifique nos pagamentos pendentes do mercado pago para ver se o usuario pagou, utilize__ **${config.get(`prefix`)}pagar ${data_id}** __abaixo para setar a compra como pago (o sistema do bot não aprova automatico o pagamento por cartão gerado com checkout por link)__\n**Se ele não pagou, não confirme o pagamento**`)
        
        const privado1 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel('Pagamento Pendente')
                                                          .setEmoji("<a:pretobranco:1115827538263023757>")
                                                          .setStyle('SECONDARY')
                                                        .setDisabled(true),
                                                    );
                                            
        const canal = client.channels.cache.get(config.get(`logs_staff`))
        
        canal.send({ embeds: [privado], components: [privado1] })
        
    
    const link = new Discord.MessageEmbed()
    .setColor(db.get(`${interaction.customId}.color`))
    .setTitle("Checkout Mercado Pago")
    .setDescription(`__Pague com cartão ou outras formas de pagamentos pelo checkout gerado, formas disponiveis__:\n\n• Pix\n• Paypal\n• Cartão\n• Cartão virtual da caixa\n• Saldo em conta\n• 2 Cartões\n\n**Link gerado:** [https://www.mercadopago.com.br/checkout/v1/${interaction.user.username}](${payment_url})\n\n**Assim que pagar, abra um ticket ou chame um adm no privado**`)
   .setFooter(`Você tem 15 minutos para pagar.`)
    
    interaction.reply({ embeds: [link] });
    
        console.log(response.body.id)

id.set(`${interaction.user.id}.produ`, `${response.body.id}`)
        
}).catch(function (error) {
    console.log(error);
});

let idcard = id.get(`${interaction.user.id}.produ`)
        
const cart = setInterval(function () {
          
      const time2 = setTimeout(function () {
          console.log('Loop.')
      clearInterval(cart);
      }, 900000)
        
mercadopago.payment.get(idcard).then(function(payment) {
  const status = payment.status;

  if (status === 'approved') {
    db3.set(`${data_id}.status`, `Processando`)
  } else {
    console.log('Pagamento ainda não foi aprovado');
  }
}).catch(function(error) {
  console.error('Erro ao consultar o pagamento:', error);
});
    
}, 10000)
    
                        }

                                                       if (interaction.customId === 'qrcode') {
                                            
                                                                
     const embed1 = new Discord.MessageEmbed()
                                                         .setFooter(`Id da compra: ${data_id}`)
                                                         .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:qrcode:1109700948424671242>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),
                                 )
                                 .addComponents(
                                  new Discord.MessageButton()
                                    .setCustomId('bb')
                                    .setEmoji("<:mp:1136044531985432596>")
                                    .setLabel("Outras Formas de Pagamento")
                                    .setStyle('SECONDARY'),
                              )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarboton')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                     
                                row.components[1].setDisabled(true)
                                              
                                                         
                                    msg.edit({ embeds: [embed1], components: [row] })
                                                        
                                                        const embed = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)}・QR Code`)
                                                          .setDescription(`Aponte a camera do seu dispositivo para o qrcode e escaneio-o, feito isso basta efetuar o pagamento e aguardar alguns segundos.`)
                                
                                                          .setImage("attachment://payment.png")
                                                          .setColor(db.get(`${interaction.customId}.color`))
                                                          .setFooter("Sistema verifica seu pagamento em menos de 5 segundos.")
                                                        interaction.reply({ embeds: [embed], files: [attachment] })
                                                       }
                                                    
                                                       if (interaction.customId === 'cancelarpix') {
                                                           
const embedentrega = new Discord.MessageEmbed()
.setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
.setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                                           
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                                                         clearInterval(lopp);
                                                         clearInterval(venda)
                                                         db3.delete(`${data_id}`)
                                                         if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                        }
                                                      })
                                                    })
                                                  }).catch(function (error) {
                                                    console.log(error)
                                                    });
                             }, 5000)
                                                  }
                                              })
                                             })
                                           }
                                         })
                                       })
                                       
 /////////
 
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
  
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 ///// NOVO AQUI /////
 
 c.send({ embeds: [embedss], components: [row], fetchReply: true }).then(msg => {
             const filter = i => i.user.id === interaction.user.id;
             const collector = msg.createMessageComponentCollector({ filter });
           
             collector.on("collect", intera => {
               intera.deferUpdate()
               if (intera.customId === 'cancelarbuy') {
                   
                   
const embedentrega = new Discord.MessageEmbed()
.setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
.setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                   const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                        
                 clearInterval(timer2);
                 db3.delete(`${data_id}`)
                 if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
               }
                        
     
                                     if (intera.customId === 'email') {
                                        
    const dd = `dados-${data_id}.txt`;
    const dadosUTF = `A Provedora ( ${config.get(`title`)} INC 2023 ) informa os dados gerados com UTF-8:\n\nInformações do Cliente:\n ${interaction.user.username} (${interaction.user.if}) \n\nInformações do Produto:\nNome: ${eprod.nome}\nValor: ${precoalt}\nQuantidade: ${quantidade1}\n\nInformações Gerais:\nServidor: ${interaction.guild.id}\nID Fornecido pelo Mercado Pago: ${data_id}`

fs.writeFile(dd, dadosUTF, (err) => {
    if (err) throw err;
    
    const attachment = new Discord.MessageAttachment(dd);
                                        
    const content = new Discord.MessageEmbed()
    .setTitle(`Backup De Dados UTF-8`)
    .setColor(`GREEN`)
    .setDescription(`<:nuvem:1136836890809614386> **・Dados Gerados Caso você precise se caso tiver algum problema com a compra do seu produto e precisar de um reembolso.**`)
  interaction.user.send(`<a:load:1141016935576895658>・<@${interaction.user.id}> Gerando seus dados UTF-8...`)
  const timer3 = setTimeout(function () {
  interaction.user.send({ embeds: [content], files: [attachment] });
  }, 8000)
}); 
 
 
                                                       }
                 if (intera.customId === "todoss") {
                 if (quantidade <= quantidade1) {
                
                   
                   const embedss2 = new Discord.MessageEmbed()
                     .setFooter(`ID da compra: ${data_id}`)
                     .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                     .setThumbnail(client.user.displayAvatarURL())
                                  
                   msg.edit({ embeds: [embedss2] })
                 } else {
                    
            const rowa = new Discord.MessageActionRow()
                        .addComponents(
               new Discord.MessageButton()
                 .setCustomId('addboton')
                 .setLabel(' + ')
                 .setStyle('SECONDARY'),
           )
                      .addComponents(
               new Discord.MessageButton()
                 .setCustomId('todoss')
                 .setEmoji('<:docs:1061068251817332787>')
                 .setStyle('SUCCESS'),
           ) 
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('removeboton')
                 .setLabel(' - ')
                 .setStyle('SECONDARY'),
           )
           .addComponents(
               new Discord.MessageButton()
                 .setCustomId('entt')
                 .setEmoji('<:delete:1109637048190636032>')
                 .setStyle('DANGER'),
           );
           
           const row = new Discord.MessageActionRow()
    
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('comprarboton')
                 .setLabel(' Confirmar ')
                 .setEmoji('<a:sim:1140943382798159913>')
                 .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('cancelarbuy')
                 .setLabel(' Cancelar ')
                 .setEmoji('<:recusou:1140942612484853821>')
                 .setStyle('DANGER'),
           );
           
            rowa.components[0].setDisabled(true)
            rowa.components[2].setDisabled(true)
            rowa.components[1].setDisabled(true)
            
            msg.edit({ components: [row, rowa] })
            
            
let quantidade1 = 1
quantidade1 - 1
quantidade1 = quantidade
let precoalt = Number(eprod.preco)


                
                    
                    
                    if (quantidade === quantidade) {
   precoalt = Number(precoalt) * Number(quantidade);

}
                    
                   
                   const embedss = new Discord.MessageEmbed()
                     .setFooter(`ID da compra: ${data_id}`)
                     .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                     .setThumbnail(client.user.displayAvatarURL())
                                  
                   msg.edit({ embeds: [embedss] })
                 }
               }
               
               
                 if (intera.customId === "addboton") {
                 if (quantidade1++ >= quantidade) {
                   quantidade1--;
                   const embedss2 = new Discord.MessageEmbed()
                                .setDescription(`<a:planet:1140941075196944454>  **・Produto:** \`${eprod.nome}\`\n<:Caixa:1141013432510992444> **・Quantidade:** \`${quantidade1}\`\n<:Carteira:1141013764154597417> **・Preço** \`R$${precoalt}\`\n<:Carrinho_WJ:1141013966332645377> **・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                    
                                  
                   msg.edit({ embeds: [embedss2] })
                 } else {
                     
 
    precoalt = Number(precoalt) + Number(eprod.preco);
    
    tttt = precoalt.toFixed(2); 
    precoalt = tttt
    
                   const embedss = new Discord.MessageEmbed()
                                  .setDescription(`<a:planet:1140941075196944454>  **・Produto:** \`${eprod.nome}\`\n<:Caixa:1141013432510992444> **・Quantidade:** \`${quantidade1}\`\n<:Carteira:1141013764154597417> **・Preço** \`R$${precoalt}\`\n<:Carrinho_WJ:1141013966332645377> **・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                     .setColor(db.get(`${interaction.customId}.color`))
                    
                                  
                   msg.edit({ embeds: [embedss] })
                 }
               }
                 if (intera.customId === "removeboton") {
                     
                   if (quantidade1 <= 1) {
                     } else {
                         
                       precoalt = precoalt - eprod.preco;
                       quantidade1--;
                        precoalt = Number(precoalt);
                        tttt = precoalt.toFixed(2); 
                         precoalt = tttt
    
                       const embedss = new Discord.MessageEmbed()
             .setDescription(`<a:planet:1140941075196944454>  **・Produto:** \`${eprod.nome}\`\n<:Caixa:1141013432510992444> **・Quantidade:** \`${quantidade1}\`\n<:Carteira:1141013764154597417> **・Preço** \`R$${precoalt}\`\n<:Carrinho_WJ:1141013966332645377> **・Quantidade Disponivel** \`${quantidade1}/${db.get(`${interaction.customId}.conta`).length}\``)
                         .setColor(db.get(`${interaction.customId}.color`))
                        

                       msg.edit({ embeds: [embedss] })
                     }
                     
                   }
                   if (intera.customId === "asd") {
                     
 const modal = new Discord.Modal()
  .setCustomId('notepad')
  .setTitle('✏️・Alterar Quantidade')
    
  const quantidade = new Discord.TextInputComponent()
  .setCustomId('quantidade')
  .setStyle('SHORT')
  .setLabel(`Quantidade`)
  .setPlaceholder(`1/${quantidade1}`)
  .setRequired(true)

 
   
   const notes = new Discord.MessageActionRow().addComponents(quantidade);
   
    modal.addComponents(notes);
    interaction.showModal(modal) 
    const modalInteraction = interaction.awaitModalSubmit({ filter: i => i.user.id === interaction.user.id, timer: 500000_000 });

    const note = modalInteraction.fields.getTextInputValue('quantidade')

modalInteraction.reply({ content: `✅**|** Quantidade editada`, ephemeral: true})

                   }
                 if (intera.customId === "entt") {
                   if (quantidade <= quantidade1) {
                     } else {
                         
                                     const rowa = new Discord.MessageActionRow()
                        .addComponents(
               new Discord.MessageButton()
                 .setCustomId('addboton')
                 .setLabel(' + ')
                 .setStyle('SECONDARY'),
           )
                      .addComponents(
               new Discord.MessageButton()
                 .setCustomId('todoss')
                 .setEmoji('<:docs:1061068251817332787>')
                 .setStyle('SUCCESS'),
           ) 
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('removeboton')
                 .setLabel(' - ')
                 .setStyle('SECONDARY'),
           )
           .addComponents(
               new Discord.MessageButton()
                 .setCustomId('entt')
                 .setEmoji('<:delete:1109637048190636032>')
                 .setStyle('DANGER'),
           );
           
           const row = new Discord.MessageActionRow()
    
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('comprarboton')
                 .setLabel(' Confirmar ')
                 .setEmoji('<a:sim:1140943382798159913>')
                 .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('cancelarbuy')
                 .setLabel(' Cancelar ')
                 .setEmoji('<:recusou:1140942612484853821>')
                 .setStyle('DANGER'),
           );
           
            rowa.components[0].setDisabled(false)
            rowa.components[2].setDisabled(false)
            rowa.components[1].setDisabled(false)
            
            msg.edit({ components: [row, rowa] })
            
                       precoalt = eprod.preco
                       quantidade1 = 1
                       const embedss = new Discord.MessageEmbed()
                       .setFooter(`Id da compra: ${data_id}`)
                       .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\` Reais`)  
                         .setColor(db.get(`${interaction.customId}.color`))
                         .setThumbnail(client.user.displayAvatarURL())

                       msg.edit({ embeds: [embedss] })
                     }
                   }

                   if (intera.customId === "comprarboton") {
                       
                       const aberto = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`Carrinho aberto`)
                        .setDescription(`<a:sim:1140943382798159913> **・O membro ${interaction.user.username}** (${interaction.user.id}) **abriu o carrinho do produto:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [aberto] })
                        
                       const embedentrega = new Discord.MessageEmbed()
                       .setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                       .setColor('YELLOW')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                     msg.channel.bulkDelete(50);
                     clearInterval(timer2);
                     const timer3 = setTimeout(function () {
                      if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                       db3.delete(`${data_id}`)
                      }, 1200000)
                     const row = new Discord.MessageActionRow()
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('continuarboton')
                           .setLabel('Continuar')
                           .setEmoji('<a:sim:1140943382798159913>')
                           .setStyle('SUCCESS'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('addcboton')
                           .setLabel('Cupom de Desconto')
                           .setDisabled(`${db.get(`${interaction.customId}.cup`)}`)
                           .setEmoji('<:cupom:1141021467857928334>')
                           .setStyle('PRIMARY'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarboton')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                                        
                    dbc.set(`usado`, `Não utilizado`)
                    
                    dbP.set(`pay.emoji`, `<:pix:1115828248446771313>`)
                    dbP.set(`pay.nome`, `Mercado Pago`)
                    
                     const embedss = new Discord.MessageEmbed()
                       .setTitle(`${config.get(`title`)}・Resumo da Compra`)
                       .setDescription(`<a:planet:1140941075196944454>・Produto: \`${eprod.nome}\`\n<:Carteira:1141013764154597417>・Valor Unitário: \`R$$${db.get(`${interaction.customId}.preco`)}\`\n<:Caixa:1141013432510992444>・Quantidade: \`${quantidade1}\`\n<:Carteira:1141013764154597417>・Total : \`R$${precoalt}\`\n\n\n<:Carrinho_WJ:1141013966332645377>・Produtos no Carrinho: \`${quantidade1}\`\n<:Carteira:1141013764154597417>・Valor a pagar: \`R$${precoalt}\`\n<:cupom:1141021467857928334>・Cupom: \`Nenhum\``)
                       .setColor(db.get(`${interaction.customId}.color`))
                       .setThumbnail(client.user.displayAvatarURL())
                     c.send({ embeds: [embedss], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", intera2 => {
                         intera2.deferUpdate()
                         if (intera2.customId === 'addcboton') {
                           intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: true });
                            msg.channel.send(`<:cupom:1141021467857928334>・Digite o seu cupom:`).then(mensagem => {
                             const filter = m => m.author.id === interaction.user.id;
                             const collector = mensagem.channel.createMessageCollector({ filter, max: 1 });
                             collector.on("collect", cupom => {
                               if(`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit(`<:recusou:1140942612484853821>・Esse cupom não existe.`)
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 return;
                               }
                                 
                               var minalt = dbc.get(`${cupom}.minimo`);
                               var dscalt = dbc.get(`${cupom}.desconto`);
                               var qtdalt = dbc.get(`${cupom}.quantidade`);
                                 
                               precoalt = Number(precoalt) + Number(`1`);
                               minalt = Number(minalt) + Number(`1`);
                               if(precoalt < minalt) {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`<:recusou:1140942612484853821>・Você não atingiu o mínimo!`)
                                 return;
                               } else {
                              
                               precoalt = Number(precoalt) - Number(`1`);
                               minalt = Number(minalt) - Number(`1`);
                                   
                               if(`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`<:recusou:1140942612484853821>・Esse cupom saiu de estoque!`)
                                 return;
                               }
                                              
                               if(`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 dbc.set(`usado`, `Utilizado`)
                                 mensagem.edit(`<a:sim:1140943382798159913>・Cupom adicionado`)
                                  intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                   var precinho = precoalt;
                                   var descontinho = "0."+dscalt;
                                   var cupomfinal = precinho * descontinho;
                                   precoalt = precinho.toFixed(2) - cupomfinal;
                                   qtdalt = qtdalt - 1;
                                   row.components[1].setDisabled(true)
                                   const embedss2 = new Discord.MessageEmbed()
                       .setTitle(`${config.get(`title`)}・Resumo da Compra`)
                       .setDescription(`<a:planet:1140941075196944454>・Produto: \`${eprod.nome}\`\n<:Carteira:1141013764154597417>・Valor Unitário: \`R$$${db.get(`${interaction.customId}.preco`)}\`\n<:Caixa:1141013432510992444>・Quantidade: \`${quantidade1}\`\n<:Carteira:1141013764154597417>・Total : \`R$${precoalt}\`\n\n\n<:Carrinho_WJ:1141013966332645377>・Produtos no Carrinho: \`${quantidade1}\`\n<:Carteira:1141013764154597417>・Valor a pagar: \`R$${precoalt}\`\n<:cupom:1141021467857928334>・Cupom: \`${dbc.get(`${cupom}.idcupom`)}\`\n<a:estrela:1115828244793544745>・Desconto: \`${dbc.get(`${cupom}.desconto`)}\``)
                       
                       .setColor(db.get(`${interaction.customId}.color`))
                                     .setThumbnail(client.user.displayAvatarURL())
                                   msg.edit({ embeds: [embedss2], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true })
                                   dbc.set(`${cupom}.quantidade`, `${qtdalt}`)
                                 }
                               }
                              }) 
                            })
                          }
                                    
                           if (intera2.customId === 'cancelarboton') {
                                             
                             clearInterval(timer3);
                             db3.delete(`${data_id}`)
                             if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                           }
                 
                           if (intera2.customId === "continuarboton") {
                             msg.channel.bulkDelete(50);
                             
                             msg.channel.send(`<a:load:1141016935576895658> **・Gerando Pagamento com dados UTF-8...**`)
                             
                             const time6 = setTimeout(function () {
                             
                             msg.channel.bulkDelete(50);
                             
                             clearInterval(timer3);
                             const venda = setTimeout(function () {
                              if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                               db3.delete(`${data_id}`)
                              }, 1200000)
                             mercadopago.configurations.setAccessToken(config.get(`access_token`));
                             var payment_data = {
                               transaction_amount: Number(precoalt),
                               description: `Pagamento (${interaction.guild.name})・${interaction.user.username}`,
                               payment_method_id: 'pix',
                                payer: {
                                  email: 'ytrasher@modz.vip',
                                  first_name: 'yTRASHER',
                                  last_name: 'Automation',
                                   identification: {
                                     type: 'CPF',
                                     number: '75608669649'
                                   },
                                   address: {
                                     zip_code: '06233200',
                                     street_name: 'Av. das Nações Unidas',
                                     street_number: '3003',
                                     neighborhood: 'Bonfim',
                                     city: 'Osasco',
                                     federal_unit: 'SP'
                                   }
                                 }
                               };

                               mercadopago.payment.create(payment_data).then(function (data) {
                                 db3.set(`${data_id}.status`, `Pendente (2)`)
                                 const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                 const attachment = new Discord.MessageAttachment(buffer, "payment.png");
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('aa')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Pagar com Pix")
                                       .setStyle('SECONDARY'),
                                 )
                        .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('bb')
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Pagar no Site")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('cancelarbuy')
                                       .setEmoji("<:recusou:1140942612484853821>")
                                       .setLabel("Cancelar")
                                       .setStyle('DANGER'),
                                 );
                            
                const tempin = tempo.get(`minutos`)
                if (tempin === null) tempin = 10;
const dateStr = Date.now() + ms(`${tempo.get(`minutos`)}m`)
                            const date = new Date(dateStr);
                            const unixTimestamp = Math.floor(date.getTime() / 1000);

                                const embed = new Discord.MessageEmbed()
                                  .setFooter(`Id da compra: ${data_id}`)
                                  .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\` Reais`)             
                               
                            
                                  .setColor(db.get(`${interaction.customId}.color`))
                                  .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                msg.channel.send({ embeds: [embed], content: `<@${interaction.user.id}>`, components: [row] }).then(msg => {

                                const collector = msg.channel.createMessageComponentCollector();
                                const lopp = setInterval(function () {
                                  const time2 = setTimeout(function () {
                                    clearInterval(lopp);
                                  }, 1800000)
                                 axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                  headers: {
                                    'Authorization': `Bearer ${config.get(`access_token`)}`
                                  }
                                }).then(async (doc) => {
                            
                               if (doc.data.collection.status === "approved") {
                                   db3.set(`${data_id}.status`, `Processando`)
                               }
                                     
                               if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                   
                                   msg.channel.bulkDelete(99);
                                   
                                  const embederror = new Discord.MessageEmbed()
                                                                .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                                .setDescription(`Infelizmente alguem comprou esse produto antes de você, o reembolso foi feito pelo bot automaticamente.`)
                                                                .setColor("RED")
                                                                const embederror1 = new Discord.MessageEmbed()
                                                                .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                                .setDescription(`${interaction.user.username} Teve a compra reembolsada por comprar um produto que estava sem estoque (alguem comprou antes o produto)`)
                                                                .setColor("RED")
                                                            
                                                            if (db.get(`${severi}.conta`) < quantidade1) {
                                                                mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      var refund = { payment_id: `${data.body.id}` };
                                                       mercadopago.refund.create(refund).then(result => {
                                                        db3.set(`${data_id}.status`, `Reembolsado`)
                                                      }).catch(function (error) { interaction.user.send({ content: `<a:pretobranco:1115827538263023757>・Houve algum erro durante a transação ou esse pagamento foi pago por comandos , tente novamente!` }) });
                                                                clearTimeout(time2)
                                 clearInterval(lopp);
                                 clearInterval(venda);
                                 const vendadel = setTimeout(function () {
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 10000)
                                                                interaction.user.send({ embeds: [embederror] })
                                                                client.channels.cache.get(`${config.get(`logs_staff`)}`).send({ embeds: [embederror1] })
                                                }
                                    else {
                                      
                                      msg.channel.bulkDelete(50);
                                                        
                                 clearTimeout(time2)
                                 clearInterval(lopp);
                                 clearInterval(venda);
                                  const vendadel = setTimeout(function () {
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 1200000)
                                   const a = db.get(`${severi}.conta`);
                                   const canalif1 = client.channels.cache.get(config.canallogs);
                                     db2.add("pedidostotal", 1)
                                     db2.add("gastostotal", Number(precoalt))
                                     db2.add(`${moment().format('L')}.pedidos`, 1)
                                     db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.pedidosaprovados`, 1)

                                     if (a < quantidade1) {
                                       db3.set(`${data_id}.status`, `Reembolsado`)
                                       msg.channel.send(`<a:sim:1140943382798159913>・Pagamento reembolsado`)
                                       msg.channel.send(`<a:sim:1140943382798159913>・ID Da compra: ${data_id}`)
                                        mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                         var refund = { payment_id: `${data.body.id}` };
                                          mercadopago.refund.create(refund).then(result => {
                                           const message2new = new Discord.MessageEmbed()
                                             .setDescription(`Comprador: <@${data_id}>\nData da compra: ${moment().format('LLLL')}\nNome: ${eprod.nome}\nQuantidade: ${quantidade1}x\nPreço: ${precoalt}`)
                                             .setFooter(`ID da compra: ${data_id}`)
                                             .setColor(db.get(`${interaction.customId}.color`))
                                             .setThumbnail(client.user.displayAvatarURL())
                                           canalif1.send({ embeds: [message2new] })})
                                          } else {
                                           const removed = a.splice(0, Number(quantidade1));
                                            db.set(`${severi}.conta`, a);
                                            
const textFileName = `${data_id}.txt`;
const word = `${metodo.get(`${interaction.customId}.produto`)}`;

fs.writeFile(textFileName, word, (err) => {
    if (err) throw err;
    
    const embedentregasw = new Discord.MessageEmbed()
    .setTitle(`${config.get(`title`)}・Arquivo da Compra`)
    .setThumbnail("https://media.discordapp.net/attachments/1103858345158377532/1106399779640049756/nuvem.png")
    .setColor("GREEN")
    .setDescription(`**Aviso:** Se dentro do arquivo não tiver seu produto, ele foi entregue na embed abaixo (como produto normal)`)
    
    interaction.user.send({ embeds: [embedentregasw], files: [attachment] }) 
    
});
                                            
    const embedentrega = new Discord.MessageEmbed()
    .setTitle(`${config.get(`title`)}・Compra Aprovada`)
    .addField(`<:Carrinho_WJ:1141013966332645377> **・Produto(s) Comprado(s):**`, `${eprod.nome}`)
    .addField(`<:mysql:1109636930599125012> **・ID da compra:**`, `${data_id}`, true)
    .setDescription(`Seu pagamento foi confirmado. Obrigado por confiar na equipe, fazemos o nosso trabalho focando na experiência em que você merece ter!.`)
    .setFooter(`Seu(s) Produto(s)`)
    .setColor(`d59a66`)
    .setThumbnail("https://media.discordapp.net/attachments/1103858345158377532/1106399771947712553/estoque-3.png")
                    
    const attachment = new Discord.MessageAttachment(textFileName);
                    
                    const sls = setTimeout(function () {
                    
                                             interaction.user.send({ embeds: [embedentrega] })
                                             
                                interaction.user.send("<:Caixa:1141013432510992444>**・Entrega do Produto:**")
                                   interaction.user.send(`${removed.join("\n")}`)}, 5000)
                        
                                              db3.set(`${data_id}.status`, `Concluido`)
                                              msg.channel.send(`<a:sim:1140943382798159913>・Pagamento aprovado!`)
                                               const membro = interaction.guild.members.cache.get(interaction.user.id)
                                               const role = interaction.guild.roles.cache.find(role => role.id === config.get(`role`))
                                               membro.roles.add(role)
                                               
                        dbV.set(`avaliacao`, `Nenhuma avaliação foi feita...`)
                        dbV.set(`mensagem`, `Nenhum Comentario`)
                                                   const rowavaliacao = new Discord.MessageActionRow()
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('1star')
                                                   .setEmoji('⭐')
                                                   .setLabel('1')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('2star')
                                                   .setEmoji('⭐')
                                                   .setLabel('2')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('3star')
                                                   .setEmoji('⭐')
                                                   .setLabel('3')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('4star')
                                                   .setEmoji('⭐')
                                                   .setLabel('4')
                                                   .setStyle('SECONDARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('5star')
                                                   .setEmoji('⭐')
                                                   .setLabel('5')
                                                   .setStyle('SECONDARY'),
                                               );
                                               
            const embedava = new Discord.MessageEmbed()
                                               .setTitle(`${config.get(`title`)}・Avaliação`)
                                               .setDescription("Avalie a sua compra apertando no botão abaixo.")
                                               .addField(`<:cupom:1141021467857928334>・Informações:`, `Escolha uma nota essa venda.`)
                                               .setFooter(`Você tem 45 segundos para avaliar...`)
                                               .setColor(db.get(`${interaction.customId}.color`))
            const timeava = setTimeout(function () {
            c.send({ embeds: [embedava], components: [rowavaliacao] })}, 1000)
            
                                            const reem = dbL.get(`reembolsoL`)
                                            
                                            if (reem === null) reem = false;
                                            
                                               const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('reembolso')
                                                     .setEmoji('<:mp:1136044531985432596>')
                                                     .setDisabled(`${dbL.get(`reembolsoL`)}`)
                                                     .setLabel('Reembolsar')
                                                     .setStyle('DANGER'),
                                               );
        
                                               const canalif = client.channels.cache.get(config.get(`logs_staff`))
                                               const message2 = await canalif.send({ embeds: [new Discord.MessageEmbed()
                                                .setDescription(`> **<:IDD:1141015458124922973>・Comprador:** ${interaction.user.tag} (${interaction.user.id})\n**<a:planet:1140941075196944454>・Produto(s) Comprado(s):** \`\`${eprod.nome}\`\`\n**<:Caixa:1141013432510992444>・Quantidade Comprada:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor Pago:** \`\`R$${precoalt}\`\`\n**📆・Data da compra:** ${moment().format('LLLL')}\n${dbV.get(`avaliacao`)}\n**<a:estrela:1115828244793544745>・Avaliação:** ${dbV.get(`avaliacao`)}\n**${interaction.user.username}:** ${dbV.get(`mensagem`)}\n**<:cupom:1141021467857928334>・Cupom Usado:** ${dbc.get(`usado`)}\n**${dbP.get(`pay.emoji`)}・Forma de Pagamento:** ${dbP.get(`pay.nome`)}`)
                                                 .addField(`**Produto Entregue:** `, `\`\`\`${removed.join(" \n")}\`\`\``)
                                                 .setColor('GREEN')
                                                 
                         .setImage(config.get(`imagem`))
                                                 .setThumbnail(client.user.displayAvatarURL())], components: [row]})
                                               const interação = message2.createMessageComponentCollector({ componentType: "BUTTON", })
                                                interação.on("collect", async (interaction) => {
                                                 if (interaction.customId === "reembolso") {
                                                   const user = interaction.user.id
                                                   if (interaction.user.id !== `${perms.get(`${user}_id`)}`) return interaction.reply({ content: `<:recusou:1140942612484853821>・Você não está na lista de pessoas!`, ephemeral: true })
                                                   interaction.deferUpdate()
                                                     mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      var refund = { payment_id: `${data.body.id}` };
                                                       mercadopago.refund.create(refund).then(result => {
                                                        db3.set(`${data_id}.status`, `Reembolsado`)
                                                        message2.delete()
                                                        const message2new = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)}・Compra Reembolsada`)
                                                          .setDescription(`> **<:IDD:1141015458124922973>・Comprador:** ${interaction.user.tag} (${interaction.user.id})\n**<a:planet:1140941075196944454>・Produto(s) Comprado(s):** \`\`${eprod.nome}\`\`\n**<:Caixa:1141013432510992444>・Quantidade Comprada:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor Pago:** \`\`R$${precoalt}\`\`\n**📆・Data da compra:** ${moment().format('LLLL')}\n${dbV.get(`avaliacao`)}\n**<a:estrela:1115828244793544745>・Avaliação:** ${dbV.get(`avaliacao`)}\n**${interaction.user.username}:** ${dbV.get(`mensagem`)}\n**<:cupom:1141021467857928334>・Cupom Usado:** ${dbc.get(`usado`)}\n**${dbP.get(`pay.emoji`)}・Forma de Pagamento:** ${dbP.get(`pay.nome`)}`)
                           
                                                        .setColor('YELLOW')
                                 
                                 .setImage(config.get(`imagem`))                         .setThumbnail(client.user.displayAvatarURL())
                                                        canalif.send({ embeds: [message2new] })
                                                      }).catch(function (error) { interaction.followUp({ content: `<a:pretobranco:1115827538263023757>・Houve algum erro durante a transação, tente novamente!`, ephemeral: true }) });
                                                    }
                                                  })

                         const time2 = setTimeout(function () {
                         const dateStr = Date.now() + ms(`1s`)
                         const date = new Date(dateStr);
                         const unixTimestamp = Math.floor(date.getTime() / 1000);
                         const embedaprovadolog = new Discord.MessageEmbed()
                         .setDescription(`> **<:IDD:1141015458124922973>・Comprador:** ${interaction.user.tag} (${interaction.user.id})\n**<a:planet:1140941075196944454>・Produto(s) Comprado(s):** \`\`${eprod.nome}\`\`\n**<:Caixa:1141013432510992444>・Quantidade Comprada:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor Pago:** \`\`R$${precoalt}\`\`\n**📆・Data da compra:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)\n${dbV.get(`avaliacao`)}\n**<a:estrela:1115828244793544745>・Avaliação:** ${dbV.get(`avaliacao`)}\n**${interaction.user.username}:** ${dbV.get(`mensagem`)}\n**<:cupom:1141021467857928334>・Cupom Usado:** ${dbc.get(`usado`)}\n**${dbP.get(`pay.emoji`)}・Forma de Pagamento:** ${dbP.get(`pay.nome`)}`)
                                                  client.channels.cache.get(config.get(`logs`)).send({embeds: [embedaprovadolog]})  
}, 49900)
                                                 
                                                  db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)
                                                           
                                                    const row2 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel(`${persos.get(`botao`)}`)
                                                          .setEmoji(`<:Carrinho_WJ:1141013966332645377>`)
                                                          .setStyle(perso.get(`perso`)),
                                                    );
                                                    
let descricao = `${persos.get(`descricao`)}`;
descricao = descricao.replace("#{desc}", `${db.get(`${interaction.customId}.desc`)}`);
descricao = descricao.replace("#{nome}", `${db.get(`${interaction.customId}.nome`)}`);
descricao = descricao.replace("#{preco}", `${db.get(`${interaction.customId}.preco`)}`);
descricao = descricao.replace("#{estoque}", `${db.get(`${interaction.customId}.conta`).length}`);

let titulo = `${persos.get(`titulo`)}`;
titulo = titulo.replace("#{nome}", `${config.get(`title`)}`);
           
                                                                
                                                    const embed2 = new Discord.MessageEmbed()
                                                      
                                                      .setDescription(descricao)
                                                      .setColor(db.get(`${interaction.customId}.color`))
                                                      .setFooter(`${persos.get(`rodape`)}`)
                              
                         .setImage(`${db.get(`${interaction.customId}.imagem`)}`)
                         .setThumbnail(client.user.displayAvatarURL())
                                                    interaction.message.edit({ embeds: [embed2], components: [row2] })}}}})}, 10000)
                                                
                                                    collector.on("collect", interaction => {
                                                     if (interaction.customId === 'codigo') {
                                                      
                                 const embed = new Discord.MessageEmbed()
                                 .setDescription(`\`\`\`Pague com Outras Formas de Pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f>・(<t:${unixTimestamp}:R>)`)
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                    
                                    
                                    const row = new Discord.MessageActionRow()
                                    .addComponents(
                                     new Discord.MessageButton()
                                       .setURL(`${data.body.point_of_interaction.transaction_data.ticket_url}`)
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Atalho")
                                       .setStyle('LINK'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:qrcode:1109700948424671242>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),
                                 )
                                 .addComponents(
                                  new Discord.MessageButton()
                                    .setCustomId('bb')
                                    .setEmoji("<:mp:1136044531985432596>")
                                    .setLabel("Outras Formas de Pagamento")
                                    .setStyle('SECONDARY'),
                              )

                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                                    row.components[0].setDisabled(true)
                                              
                                              
                                    msg.edit({ embeds: [embed], components: [row] })
                                    
                            const codigo = new Discord.MessageEmbed()
                            
                            .setColor(db.get(`${interaction.customId}.color`))
                            
                            .addField(`<:pix:1115828248446771313> **・Pix copia e cola:**`, `${data.body.point_of_interaction.transaction_data.qr_code}`)
                            const row20 = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('codigocll')
                                                          .setEmoji('📱')
                                                          .setLabel('Copiar')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.reply({ embeds: [codigo], components: [row20] })
                                                                                        
                                                       }
                                  if (interaction.customId === 'mensagem') {
             interaction.channel.bulkDelete(2);
             interaction.deferUpdate();
             const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)}・Sistema de avaliação`)
                 .setColor("YELLOW")
                 .setDescription("<a:loading:1067015746812649563>・Digite a sua mensagem avaliativa sobre a compra (ex: gostei, top, rapido):")
                 
                 interaction.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: true });
             interaction.channel.send({ embeds: [embed] }).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter});               collector.on("collect", yTRASHER => {
                 yTRASHER.delete()
                 const PAY = yTRASHER.content
                 dbV.set(`mensagem`, PAY)
                 collector.stop();
                 const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)}・Sistema de avaliação`)
                 .setColor("GREEN")
                 .setDescription(`<a:sim:1140943382798159913>・Obrigado pela mensagem avaliativa \`${dbV.get('mensagem')}\``)
                 msg.edit({ embeds: [embed] })
                 interaction.channel.send
                
                 interaction.channel.send({ content: `Utilize \`${config.get(`prefix`)}fechar\` para deletar o carrinho.` })
                 })
               })
                                      
                                  }
                                                                   if (interaction.customId === '1star') {
                                                        msg.channel.bulkDelete(20); 
                                                        dbV.set(`avaliacao`, `⭐ (1)`)
                                                        interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '2star') {
                                                        msg.channel.bulkDelete(20);
                                            
                                                        dbV.set(`avaliacao`, `⭐⭐ (2)`)
                                                        interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '3star') {
                                                        msg.channel.bulkDelete(20);
                                                
                dbV.set(`avaliacao`, `⭐⭐⭐ (3)`)
                                                        interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '4star') {
                                                        msg.channel.bulkDelete(20);
                                                        (1);
                                            
                                                dbV.set(`avaliacao`, `⭐⭐⭐⭐ (4)`)
                                                        interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                                                       if (interaction.customId === '5star') {
                                                        msg.channel.bulkDelete(20);
                                                
                                                dbV.set(`avaliacao`, `⭐⭐⭐⭐⭐ (5)`)
                                                interaction.channel.send(`<a:sim:1140943382798159913> **・Obrigado pela sua avaliação, envie sua mensagem avaliativa pelo botão abaixo!** `)
                                                        
                            const rowla = new Discord.MessageActionRow()
                            .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId('mensagem')
                                                          .setEmoji('⭐')
                                                          .setLabel('Enviar Mensagem')
                                                          .setStyle('SECONDARY'),
                                                    );
                                                      interaction.channel.send({ components: [rowla] })
                                                       }
                    //////////////////
                                                       if (interaction.customId === 'codigocll') {
                                                        interaction.reply({content: `${data.body.point_of_interaction.transaction_data.qr_code}`, ephemeral: true})
                                                       }
                                                       
                                                       
                                                       
                                                       
    if (interaction.customId === 'aa') {
     
     msg.channel.bulkDelete(40)
    
    
                                 const row = new Discord.MessageActionRow()
                                 .addComponents(
                                     new Discord.MessageButton()
                                       .setURL(`${data.body.point_of_interaction.transaction_data.ticket_url}`)
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Realizar Pagamento")
                                       .setStyle('LINK'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:qrcode:1109700948424671242>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),
                                 )
                                 .addComponents(
                                  new Discord.MessageButton()
                                    .setCustomId('bb')
                                    .setEmoji("<:mp:1136044531985432596>")
                                    .setLabel("Outras Formas de Pagamento")
                                    .setStyle('SECONDARY'),
                              )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
     
     const embed = new Discord.MessageEmbed()
                                                         .setFooter(`Id da compra: ${data_id}`)
                                                         .setDescription(`\`\`\`Escolha uma forma de pagamento.\`\`\`\n> **<a:planet:1140941075196944454>・Produto:** \`${eprod.nome}\`\n> **<:Caixa:1141013432510992444>・Produtos no Carrinho:** \`${quantidade1}\`\n> **<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\` Reais\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f> (<t:${unixTimestamp}:R>)`)                                    
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                    interaction.channel.send({ embeds: [embed], components: [row] })
                                                       }
                                                       
                                                       
  if (interaction.customId === 'bb') {
     
     msg.channel.bulkDelete(40)
    
mercadopago.configure({
    access_token: `${config.get(`access_token`)}`
});


let preference = {
    items: [
        {
            title:`cartão・${interaction.user.username} - ${eprod.nome}`,
            unit_price: Number(precoalt),
            quantity: 1
        }
    ]
};


mercadopago.preferences.create(preference)
    .then(function (response) {
        
        const payment_url = response.body.init_point;
        
        const privado = new Discord.MessageEmbed()
        .setTitle(`Pagamento Pendente`)
        .setColor(db.get(`${interaction.customId}.color`))
        .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
        .setDescription(`__Pagamento de cartão pendente__\n\n**Usuario:** ${interaction.user.username}\n\n**Valor:** ${precoalt} Reais\n**Produto:** ${eprod.nome}\n\n**Horario:** ${moment().format('LLLL')}\n\n**Link:** [Aperte aqui](${payment_url})\n\n__Verifique nos pagamentos pendentes do mercado pago para ver se o usuario pagou, utilize__ **${config.get(`prefix`)}pagar ${data_id}** __abaixo para setar a compra como pago (o sistema do bot não aprova automatico o pagamento por cartão gerado com checkout por link)__\n\n**Se ele não pagou, não confirme o pagamento**`)
        
        const privado1 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel('Pagamento Pendente')
                                                          .setEmoji("<a:pretobranco:1115827538263023757>")
                                                          .setStyle('SECONDARY')
                                                        .setDisabled(true),
                                                    );
                                            
        const canal = client.channels.cache.get(config.get(`logs_staff`))
        
        canal.send({ embeds: [privado], components: [privado1] })
        
                        
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setURL(`${payment_url}`)
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Realizar o Pagamento")
                                       .setStyle('LINK'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('veri')
                                       .setEmoji("<a:sim:1140943382798159913>")
                                       .setLabel("Validar Compra")
                                       .setStyle('SUCCESS'),
                                 )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
     
     const embed = new Discord.MessageEmbed()
                                                         .setDescription(`\`\`\`Pague com Outras Formas de Pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f>・(<t:${unixTimestamp}:R>)`)
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                    interaction.channel.send({ embeds: [embed], components: [row] })
                                    
                                    }).catch(function (error) {
    console.log(error);
});
                                                       }
                                                       
                                                       
                                                       
                                if (interaction.customId === "saldo") {
                                    
                                row.components[2].setDisabled(true)
                                                        msg.edit({ components: [row] })
                                
                                let saldo = dbS.get(`${interaction.user.id}.saldo`)
                                if (saldo === null) saldo = 0;
                                
                                if (precoalt > saldo) { interaction.reply(`<a:pretobranco:1115827538263023757>・Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`R$${saldo}\`, valor da compra: \`R$${precoalt}\``)
                                } else {
                                
let num1 = saldo;
let num2 = precoalt;
let result = num1 - num2;

                                dbS.set(`${interaction.user.id}.saldo`, result)
                                    
                                    db3.set(`${data_id}.status`, `Processando`)
                                                        interaction.reply(`<a:sim:1140943382798159913> **・Pagamento pago por saldo com sucesso!.** `)
                                                        
        dbP.set(`pay.emoji`, `<:Carteira:1141013764154597417>`)
        dbP.set(`pay.nome`, `Pago por Saldo`)
                                }
                      
                       }
                         if (interaction.customId === 'verify') {
                        
                         const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setStyle(`ALGO`)
                                       .setEmoji("<:mp:1136044531985432596>")
                                       .setLabel("Realizar o Pagamento")
                                       .setStyle('SECONDARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('verify')
                                       .setEmoji("<a:sim:1140943382798159913>")
                                       .setLabel("Validar Pagamento (adm)")
                                       .setStyle('SUCCESS'),
                                 )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarbuy')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                     
                        row.components[1].setDisabled(true)
                        row.components[0].setDisabled(true)
                        msg.edit({ components: [row] })
                                       
const dateStr = Date.now() + ms(`8s`)
                            const date = new Date(dateStr);
                            const unixTimestamp = Math.floor(date.getTime() / 1000);
                                                        interaction.reply({content: `<a:loading:1067015746812649563>・Verificando pagamento <t:${unixTimestamp}:R>`, ephemeral: true})
const ve = setTimeout(function () {
    
                          interaction.channel.send({content: `<:recusou:1140942612484853821>・Pagamento não encontrado.`})
           }, 8000)
                                                       }
                                                       
                                                    if (interaction.customId === 'saldo1') {
                                       
                                     if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `<a:pretobranco:1115827538263023757> **・Você **não** tem permissão para utilizar esse sistema.** `, ephemeral: true})
                                                           db3.set(`${data_id}.status`, `Processando`)
                                                           
        dbP.set(`pay.emoji`, `<:mp:1136044531985432596>`)
        dbP.set(`pay.nome`, `Pago por Cartão`)
                                                        interaction.reply({content: `<a:sim:1140943382798159913> **・Pagamento validado com sucesso (aguarde 5s).** `, ephemeral: true})
                                                       }
                                                       
                                                       
      if (interaction.customId === 'veri') {
       interaction.deferUpdate();
                                       
                                     if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `<a:pretobranco:1115827538263023757> **・Chame um ADM para verificar seu pagamento por cartão (se você ainda não pagou, não chame um adm atoa).** `, ephemeral: true})
                
    
                                                        
    const embed = new Discord.MessageEmbed()
    .setTitle(`${config.get(`title`)}・Confirmar Validação`)
    .setColor(`RED`)
    .setDescription(`<a:load:1141016935576895658>・Você confirma que recebeu o pagamento da venda [ ${eprod.nome} - R$${precoalt} ](\`${data_id}\`) ?\nVocê pode ver se recebeu esse pagamento pela atividade do Mercado Pago\nSe o comprador ainda não pagou, não confirme a validação do Pagamento.`)
                                                        
                        const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('saldo1')
                                                     .setEmoji('<:mp:1136044531985432596>')
                                                     .setLabel('Validar Pagamento')
                                                     .setStyle('SUCCESS'),
                                               )
                                               .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('n')
                                                     .setEmoji('<:recusou:1140942612484853821>')
                                                     .setLabel('Não foi pago')
                                                     .setStyle('DANGER'),
                                               );
                                               
        interaction.channel.send({ embeds: [embed], components: [row] })
                                                        
                                                        
                                                       }
                              
                                                       
  if (interaction.customId === 'n') {
      
      msg.channel.bulkDelete(1)
      interaction.channel.send(`<:recusou:1140942612484853821>・Você ainda não pagou!`)
  }
                                                       
                                                       
                                                       if (interaction.customId === 'cancelarbuy') { 
                                                           
                if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                           
                    const embedentrega = new Discord.MessageEmbed()
                    .setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                    .setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                               
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                                                       }
                                                       if (interaction.customId === 'cancelarpix') {
                                                           
                const embedentrega = new Discord.MessageEmbed()
                .setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
                .setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [aberto] })
                                               
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        
                        channel.send({ embeds: [cancelado] })
                        
                        if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                       }
                       if (interaction.customId === 'aviss') {
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                                               
                        const aviso = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Sem Estoque`)
                        .setDescription(`<a:sininho:1141794970857111644> **・O membro ${interaction.user.username}** (${interaction.user.id}) **avisou que esta sem estoque do produto:** ${eprod.nome} `)
                        
                        
                        channel.send({ embeds: [aviso] })
                        
                                                       }
        if (interaction.customId === 'pronto') {
                        
                        if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                       }
                                                          if (interaction.customId === 'cartao') {
                                            

mercadopago.configure({
    access_token: `${config.get(`access_token`)}`
});


let preference = {
    items: [
        {
            title:`cartão・${interaction.user.username} - ${eprod.nome}`,
            unit_price: Number(precoalt),
            quantity: 1
        }
    ]
};


mercadopago.preferences.create(preference)
    .then(function (response) {
        
        const payment_url = response.body.init_point;
        
        const privado = new Discord.MessageEmbed()
        .setTitle(`Pagamento aberto`)
        .setColor("YELLOW")
        .setDescription(`__Pagamento de cartão (etc) pendente__\n\n**Usuario:** ${interaction.user.username}\n**Valor:** ${precoalt} Reais\n**Produto:** ${eprod.nome}\n**Horario:** ${moment().format('LLLL')}\n**Link:** [Aperte aqui](${payment_url})\n\n__Verifique nos pagamentos pendentes do mercado pago para ver se o usuario pagou, utilize__ **${config.get(`prefix`)}pagar ${data_id}** __abaixo para setar a compra como pago (o sistema do bot não aprova automatico o pagamento por cartão gerado com checkout por link)__\n**Se ele não pagou, não confirme o pagamento**`)
        
        const privado1 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel('Pagamento Pendente')
                                                          .setEmoji("<a:pretobranco:1115827538263023757>")
                                                          .setStyle('SECONDARY')
                                                        .setDisabled(true),
                                                    );
                                            
        const canal = client.channels.cache.get(config.get(`logs_staff`))
        
        canal.send({ embeds: [privado], components: [privado1] })
        
    
    const link = new Discord.MessageEmbed()
    .setColor(db.get(`${interaction.customId}.color`))
    .setTitle("Checkout Mercado Pago")
    .setDescription(`__Pague com cartão ou outras formas de pagamentos pelo checkout gerado, formas disponiveis__:\n\n• Pix\n• Paypal\n• Cartão\n• Cartão virtual da caixa\n• Saldo em conta\n• 2 Cartões\n\n**Link gerado:** [https://www.mercadopago.com.br/checkout/v1/${interaction.user.username}](${payment_url})\n\n**Assim que pagar, abra um ticket ou chame um adm no privado**`)
   .setFooter(`Você tem 15 minutos para pagar.`)
    
    interaction.reply({ embeds: [link] });
    
        console.log(response.body.id)

id.set(`${interaction.user.id}.produ`, `${response.body.id}`)
        
}).catch(function (error) {
    console.log(error);
});

let idcard = id.get(`${interaction.user.id}.produ`)
        
const cart = setInterval(function () {
          
      const time2 = setTimeout(function () {
          console.log('Loop.')
      clearInterval(cart);
      }, 900000)
        
mercadopago.payment.get(idcard).then(function(payment) {
  const status = payment.status;

  if (status === 'approved') {
    db3.set(`${data_id}.status`, `Processando`)
  } else {
    console.log('Pagamento ainda não foi aprovado');
  }
}).catch(function(error) {
  console.error('Erro ao consultar o pagamento:', error);
});
    
}, 10000)
    
                        }

                                                       if (interaction.customId === 'qrcode') {
                                            
                                                                
     const embed1 = new Discord.MessageEmbed()
                                                         .setDescription(`\`\`\`Pague com Outras Formas de Pagamento.\`\`\`\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n**<:relogio:1141398569107075213>・Pagamento Expira em:** <t:${unixTimestamp}:f>・(<t:${unixTimestamp}:R>)`)
                                                         .setFooter(`ID da compra: ${data_id}`)
                                                         .setColor(db.get(`${interaction.customId}.color`))
                                                         .setThumbnail("https://cdn.discordapp.com/attachments/1109637133888671795/1135913769403424809/LogoQuinteira.png")
                                                         
                                const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:pix:1115828248446771313>")
                                       .setLabel("Chave Aleatória")
                                       .setStyle('PRIMARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:qrcode:1109700948424671242>")
                                       .setLabel("QR Code")
                                       .setStyle('SUCCESS'),
                                 )
                                 .addComponents(
                                  new Discord.MessageButton()
                                    .setCustomId('bb')
                                    .setEmoji("<:mp:1136044531985432596>")
                                    .setLabel("Outras Formas de Pagamento")
                                    .setStyle('SECONDARY'),
                              )
                                  .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarboton')
                           .setLabel('')
                           .setEmoji('<:recusou:1140942612484853821>')
                           .setStyle('DANGER'),
                     );
                     
                                row.components[1].setDisabled(true)
                                              
                                                         
                                    msg.edit({ embeds: [embed1], components: [row] })
                                                        
                                                        const embed = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)}・QR Code`)
                                                          .setDescription(`Aponte a camera do seu dispositivo para o qrcode e escaneio-o, feito isso basta efetuar o pagamento e aguardar alguns segundos.`)
                                
                                                          .setImage("attachment://payment.png")
                                                          .setColor(db.get(`${interaction.customId}.color`))
                                                          .setFooter("Sistema verifica seu pagamento em menos de 5 segundos.")
                                                        interaction.reply({ embeds: [embed], files: [attachment] })
                                                       }
                                                    
                                                       if (interaction.customId === 'cancelarpix') {
                                                           
const embedentrega = new Discord.MessageEmbed()
.setDescription(`\`\`\`Compra Pendente: Seu pagamento esta pendente, fique ciente que todos os superiores podem ver que você abriu um carrinho! Caso tenha alguma dúvida, abra um ticket..\`\`\`\n<:id:1115828237512216647>**・Comprador:** ${interaction.user.tag}\n**<a:planet:1140941075196944454>・Produto:**, \`${eprod.nome}\`\n**<:Caixa:1141013432510992444>・Quantidade:** \`${quantidade1}\`\n**<:Dinheiro:1141014757978148894>・Valor:** \`R$${precoalt}\`\n<:IDD:1141015458124922973>・**ID da compra:** ${data_id}`)
.setColor('RED')
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                                           
                        const cancelado = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Compra Cancelada`)
                        .setDescription(`<:recusou:1140942612484853821> **・O membro ${interaction.user.username}** (${interaction.user.id}) **fechou o carrinho do produto que ele tentou comprar:** ${eprod.nome} `)
                        
                        const channel = client.channels.cache.get(config.get(`logs_staff`))
                        
                        channel.send({ embeds: [cancelado] })
                                                         clearInterval(lopp);
                                                         clearInterval(venda)
                                                         db3.delete(`${data_id}`)
                                                         if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                        }
                                                      })
                                                    })
                                                  }).catch(function (error) {
                                                    console.log(error)
                                                    });
                             }, 5000)
                                                  }
                                              })
                                             })
                                           }
                                         })
                                       })
                                       
  ///////////
                                       
                                     })
                                   }
                                 }
                               })

