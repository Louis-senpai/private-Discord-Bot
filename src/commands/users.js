const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('users')
        .setDescription('Gets all data from the user table.'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        // Ensure the interaction is deferred if the fetching might take a while
        await interaction.deferReply();

        try {
            // Fetch all user data from the database
            const results = await interaction.client.mysql.query('SELECT * FROM user');

            // Create an embed to display the user data
            const embed = new MessageEmbed()
                .setTitle('User Data')
                .setDescription('All data from the user table.')
                .setColor('BLUE');

            // Add fields to the embed for each user
            results.forEach(user => {
                embed.addField(user.username, `ID: ${user.id}, Email: ${user.username}`);
            });

            // Send the embed with the user data
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error while executing this command!');
        }
    },
};