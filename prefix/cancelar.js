const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const axios = require('axios');

module.exports = {
    name: "cancelar",
    run: async(client, message, args) => {
    
            if(!args[0]) return message.reply(`<a:planeta:1141397827617050624>・Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[1]) return message.reply(`<a:planeta:1141397827617050624>・Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
    axios.get(`https://spacefama.com/api/v2?action=cancel&order=${args[0]}&key=cDtMeUC2YUFfIdPlsekWNwZZLWGaF2zdEIDVyCVeuEktrXrayP4hm3p01xKy`).then(async res => {
    
    data = res.data
    
    message.reply(`<a:load:1141016935576895658> **・Verificando seus dados...**`)
        
        let texto = `${data.ok}`;
    texto = texto.replace("false", "Cancelamento do pedido recusado");
    texto = texto.replace("true", "Cancelamento do pedido com sucesso");
    
    const embed = new Discord.MessageEmbed()
    
    .setTitle(`Painel SMM・Gerenciamento`)
    .setColor(`GREEN`)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`Cancelamento de Pedido`, client.user.displayAvatarURL())
    .setDescription(`<:settings:1141741111770099883> **・${texto}**`)
    
    message.channel.send({ embeds: [embed] })
        
    })
    }
}