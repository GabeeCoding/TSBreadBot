import * as Discord from "discord.js"

export const run = async (bot: Discord.Client, message: Discord.Message, args: string[], commands: Discord.Collection<string, any>): Promise<any> => {
    message.channel.send("works");
};

export const help = {
    name: "test",
    desc: "test command",
    aliases: [],
    enabled: true
};