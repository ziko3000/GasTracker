import { Client, SlashCommandBuilder, REST, Routes, CommandInteraction } from 'discord.js';
import { HelpCommand } from './commands/help';
import { GasCommand } from './commands/gas';

/**
 * Interface for the Bot commands.
 */
interface BotCommand {
  name: string;
  description: string;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

/**
 * Class handling registration and execution of commands for the bot.
 */
export class CommandHandler {
  commands: Map<string, BotCommand>;

  constructor() {
    this.commands = new Map<string, BotCommand>();

    // Register commands
    this.registerCommand('help', 'Get help about the bot and its commands', (interaction) =>
      new HelpCommand().execute(interaction)
    );
    this.registerCommand('gas', 'Get Ethereum gas prices.', (interaction) => new GasCommand().execute(interaction));
  }

  /**
   * Registers a new command.
   * @param name - The name of the command.
   * @param description - The description of the command.
   * @param execute - The function to execute when the command is invoked.
   */
  registerCommand(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>) {
    this.commands.set(name, { name, description, execute });
  }

  /**
   * Registers the slash commands to Discord.
   * @param client - The Discord client instance.
   * @returns A Promise that resolves when the commands are successfully registered.
   */
  async registerCommandsToDiscord(client: Client): Promise<void> {
    try {
      const commandBuilders = Array.from(this.commands.values()).map(({ name, description }) =>
        new SlashCommandBuilder().setName(name).setDescription(description).toJSON()
      );

      const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
      await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID!), { body: commandBuilders });

      console.log('Slash commands registered successfully!');
    } catch (error: any) {
      console.error('Failed to register slash commands:', error.message);
    }
  }

  /**
   * Handles the execution of a command.
   * @param interaction - The CommandInteraction representing the command invocation.
   */
  async handleCommand(interaction: CommandInteraction): Promise<void> {
    try {
      const command = this.commands.get(interaction.commandName);
      if (command) {
        await command.execute(interaction);
      } else {
        console.error(`Command not found: ${interaction.commandName}`);
      }
    } catch (error: any) {
      console.error('Error handling command:', error.message);
    }
  }
}
