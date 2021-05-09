import Discord from 'discord.js';
import dotenv from 'dotenv';
import { store } from './store';
import * as commands from './commands';
import { registerCommands } from './util/registerCommands';

const { prefix } = require('./config.json');

dotenv.config();

const client = new Discord.Client();
client.commands = registerCommands(commands);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    const [commandName, ...args] = message.content.slice(prefix.length).trim().split(/ +/);

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (err) {
        console.log(err);
    }
});

store.subscribe(() => {
    console.log('redux event fired...');
    console.log(JSON.stringify(store.getState()));
});

client.login(process.env.TOKEN);