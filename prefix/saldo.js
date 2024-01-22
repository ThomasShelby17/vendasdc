const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbS = new JsonDatabase({ databasePath:"./databases/myJsonUser.json" });
const mercadopago = require('mercadopago');

module.exports = {
    name: "saldo", 
    run: async(client, message, args) => {
        
         const saldo = db.get(`${message.author.id}.saldo`)
         
        if(message.author.id !== `${dbS.get(`${message.author.id}_id`)}`) return message.reply(`❌・Você não está registrado! Utilizando o comando de \`Registrar\``).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
                             
    mercadopago.configure({
    access_token: `${config.get(`access_token`)}`
});


let preference = {
    items: [
        {
            title:`${message.author.username} - Saldo`,
            unit_price: 5,
            quantity: 1
        }
    ]
};


mercadopago.preferences.create(preference)
    .then(function (response) {
        
        const payment_url = response.body.init_point;
        const saldo = db.get(`${message.author.id}.saldo`)
                             
    const embed = new Discord.MessageEmbed()
   .setColor(`${config.get(`color`)}`)
   .setTitle(`${config.get(`title`)}・Sistema de saldo`)
   .setDescription(`__Adicione saldo utilizando o botão abaixo ou compre com algum administrador.__`)
   .addField(`<:config:1115837571918995576>・User:`, `${message.author.username}`)
   .addField(`<:carteira:1115827529559842876>・Saldo:`, `||${saldo}|| Reais`)
   .addField(`<:mp:1136044531985432596>・Adicione saldo:`, `[Mercado Pago](${payment_url})`)
   
   const row = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('cinco')
               .setLabel(`Seu Saldo`)
               .setDisabled(true)
               .setEmoji(`<:carteira:1115827529559842876>`)
               .setStyle('SUCCESS'),
        );
   
    message.channel.send({ embeds: [embed], components: [row] })
    
    })
        
}
}