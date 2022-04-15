// [start] config {{{
require('dotenv').config()

const {
  Client,
  Intents,
  Permissions
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const PREFIX = "!"
// [end] config }}}

// [start] resolveCmdName {{{
function resolveCmdName(message, cmdName, targetUser, args) {
  const role = message.guild.roles.cache.find(role => role.name === `${args[1]}`);
  // TODO: Implement (un/succesfull) result rule-check
  switch (cmdName) {
    case ("kick"):
      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        return message.reply('You do not have permissions to use that command.')
      targetUser.kick().catch(console.error)
      message.reply(`${targetUser} was kicked out succesfully.`)
      break;
    case ("ban"):
      // TODO: Test it out
      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        return message.reply('You do not have permissions to use that command.')
      targetUser.ban().catch(console.error)
      message.reply(`${targetUser} was banned succesfully.`)
      break;
    case ("addRole"):
      // Example usage:
      // !addRole @user Role Name
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        return message.reply('You do not have permissions to use that command.')
      if (!targetUser.roles.cache.has(role.id)) {
        targetUser.roles.add(role).catch(console.error);
        message.reply(`Added role ('${role}') to a ${targetUser}`)
      } else {
        message.reply(`${targetUser} already has '${role}' role`)
      }
      break;
    case ("removeRole"):
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        return message.reply('You do not have permissions to use that command.')
      if (targetUser.roles.cache.has(role.id)) {
        targetUser.roles.remove(role).catch(console.error)
        message.reply(`Removed role ('${role}') from a ${targetUser}`)
      } else {
        message.reply(`${targetUser} does not have '${role}' role`)
      }
      break;
    default:
      message.channel.send(`${cmdName} not implemented yet.`)
      break;
  }
}
// [end] resolveCmdName }}}

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

    // TODO:
    // [DONE] 1. REFACTORING: usage of a function to get CMD_NAME rather than case/if..elseif
    //  2. REFACTORING: (export/import) modules usage to develop bot behavior

    const target = message.mentions.members.first() // Provides an user (to handle with) object
    // console.log(args)
    // console.log(CMD_NAME)
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id)
      resolveCmdName(message, `${CMD_NAME}`, targetMember, args)
    } else {
      message.channel.send("Failed.")
    }
  }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)