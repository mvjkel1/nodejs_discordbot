// [start] config {{{
require('dotenv').config()
const { Client, Intents, Permissions } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const PREFIX = "!"
// [end] config }}}

client.on('ready', () => {
  console.log(`${client.user.username} has logged in! :)`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const CMD_NAME = 
      message.content
             .trim()
             .substring(PREFIX.length)
             .split(/\s+/)

    const target = message.mentions.members.first()
    // TODO
    // 1. REFACTORING: usage of a function to get CMD_NAME rather than case/if..elseif
    // 2. REFACTORING: (export/import) modules usage to develop bot behavior
    
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id)
      if (CMD_NAME === 'kick') {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
          return message.reply('You do not have permissions to use that command.')
        targetMember.kick()
        message.channel.send(`Done.`)
      } 
      // else if (CMD_NAME === 'role') {
      //   
      // }
    } else {
      message.channel.send(`Failed.`)
    }
  }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)