var auth = require('./auth.json');
var moment = require('moment-timezone')
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

client.on('message', message => {
	console.log(message.content);
  if (!message.content.includes("&") || message.author.bot) return;

  const args = message.content.slice(message.content.search("&")+1).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
	  // send back "Pong." to the channel the message was sent in
	  message.channel.send('Pong.');
  }
  else if (command === 'deyohtime' || command === 'deyoh') {
    if (args[0] == 'now') {
       message.channel.send(moment().tz("America/Punta_Arenas").format("h:mmA"))
     } else {
       var timeArg = args[0]
       message.channel.send(moment(timeArg, "h:mmA").tz("America/Punta_Arenas").format("h:mmA"))
     }
  }
});
