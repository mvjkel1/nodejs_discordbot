function kickUser(member) {
  if (member) {
    member
      .kick()
      .then((member) => message.channel.send(`${member} was kicked.`))
      .catch((err) => message.channel.send('I do not have permissions to kick that user.'))
  } else {
    message.channel.send('Member not found')
  }
}

module.exports = { kickUser };
// exports.kickUser = kickUser