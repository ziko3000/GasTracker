import { Client, ActivityType, Interaction, CommandInteraction, PresenceData } from 'discord.js';
import { CommandHandler } from './CommandHandler';
import { GasCommand } from './commands/gas';

/**
 * Class handling bot events.
 * @constructor
 * @param {Client} client - The Discord.js Client instance.
 * @param {CommandHandler} commandHandler - The Command Handler instance.
 * @param {GasCommand} gasCommand - The Gas Command instance.
 */
export class BotEvents {
  client: Client;
  commandHandler: CommandHandler;
  gasCommand: GasCommand;

  constructor(client: Client, commandHandler: CommandHandler, gasCommand: GasCommand) {
    this.client = client;
    this.commandHandler = commandHandler;
    this.gasCommand = gasCommand;

    // Set up bot event listeners
    this.client.on('ready', () => this.onReady());
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isCommand()) {
        await this.commandHandler.handleCommand(interaction as CommandInteraction);
      }
    });
  }

  /**
   * Handles the 'ready' event of the bot. Updates bot presence, registers commands, and schedules 
   * Fear & Greed Index data storing.
   * @return {Promise<void>}
   */
  async onReady(): Promise<void> {
    try {
      console.log(`Logged in as ${this.client.user!.tag}`);

      // Update bot presence and set up a periodic update every 30 seconds
      await this.updateBotPresence();
      setInterval(this.updateBotPresence.bind(this), 30000);

      // Register the slash commands to Discord
      await this.commandHandler.registerCommandsToDiscord(this.client);
      console.log('Slash commands registered successfully!');

      // Schedule the Fear & Greed Index data storing to run every 24 hours
    } catch (error: any) {
      console.error('Error during bot initialization:', error.message);
    }
  }

  /**
   * Updates the bot's presence with the latest Fear & Greed Index.
   * @return {Promise<void>}
   */
  async updateBotPresence(): Promise<void> {
    try {
      const gasPrices = await this.gasCommand.getGasPrices();
      if (gasPrices.length === 3) {
        const presenceData: PresenceData = {
          activities: [
            {
              name: `⚡Fast Gas: ${gasPrices[2]} Gwei | 🚶Average Gas: ${gasPrices[1]} Gwei | 🐢Slow Gas: ${gasPrices[0]} Gwei`,
              type: ActivityType.Watching,
            },
          ],
          status: 'online',
        };
        await this.client.user!.setPresence(presenceData);
        console.log('Bot presence updated.');
      } else {
        console.error('Failed to update bot presence: Invalid gas prices.');
      }
    } catch (error: any) {
      console.error('Error updating bot presence:', error.message);
    }
  }
}
