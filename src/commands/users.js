
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("users")
		.setDescription("Gets all data from the user table."),

	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		// Ensure the interaction is deferred if the fetching might take a while
		await interaction.deferReply();

		try {
			// Fetch all user data from the database
			const results =
				await interaction.client.mysql.query("SELECT * FROM user");

			console.log(results);

			// Create an embed to display the user data
			const embed = new EmbedBuilder()
				.setTitle("User Data")
				.setDescription("All data from the user table.")
				.setColor("#5865f4");

			// Loop through the results and add fields to the embed
			results[0].forEach((user) => {
                embed.addFields({
                  name: `${user.id} - ${user.username}`,
                  value: `\`${user.password}\``,
                }); 
              });

			// Send the embed with the user data
			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.editReply(
				"There was an error while executing this command!"
			);
		}
	},
};
