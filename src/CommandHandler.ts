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
   * Represents a command handler for a Discord Bot.
   * @constructor
   */
  export class CommandHandler {
    /**
     * Map of Bot commands.
     * @type {Map<string, BotCommand>}
     */
    commands: Map<string, BotCommand>;

    /**
     * @constructs CommandHandler instance and registers the commands.
     */
    constructor() {
      this.commands = new Map<string, BotCommand>();

      this.registerCommand('help', 'Get help about the bot and its commands', (interaction) => new HelpCommand().execute(interaction));
      this.registerCommand('gas', 'Get Ethereum gas prices.', (interaction) => new GasCommand().execute(interaction));

    }

    /**
     * Registers a command to the Bot.
     * @param {string} name - The name of the command.
     * @param {string} description - The description of the command.
     * @param {(interaction: CommandInteraction) => Promise<void>} execute - The function to execute when the command is called.
     * @return {void}
     */
    registerCommand(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>) {
      this.commands.set(name, { name, description, execute });
    }

    /**
     * Registers all commands to Discord.
     * @param {Client} client - The Discord.js client instance.
     * @return {Promise<void>}
     */
    async registerCommandsToDiscord(client: Client): Promise<void> {
      const commandBuilders = Array.from(this.commands.values()).map(
        ({ name, description }) => new SlashCommandBuilder().setName(name).setDescription(description).toJSON()
      );

      const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
      await rest.put(
        Routes.applicationCommands(process.env.APPLICATION_ID!),
        { body: commandBuilders }
      );
    }

    /**
     * Handles a command interaction.
     * @param {CommandInteraction} interaction - The command interaction instance.
     * @return {Promise<void>}
     */
    async handleCommand(interaction: CommandInteraction): Promise<void> {
      const command = this.commands.get(interaction.commandName);
      if (command) {
        await command.execute(interaction);
      } else {
        console.error(`Command not found: ${interaction.commandName}`);
      }
    }
  }
