import { Client } from 'discordjs';
import { logger } from '../deps.ts';
import { CommandHandler } from './CommandHandler.ts';
import { BotEvents } from './botEvents.ts';
import { GasCommand } from './commands/gas.ts';


class Bot {
  client: Client = new Client({ intents: 8 });
  commandHandler: CommandHandler = new CommandHandler();
  gasCommand: GasCommand = new GasCommand();
  botEvents: BotEvents = new BotEvents(this.client, this.commandHandler, this.gasCommand);

  login(): void {
    this.client.login(Deno.env.get("BOT_TOKEN"));
  }
}

logger.info("Starting bot...");
// Create a new Bot instance and login
new Bot().login();
