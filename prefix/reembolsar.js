const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const dbP = new JsonDatabase({ databasePath:"./databases/myJsonPay.json" });
const mercadopago = require("mercadopago")
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "reembolsar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:no:1115828260920635392>・Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
    
    mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      
                                                      
      const id = args[0]
      db3.set(`${id}.status`, `Reembolsado`)
      message.reply(`<:mp:1136044531985432596> **・Compra reembolsada com sucesso!**`)
      
    var refund = { payment_id: `${id}` };
    mercadopago.refund.create(refund).then(result => { }).catch(function (error) { interaction.user.send({ content: `<a:pretobranco:1115827538263023757>・Houve algum erro durante a transação ou esse pagamento foi pago por comandos, tente novamente!` }) });
    }
}