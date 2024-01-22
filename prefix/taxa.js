const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "taxa",
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor("00a6ff")
        .setFooter(`Mercado Pago`)
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
        const embed = new Discord.MessageEmbed()
        .setTitle(`Checkouts`)
        .addField(`Melhor Negócios` , `Configure quando ter o dinheiro das suas futuras vendas disponível de acordo com os custos mais adequados para os seus negócios.`, false)
        .addField(`Mudar em quais funções:` , `Crédito, saldo no Mercado Pago, Mercado Crédito e dinheiro disponível`, false)
        .setDescription(`[Mude aqui](https://www.mercadopago.com.br/costs-section/release-options/edit/merchant-services)`)
        .setColor("#0a6ff")
        .setFooter(`Mercado Pago`)
        .setThumbnail("https://media.discordapp.net/attachments/1010581408739233852/1024673004761907290/unknown.png?width=453&height=408")
        .setImage("https://media.discordapp.net/attachments/1010581408739233852/1024672011789815908/unknown.png?width=777&height=407")
        
message.reply({embeds: [embed]})
        
    }
}
