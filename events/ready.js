import { REST, Routes, ActivityType } from 'discord.js';
import config from '../config.json';
import fs from 'fs';
import path from 'path';

const commands = [];
const commandsPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`${commandsPath}/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

async function updateStatus(client) {
    const gasPrices = await client.getGasPrices();
    client.user.setPresence({
        activities: [{
            name: client.config.activityMessage
                .replace(/%gas_fast%/g, gasPrices[2])
                .replace(/%gas_average%/g, gasPrices[1])
                .replace(/%gas_slow%/g, gasPrices[0]), 
            type: ActivityType.Watching 
        }],
        status: 'online',
    });
    setTimeout(() => updateStatus(client), 3 * 1000);
}

export const ready = {
    name: 'ready',

    async execute(client) {
        console.log('Discord Price Checker bot has started!');

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
            console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }

        updateStatus(client);
    }
};
