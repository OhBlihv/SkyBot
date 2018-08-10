const plugins = require("./../plugins.js");
const util = require("./../util.js");

plugins.addCommand("ping", function(message, command, args)
{
	util.sendMessage(message.channel, "Pong!");
});