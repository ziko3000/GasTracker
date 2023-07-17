import fs from 'fs';
import path from 'path';

export default function loadCommands(client) {
    const commandsPath = path.resolve('commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = import(path.join(commandsPath, file));
        client.commands.set(command.data.name, command);
    }
}
