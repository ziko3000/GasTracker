import { Client } from 'discord.js';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './CommandHandler';
import { BotEvents } from './botEvents';
import { GasCommand } from './commands/gas';


dotenvConfig();


class Bot {
  client: Client = new Client({ intents: 8 });
  commandHandler: CommandHandler = new CommandHandler();
  gasCommand: GasCommand = new GasCommand();
  botEvents: BotEvents = new BotEvents(this.client, this.commandHandler, this.gasCommand);

  login(): void {
    this.client.login(process.env.BOT_TOKEN);
    // this.botService.storeFearGreedIndex();
  }
}

// Create a new Bot instance and login
new Bot().login();
