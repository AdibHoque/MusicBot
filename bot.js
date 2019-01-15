const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');

const client = new Discord.Client();

client.on('ready', () => {
 console.log('Alive');
});
});
	
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.find(ch => ch.name === '★彡-welcome-彡★');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://images.wallpaperscraft.com/image/black_background_red_color_paint_explosion_burst_9844_1920x1080.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#df009d';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
  
	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#21d4c7';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
});
	
client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
    const args = msg.content.split(' ');
     
    if(msg.content.startsWith(`mv!helpmusic`)){
        var embedhelp = new Discord.RichEmbed()
            .setTitle(`MultiverseMusic Commands`)
            .addField("mv!play [YouTube Link/Playlist]", "Usage: `mv!play` Description: To play See The YouTube Linke And playlist.", false)
            .addField("mv!play [Suchbegriff(e)]", "Usage: `mv!play`<song name> Description: To play Music.", false)
            .addField("mv!skip", "Usage: `mv!skip` Description: To skip music.", false)
            .addField("mv!stop", "Usage: `mv!stop` Description: To Bot disconnected.", false)
            .addField("mv!np", "Usage: `mv!np` Description: To Check The Current playing song.", false)
            .addField("mv!queue", "Usage: `mv!queue` Description: To Check The Queue List.", false)
            .addField("mv!volume", "Usage: `mv!volume` Description: To See Volume.", false)
            .addField("mv!volume [Wert]", "Usage: `mv!volume` Description: To Changes the volume level to the specified value.", false)
            .addField("mv!pause", "Usage: `mv!pause` Description: To pause The Current Playing Song.", false)
            .addField("mv!resume", "Usage: `mv!resume` Description: To Resume The Paused Song.", false)
            .setColor([226, 50, 41])
            .setThumbnail(client.user.avatarURL)
            return msg.channel.sendEmbed(embedhelp);
    }    
    if (msg.content.startsWith(`mv!jointest`)){
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
    return undefined;
});
});

client.login(process.env.BOT_TOKEN);
