import Discord from 'discord.js';

export const registerCommands = (commands) => {
    const collection = new Discord.Collection();

    Object.entries(commands).forEach(([name, command]) => {
        console.log(`Registering command '${name}'.`);
        collection.set(command.name, command);
    });

    return collection;
};