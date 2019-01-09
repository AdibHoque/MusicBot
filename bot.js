const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const invites = {};

const wait = require('util').promisify(setTimeout);

const client = new Client({ disableEveryone: true});

const PREFIX = config.prefix;

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
 console.log('Alive')
  wait(1000);
  
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {

    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const inviter = client.users.get(invite.inviter.id);

    const logChannel = member.guild.channels.find(channel => channel.name == "★彡-welcome-彡★");
      
    logChannel.send(`<@${member.user.id}> **joined**; Invited By **${inviter.username}** (**${invite.uses}** Invites)`);
  });
});


client.login(process.env.BOT_TOKEN);
