import * as Discord from "discord.js";
import * as fs from "fs";
import config from "./config";

const bot = new Discord.Client();
var commands = new Discord.Collection<string, any>()

fs.readdir(`${__dirname}/cmds/`, {encoding: "utf-8"}, (e, files) => {
    let unsuccessfullMessage = "-- Commands failed to load --";
    if(e) {
        console.error(e);
        console.log(unsuccessfullMessage);
        return;
    }
    console.log("-- Beginning command loading --");
    console.log(files);
    let allFiles = files.filter(file => file.endsWith(".js"));
    if(allFiles.length <= 0) {
        console.log("Commands not found, or no commands");
        console.log(unsuccessfullMessage);
        return;
    }
    allFiles.forEach((f, i) => {
        i++;
        const fileRequire = require(`./cmds/${f}`);
        if(fileRequire.help.enabled === false) return;
        if(fileRequire.help.aliases) fileRequire.help.aliases.forEach(alias => commands.set(alias, fileRequire));
        commands.set(fileRequire.help.name, fileRequire);
        console.log(`Command ${i} (${f}) has been loaded successfully`);
    });
    console.log("-- Commands successfully loaded --");
});

bot.once("ready", () => {
    console.log("-- Bot is online --");
    bot.user.setActivity({type: "WATCHING", name: "bread"});
});

bot.on("message", message => {
    if(message.author.bot) return;
    let args = message.content.split(" ").slice(1);
    let cmd = message.content.split(" ")[0];
    let cmdNoPrefix = cmd.slice(config.prefix.length);
    let commandToExec = commands.get(cmdNoPrefix);
    if(commandToExec) commandToExec.run(bot, message, args, commands);
}).login(process.env.TOKEN);