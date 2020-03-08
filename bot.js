var auth = require('./auth.json');
var moment = require('moment-timezone')
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

client.on('message', message => {
  if(message.author.bot) return;

  console.log(message.content);
  
  var mention = false;
  if(message.mentions.users.size > 0)
  {
    //check if mention contains app client id
    if(message.mentions.users.first().id == auth.id)
    {
      mention = true;
    }
  }

  if (!message.content.includes("&") && !mention) return;

  var args = message.content.slice(message.content.search("&")+1).split(' ');
  var command = args.shift().toLowerCase();
  if(mention)
  {
    command = 'deyoh';
  }

  if (command === 'ping') {
	  // send back "Pong." to the channel the message was sent in
	  message.channel.send('Pong.');
  }
  else if (command === 'deyohtime' || command === 'deyoh') {
    var timezone = "America/Punta_Arenas";
    if(args[1] != null)
    {
      zoneOption = args[1];
      zones = moment.tz.names();
      zones.forEach(name => {
        if(name.toLowerCase().includes(zoneOption.toLowerCase()))
        {
          zoneOption = name;
        }
      });
      timezone = zoneOption;
    }

    if (args[0] == 'now' || args[0] == null) {
       message.channel.send(moment().tz(timezone).format("h:mmA"))
     } else {
       var timeArg = args[0]
       message.channel.send(moment(timeArg, "h:mmA").tz(timezone).format("h:mmA"))
     }
  }
});