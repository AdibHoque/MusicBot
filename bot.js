const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const invites = {};

const wait = require('util').promisify(setTimeout);

const config = require('./config.json');

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

client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
    const args = msg.content.split(' ');
     
    if(msg.content.startsWith(`${PREFIX}helpmusic`)){
        var embedhelp = new Discord.RichEmbed()
            .setTitle(`MultiverseMusic Commands`)
            .addField("mv!play [YouTube Link/Playlist]", "Usage: `mv!play` Description: To play See The YouTube Linke And playlist.", false)
            .addField("mv!play [Suchbegriff(e)]", "Usage: `mv!play`<song name> Description: To play Music.", false)
            .addField("mv!skip", "Usage: `mv!skip` Description: To skip music.", false)
            .addField("mv!stop", "Usage: `mv!stop` Description: To Bot disconnected.", false)
            .addField("mv!song", "Usage: `mv!song` Description: To Check The Current playing song.", false)
            .addField("mv!queue", "Usage: `mv!queue` Description: To Check The Queue List.", false)
            .setColor([226, 50, 41])
            .setThumbnail(client.user.avatarURL)
            return msg.channel.sendEmbed(embedhelp);
    }
    return undefined;
});

 
client.login(process.env.BOT_TOKEN);
