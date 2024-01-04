const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insert')
    .setDescription('Inserts data into the database using a modal'),

  async execute(interaction) {
    // Create a modal
    const modal = new ModalBuilder()
      .setCustomId('insertModal')
      .setTitle('Insert Data');

    // Create text input components for the modal
    const fieldOneInput = new TextInputBuilder()
      .setCustomId('fieldOne')
      .setLabel('Field One')
      .setStyle(TextInputStyle.Short);

    const fieldTwoInput = new TextInputBuilder()
      .setCustomId('fieldTwo')
      .setLabel('Field Two')
      .setStyle(TextInputStyle.Short);

    // Add inputs to the modal
    const firstActionRow = new ActionRowBuilder().addComponents(fieldOneInput);
    const secondActionRow = new ActionRowBuilder().addComponents(fieldTwoInput);
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  },

  async modalSubmit(interaction) {
    // Get the values from the modal's inputs
    const fieldOneValue = interaction.fields.getTextInputValue('fieldOne');
    const fieldTwoValue = interaction.fields.getTextInputValue('fieldTwo');

    // Insert data into the database (this is a placeholder, replace with your actual database logic)
    const db = getDatabase(); // Function to get your database connection
    const insertQuery = 'INSERT INTO your_table (column1, column2) VALUES (?, ?)';
    db.run(insertQuery, [fieldOneValue, fieldTwoValue], function(err) {
      if (err) {
        return interaction.reply({ content: 'There was an error inserting the data.', ephemeral: true });
      }
      interaction.reply({ content: 'Data inserted successfully!', ephemeral: true });
    });
  }
};