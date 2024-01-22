const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "ajuda",
    run: async(client, message, args) => {        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('retornar')
            .setEmoji('<:vlt:1020930289528209438>')
            .setLabel('')
            .setDisabled(true)
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('SLALS')
            .setLabel(' Página 1 ')
            .setDisabled(true)
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('proxima')
            .setEmoji('<:next:1015727899082510498>')
            .setLabel('')
            .setDisabled(false)
            .setStyle('PRIMARY'),
        )

        
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)}・Meus Comandos`)
          .setDescription(`
<a:planeta:1141397827617050624>・ajuda \`\`\`\nVeja meus comandos \`\`\`
<a:planeta:1141397827617050624>・painel \`\`\`\nTudo para iniciar o bot \`\`\`
<a:planeta:1141397827617050624>・botinfo \`\`\`\nVeja minhas info\`\`\`
<a:planeta:1141397827617050624>・info \`\`\`\nVeja info de uma compra\`\`\`
<a:planeta:1141397827617050624>・perfil \`\`\`\nVeja seu perfil\`\`\`
<a:planeta:1141397827617050624>・status \`\`\`\nVeja os status de vendas\`\`\`
<a:planeta:1141397827617050624>・rendimentos \`\`\`\nVeja seus rendimentos\`\`\`
<a:planeta:1141397827617050624>・pegar \`\`\`\nVeja um produto entregue\`\`\`
<a:planeta:1141397827617050624>・pagar \`\`\`\nSete um id para pago\`\`\`
<a:planeta:1141397827617050624>・criarcupom \`\`\`\nCrie um cupom\`\`\`
<a:planeta:1141397827617050624>・configcupom \`\`\`\nGerencie um cupom\`\`\`
<a:planeta:1141397827617050624>・limpar \`\`\`\nApague as mensagens do chat\`\`\`
<a:planeta:1141397827617050624>・produtos \`\`\`\nVem todos id dos Produtos\`\`\`
<a:planeta:1141397827617050624>・anunciar \`\`\`\nenvia uma embed por perguntas\`\`\`
<a:planeta:1141397827617050624>・taxa \`\`\`\nmuda a taxa do mercado pago\`\`\`
<a:planeta:1141397827617050624>・rank \`\`\`\nmostra o rank dos seus clientes\`\`\`
<a:planeta:1141397827617050624>・criados \`\`\`\nmostra os (gift,cupons,produtos) criados\`\`\`
<a:planeta:1141397827617050624>・gift\`\`\`\ngera um gift card de Produtos\`\`\`
<a:planeta:1141397827617050624>・resgatar\`\`\`\nresgata um gift card\`\`\`
<a:planeta:1141397827617050624>・ligados\`\`\`\nliga ou desliga os sistemas\`\`\`
<a:planeta:1141397827617050624>・produtos\`\`\`\nmostra todos os produtos cadastrados\`\`\`
<a:planeta:1141397827617050624>・close\`\`\`\nfecha um carrinho bugado\`\`\`
<a:planeta:1141397827617050624>・quantidade\`\`\`\nverifica quantos estoques tem em cada produto.\`\`\`
`)
          .setTimestamp()
          .setFooter(`Pagina 1/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", })
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) { return; }
            if (interaction.customId === 'retornar') {
              interaction.deferUpdate();
              row.components[1].setLabel(' Página 1 ')
              row.components[0].setDisabled(true)
              row.components[2].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)}・Meus Comandos`)
                .setDescription(`
<a:planeta:1141397827617050624>・ajuda \`\`\`\nVeja meus comandos \`\`\`
<a:planeta:1141397827617050624>・painel \`\`\`\nTudo para iniciar o bot \`\`\`
<a:planeta:1141397827617050624>・botinfo \`\`\`\nVeja minhas info\`\`\`
<a:planeta:1141397827617050624>・info \`\`\`\nVeja info de uma compra\`\`\`
<a:planeta:1141397827617050624>・perfil \`\`\`\nVeja seu perfil\`\`\`
<a:planeta:1141397827617050624>・status \`\`\`\nVeja os status de vendas\`\`\`
<a:planeta:1141397827617050624>・rendimentos \`\`\`\nVeja seus rendimentos\`\`\`
<a:planeta:1141397827617050624>・pegar \`\`\`\nVeja um produto entregue\`\`\`
<a:planeta:1141397827617050624>・pagar \`\`\`\nSete um id para pago\`\`\`
<a:planeta:1141397827617050624>・criarcupom \`\`\`\nCrie um cupom\`\`\`・configcupom \`\`\`\nGerencie um cupom\`\`\`
<a:planeta:1141397827617050624>・limpar \`\`\`\nApague as mensagens do chat\`\`\`
<a:planeta:1141397827617050624>・produtos \`\`\`\nVem todos id dos Produtos\`\`\`
<a:planeta:1141397827617050624>・anunciar \`\`\`\nenvia uma embed por perguntas\`\`\`
<a:planeta:1141397827617050624>・taxa \`\`\`\nmuda a taxa do mercado pago\`\`\`
<a:planeta:1141397827617050624>・rank \`\`\`\nmostra o rank dos seus clientes\`\`\`
<a:planeta:1141397827617050624>・criados \`\`\`\nmostra os (gift,cupons,produtos) criados\`\`\`
<a:planeta:1141397827617050624>・gift\`\`\`\ngera um gift card de Produtos\`\`\`
<a:planeta:1141397827617050624>・resgatar\`\`\`\nresgata um gift card\`\`\`
<a:planeta:1141397827617050624>・ligados\`\`\`\nliga ou desliga os sistemas\`\`\`
<a:planeta:1141397827617050624>・produtos\`\`\`\nmostra todos os produtos cadastrados\`\`\`
<a:planeta:1141397827617050624>・close\`\`\`\nfecha um carrinho bugado\`\`\`
<a:planeta:1141397827617050624>・quantidade\`\`\`\nverifica quantos estoques tem em cada produto.\`\`\`
`)
                .setTimestamp()
                .setFooter(`Pagina 1/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
            }
             
            if (interaction.customId === 'proxima') {
              interaction.deferUpdate();
              row.components[1].setLabel(' Página 2 ')
              row.components[2].setDisabled(true)
              row.components[0].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)}・Meus Comandos`)
                .setDescription(`
<a:planeta:1141397827617050624>・criar\`\`\`\nCrie um anuncio\`\`\`
<a:planeta:1141397827617050624>・setar\`\`\`\nSete um anuncio\`\`\`
<a:planeta:1141397827617050624>・config\`\`\`\nGerencie um anuncio\`\`\`
<a:planeta:1141397827617050624>・estoque\`\`\`\nGerencie um estoque\`\`\`
<a:planeta:1141397827617050624>・configbot\`\`\`\nConfigura o bot\`\`\`
<a:planeta:1141397827617050624>・configcanais\`\`\`\nConfigura os canais\`\`\`
<a:planeta:1141397827617050624>・configstatus\`\`\`\nConfigura os status\`\`\`
<a:planeta:1141397827617050624>・permadd\`\`\`\nAdicione um administrador\`\`\`・
<a:planeta:1141397827617050624> • donoadd\`\`\`\nAdicione um dono\`\`\`
<a:planeta:1141397827617050624>・permdel\`\`\`\nRemova um administrador\`\`\`
<a:planeta:1141397827617050624>・donodel\`\`\`Remova um dono do bot\`\`\`
<a:planeta:1141397827617050624>・setavatar\`\`\`\nmuda o avatar do bot\`\`\`
<a:planeta:1141397827617050624>・gerarkey\`\`\`\ncria key para um cargo\`\`\`
<a:planeta:1141397827617050624>・resgatarkey\`\`\`\nresgata um cargo\`\`\`
<a:planeta:1141397827617050624>・quantidade\`\`\`\nmostra a quantidade de cada estoque\`\`\`
<a:planeta:1141397827617050624>・tempo\`\`\`\nedita o tempo de pagamento\`\`\`
<a:planeta:1141397827617050624>・addsaldo\`\`\`\nadiciona saldo a um usuario: !saldo <id da pessoa> <valor>\`\`\`
<a:planeta:1141397827617050624>・saldo\`\`\`\nverifica seu saldo\`\`\`
<a:planeta:1141397827617050624>・delsaldo\`\`\`\nremove todo saldo do usuario pelo id\`\`\`
<a:planeta:1141397827617050624>・registrar\`\`\`\nse registra para utilizar os sistemas de saldo\`\`\`
<a:planeta:1141397827617050624>・excluir\`\`\`\nDeleta um produto pelo id\`\`\`
<a:planeta:1141397827617050624>・reembolsar\`\`\`\nReembolsa uma venda pelo id\`\`\`
<a:planeta:1141397827617050624>・pagamento\`\`\`\nPainel de configurações de saldo\`\`\`
<a:planeta:1141397827617050624>・cores\`\`\`\nAltera a cor do botão de comprar\`\`\`
<a:planeta:1141397827617050624>・personalizar\`\`\`\nPersonaliza a embed de venda\`\`\`
`)
                .setTimestamp()
                .setFooter(`Pagina 2/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
              }
            })
          }
        }