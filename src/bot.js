// [start] config {{{
require('dotenv').config()

const {
  Client,
  Intents,
  Permissions,
  Invite
} = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const PREFIX = "!"
// [end] config }}}

// TODO: async/await usage
// [start] resolveCmdName - user handler {{{
function resolveCmdName(message, cmdName, targetUser, args) {
  const role = message.guild.roles.cache.find(role => role.name === `${args[1]}`)
  // TODO: Implement (un/succesfull) result rule-check
  switch (cmdName) {
    case ("kick"):
      // Example usage:
      // !kick @user
      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        return message.reply('You do not have permissions to use that command.')
      targetUser.kick()
        .then((targetUser) => {
          message.reply(`${targetUser} has been kicked out successfully.`)
        })
        .catch(() => {
          message.reply("Something went wrong.")
        })
      message.reply(`${targetUser} was kicked out succesfully.`)
      break;
    case ("ban"):
      // TODO: Test it out
      //       then add 'Example usage'
      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        return message.reply('You do not have permissions to use that command.')
      targetUser.ban()
        .then(targetUser => {
          message.reply(`${targetUser} has been banned succesfully.`)
        })
        .catch(() => {
          message.reply("Something went wrong.")
        })
      break;
    case ("addRole"):
      // Example usage:
      // !addRole @user roleName
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        return message.reply('You do not have permissions to use that command.')
      if (!targetUser.roles.cache.has(role.id)) {
        targetUser.roles.add(role)
          .then((targetUser) => {
            message.reply(`Successfully added '${role}' role to the ${targetUser}.`)
          })
          .catch(() => {
            message.reply("Something went wrong.")
          });
        message.reply(`Added '${role}' role to a ${targetUser}.`)
      } else {
        message.reply(`${targetUser} already has '${role}' role.`)
      }
      break;
    case ("removeRole"):
      // Example usage:
      // !removeRole @user roleName
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        return message.reply('You do not have permissions to use that command.')
      if (targetUser.roles.cache.has(role.id)) {
        targetUser.roles.remove(role)
          .then((targetUser) => {
            message.reply(`Successfully removed '${role}' role from the ${targetUser}`)
          })
          .catch(() => {
            message.reply("Something went wrong.")
          })
        message.reply(`Removed '${role}' role from a ${targetUser}`)
      } else {
        message.reply(`${targetUser} does not have '${role}' role`)
      }
      break;
    case ("createInvitationLink"):
      // TODO
      // message.channel.createInvite({
      //   unique: true
      // }).then(() => {
      //   message.reply(`I've created you an invite: https://discord.gg/" + ${Invite.code}`)
      // })
      break;
    default:
      message.channel.send(`${cmdName} not implemented yet.`)
      break;
  }
}
// [end] resolveCmdName - user handler }}}

// [start] resolveCmdName - voice/text channel handler (add/remove/edit)
// function resolveCmdName()
// [end] resolveCmdName - voice/text channel handler


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