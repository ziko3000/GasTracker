import { SlashCommandBuilder } from 'discord.js';

const gasCommand = {
    data: new SlashCommandBuilder()
        .setName('gas')
        .setDescription('Get Ethereum gas prices.')
        .setDMPermission(false),

    async execute(interaction, client) {
        try {
            const gasPrices = await client.getGasPrices();

            if (!gasPrices.length) {
                throw new Error('Error retrieving gas prices. Please try again later.');
            }

            const embed = client.buildEmbed()
                .setTitle('⛽ Current gas prices')
                .addFields(
                    { name: 'Slow 🐢 | >10 minutes', value: `${gasPrices[0]} Gwei`, inline: false },
                    { name: 'Average 🚶 | 3 minutes', value: `${gasPrices[1]} Gwei`, inline: false },
                    { name: 'Fast ⚡ | 15 seconds', value: `${gasPrices[2]} Gwei`, inline: false },
                );

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            interaction.reply({ embeds: [client.buildEmbed(error.message)], ephemeral: true });
        }
    },
};

export default gasCommand;
