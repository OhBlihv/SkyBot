//Loaded Addons/Commands
const plugins = {};

/*
 * commands['help'] => func
 */
const commands = {};

function getCommands()
{
	return Object.keys(commands);
}

function executeCommand(command, message, args)
{
	commands[command](message, message.author.id, message.channel.id, message.author, command, args);
}

function addCommand(command, delegateFunction)
{
	commands[command] = delegateFunction;
}

/*
 * Available Methods
 */

module.exports =
{
	addCommand,
	getCommands,
	executeCommand
};


//Initialize Plugins

{
	let fs = require('fs');

	console.log("Initializing Plugins...");

	let files;

	try
	{
		files = fs.readdirSync("plugins/");
	}
	catch(err)
	{
		console.log("Setting up plugins folder...");

		let mkdirp = require('mkdirp');

		mkdirp("plugins/");

		try
		{
			files = fs.readdirSync("plugins/");
		}
		catch(err2)
		{
			console.log("Unable to set up plugins folder: " + err2);
			return;
		}
	}

	for(let idx = 0;idx < files.length;idx++)
	{
		let fileName = files[idx];

		if(!fileName.endsWith(".js"))
		{
			console.log("Skipping file " + fileName + " (Not a plugin)");
			continue;
		}

		console.log("Loading Plugin: " + fileName);

		try
		{
			let plugin = require("./plugins/" + fileName);

			plugins[fileName] = plugin;
		}
		catch(err)
		{
			console.log("Unable to load plugin '" + fileName + "'.");
			console.log(err);
		}
	}

	let pluginCount = Object.keys(plugins).length;
	console.log("Loaded " + pluginCount + " plugin" + (pluginCount === 1 ? "" : "s") + ".");
}