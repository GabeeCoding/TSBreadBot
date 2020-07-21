import * as Discord from "discord.js";
import * as db from "quick.db";
import * as simplify from "../simplify";

export const run = async (bot: Discord.Client, message: Discord.Message, args: string[], commands: Discord.Collection<string, any>): Promise<any> => {
	if(!args[0]) return message.channel.send(`${message.author.toString()} => you need to specify the amount of bread to stock`);
	let ToStock = Number(args[0])
	if(isNaN(ToStock)) return message.channel.send(`${message.author.toString()} => the argument provided isn't a number`);
	if(!message.guild.roles.cache.get("Bread Stocker")){
		message.guild.roles.create({data: {hoist: false, name: "Bread Stocker", permissions: [], color: [240,209,160]}, reason: "bread bot needs this role"})
	}
	if(!message.member.roles.cache.get("Bread Stocker")){
		return message.channel.send(`${message.author.toString()} => you don't have the Bread Stocker role`);
	}
	simplify.initServer(message.guild.id);
	db.set(`servers.${message.guild.id}.stock`, db.get(`servers.${message.guild.id}.stock`) + ToStock);
	message.channel.send(`${message.author.toString()} => Stocked bread, current stock is now: ${db.get(`servers.${message.guild.id}.stock`)}`);
};

export const help = {
	name: "stock",
	desc: "Stock bread, requires 'Bread Stocker' role.",
	aliases: [],
	enabled: true
};