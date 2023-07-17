import { Client } from 'discord.js';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './CommandHandler';
import { FearGreedIndexAPI } from './api';
import { BotEvents } from './botEvents';


// Load environment variables
dotenvConfig();

/**
 * Represents the Discord Bot.
 * @constructor
 */
class Bot {
  /**
   * The Discord.js client instance.
   * @type {Client}
   */
  client: Client = new Client({ intents: 8 });

  /**
   * The Fear and Greed Index API instance.
   * @type {FearGreedIndexAPI}
   */
  api: FearGreedIndexAPI = new FearGreedIndexAPI;

  /**
   * The command handler instance.
   * @type {CommandHandler}
   */
  commandHandler: CommandHandler = new CommandHandler();

  /**
   * The database instance.
   * @type {Database}
   */
  /**
   * The bot events instance.
   * @type {BotEvents}
   */

  /**
   * The bot service instance.
   * @type {BotService}
   */

  /**
   * Logs in the Bot using the token from environment variables and starts storing Fear & Greed Index.
   * @return {void}
   */
  login(): void {
    this.client.login(process.env.BOT_TOKEN);
    // this.botService.storeFearGreedIndex();
  }
}

// Create a new Bot instance and login
new Bot().login();
