function sendMessage(target, message)
{
	target.send(message).catch(console.error);
}

module.exports =
{
	sendMessage
};