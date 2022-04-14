
require('dotenv').config()

const { Client, Intents, Permissions } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const kickUser = require('./kickUser')

const PREFIX = "!"

client.on('ready', () => {
  console.log(`${client.user.username} has logged in! :)`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = 
      message.content
             .trim()
             .substring(PREFIX.length)
             .split(/\s+/)
    if (CMD_NAME === 'kick') {
      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        return message.reply('You do not have permissions to use that command.')
      if (args.length === 0) 
        return message.reply('Please provide an ID')
      const member = message.guild.members.cache.get(args[0]);
      kickUser(member)
    }
  }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)