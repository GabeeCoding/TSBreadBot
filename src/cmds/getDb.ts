import * as Discord from "discord.js";
import * as db from "quick.db";

export const run = async (bot: Discord.Client, message: Discord.Message, args: string[], commands: Discord.Collection<string, any>): Promise<any> => {
    if(message.author.id !== "437332920881905686") return;
    let result = db.get(args[0]);
    console.log(typeof result)
    if(result) message.channel.send(result.toString());
}

export const help = {
    name: "getdb",
    desc: "get something from db",
    aliases: [],
    enabled: true
};