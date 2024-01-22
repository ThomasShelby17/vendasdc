const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "permdel",
    run: async(client, message, args) => {
      const user = args[0]
      if (message.author.id !== config.get(`owner`)) return message.reply(`<a:no:1115828260920635392>・Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<a:no:1115828260920635392>・Você não selecionou ninguem!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:no:1115828260920635392>・Você não pode selecionar duas pessoas de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(user !== `${perms.get(`${user}_id`)}`) return message.reply(`<a:no:1115828260920635392>・Essa pessoa não tem permissão ainda!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(isNaN(args)) return message.reply(`<a:no:1115828260920635392>・Você só pode adicionar IDs!`)
        
      message.reply(`<a:sim:1115828258676678747>・Usuário removido!`)
      perms.delete(`${user}_id`)
    }
}