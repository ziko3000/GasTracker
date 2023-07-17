import { Client, ActivityType, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI } from './api';
import { CommandHandler } from './CommandHandler';
import { GasCommand } from './commands/gas';
import { config as dotenvConfig } from  'dotenv';
dotenvConfig();

export class BotEvents {
  client: Client;
  commandHandler: CommandHandler;
  gasCommand: GasCommand;

  constructor(client: Client, commandHandler: CommandHandler) {
    this.client = client;
    this.commandHandler = commandHandler;
    this.gasCommand = new GasCommand();

    this.client.on('ready', () => this.onReady());
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isCommand()) {
        await this.commandHandler.handleCommand(interaction as CommandInteraction);
      }
    });
  }

  async onReady(): Promise<void> {
    console.log(`Logged in as ${this.client.user!.tag}`);
    this.updateBotPresence();
    setInterval(this.updateBotPresence.bind(this), 30000);

    try {
      await this.commandHandler.registerCommandsToDiscord(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
    
    setInterval(async () => {
      try {
        console.log('stored successfully');
      } catch (err) {
        console.error('Failed to store', err);
      }
    }, 86400000);
  }

  async updateBotPresence(): Promise<void> {
    try {
      const gasPrices = await this.gasCommand.getGasPrices();
      this.client.user!.setPresence({
        activities: [
          {
            name: `⚡Fast Gas: ${gasPrices[2]} Gwei | 🚶Average Gas: ${gasPrices[1]} Gwei | 🐢Slow Gas: ${gasPrices[0]} Gwei`,
            type: ActivityType.Watching,
          },
        ],
        status: 'online',
      });
      console.log('Bot presence updated.');
    } catch (error) {
      console.error('Failed to update bot presence:', error);
    }
  }
}
