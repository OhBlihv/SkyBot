
/*
 * Libraries / Configuration
 */

//Library
const Discord = require('discord.js');

//Configuration
const auth = require('./auth.json');
const conf = require('./config.json');

// Initialize Discord Bot before plugins are loaded.
const bot = new Discord.Client();

module.exports =
{
	bot
};

const plugins = require("./plugins.js");

/*
 *
 */

process.on('uncaughtException', (err) =>
{
	console.log(err);
	throw new Error(err + "\nUnable to continue execution. Shutting Down...");
});

//

bot.login(auth.token);

bot.on('ready', function (evt)
{
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.user.username + ' - (' + bot.user.id + ')');

    bot.user.setPresence(
    {
        game:
        {
            name: conf["game-name"]
        }
    });
});

//

bot.on('message', function(message)
{
    let userID = message.author.id;
    let channelID = message.channel.id;

    console.log(message.author.username + "->" + message.content);

    if (message.content.substring(0, 1) === '!')
    {
        let args = message.content.substring(1).split(' ');
        const command = args[0];

        args = args.splice(1);

	    {
	    	let commandList = plugins.getCommands();
	    	console.log(commandList);
	    	for(let idx = 0;idx < commandList.length;idx++)
		    {
		    	let registeredCommand = commandList[idx];
			    console.log(command + " === " + registeredCommand + " -> " + (command === registeredCommand));
			    if(command === registeredCommand)
			    {
				    plugins.executeCommand(registeredCommand, message, args);
				    return;
			    }
		    }
	    }
    }
});