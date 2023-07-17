import { CommandInteraction, EmbedBuilder } from 'discord.js';
import axios from 'axios';
import { config as dotenvConfig } from  'dotenv';

dotenvConfig();

export class GasCommand {
  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const gasPrices = await this.getGasPrices();

      if (gasPrices.length === 0) {
        await interaction.reply({ embeds: [this.buildEmbed("Error retrieving gas prices. Please try again later.")], ephemeral: true });
        return;
      }

      const embed = this.buildEmbed("")
        .setTitle("⛽ Current gas prices")
        .addFields(
          { name: "Slow 🐢 | >10 minutes", value: gasPrices[0] + " Gwei", inline: false },
          { name: "Average 🚶 | 3 minutes", value: gasPrices[1] + " Gwei", inline: false },
          { name: "Fast ⚡ | 15 seconds", value: gasPrices[2] + " Gwei", inline: false },
        );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Failed to reply to the interaction:", error);
    }
  }

  async getGasPrices(): Promise<number[]> {
    try {
      const params = {
        module: 'gastracker',
        action: 'gasoracle',
        apikey: process.env.apikey,
      };

      const response = await axios.get('https://api.etherscan.io/api', { params });

      if (response.status === 200 && response.data && response.data.status === '1') {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = response.data.result;
        return [SafeGasPrice, ProposeGasPrice, FastGasPrice].map(Number);
      }
      return [];
    } catch (error) {
      console.error("Error getting gas prices:", error);
      return [];
    }
  }

  private buildEmbed(description: string) {
    const embed = new EmbedBuilder().setColor("Aqua");
  
    if (description) {
      embed.setDescription(description);
    }
  
    return embed;
  }
}
