const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "acesso", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        let membro = args[0];
        let data = args[1];
        let r = message.guild.roles.cache.get("1025986995970908170");
        let user = message.guild.members.cache.get(membro.tag);
        let canal = client.channels.cache.get("1063437917390909480");

        let embed = new Discord.MessageEmbed()
        .setColor('008DFF')
        .setImage("https://media.discordapp.net/attachments/1059340373970923541/1062468557201485844/images_28.jpg")
        .setThumbnail("https://media.discordapp.net/attachments/996244505101598860/1048331445334192179/coroa.png")
        .setAuthor({ name: message.guild.name + "・Acesso Mercado Pago", iconURL: message.guild.iconURL() })
        .setDescription(`
        > <:owner:1109637023825928273>・**Membro com Acesso:**
        > __${membro}__
        > 
        > 🔗・**Recebeu Acesso para:**
        > __Utilizar o sistema de resgates com MP__
        > 
        > <:tempo:1062561982995239033>・**Expira em:**
        > __${data}__
        > 
        > <:estoque:1061554208089845810>・**Canal Liberado**
        > [__Resgate__](https://discord.com/channels/1058618124196401172/1063437669864059000)`)
               
        canal.send({ embeds: [embed] })
        
                let embed2 = new Discord.MessageEmbed()
        .setColor('2ecc71')
        .setDescription(`<:cupom:1115828278620606515> **・Acesso concedido**`)
        
        canal.send({ embeds: [embed2] })

    }
}