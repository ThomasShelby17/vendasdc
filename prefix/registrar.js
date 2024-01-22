const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonUser.json" });
const saldo = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "registrar",
    run: async(client, message, args) => {
      const user = message.author.id
      if(user === `${perms.get(`${user}_id`)}`) return message.reply(`❌・Você ja esta registrado`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 10000));
        
      message.reply(`<a:sim:1140943382798159913>・Registrado com sucesso!`)
      saldo.set(`${user}.saldo`, `0`)
      perms.set(`${user}_id`, user)
    }
}