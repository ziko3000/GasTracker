import { GatewayIntentBits } from 'discord.js';
import config from './config.json';
import CustomClient from './events/client.js';
import loadCommands from './events/loadCommands.js';
import loadEvents from './events/loadEvents.js';

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ],
});

client.config = config;
loadCommands(client);
loadEvents(client);

client.login(config.token);
