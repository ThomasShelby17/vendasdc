module.exports = {
  name: "teste",
  description: "Veja se o bot está online",
    options: [
    {
      name: 'teste',
      description: 'escreva teste',
      type: 'STRING',
      required: true,
    },
  ],
        run: async (client, interaction) => {
  
    interaction.reply({ content: "Estou ativo", ephemeral: true });
     
  }
}
