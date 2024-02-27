# discord-bot-info-command
## **MAKE YOUR OWN INDEX.JS!!**

This is a single command, there is no index.js/app.js made. I will make examples for a command handler below :)

```
const LOG_CHANNEL_ID = 'INSERT-LOG-CHANNEL-ID';
const prefix = "INSERT-PREIFX"; //remove if prefix is already in config file.

client.commands = new Collection();

function loadCommands(commandPath) {
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
  }

  const subDirectories = fs.readdirSync(commandPath).filter(subDir => fs.statSync(path.join(commandPath, subDir)).isDirectory());

  for (const directory of subDirectories) {
    loadCommands(path.join(commandPath, directory));
  }
}

client.commands = new Collection();
loadCommands(path.join(__dirname, 'Commands'));

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);

    if (!command) {
      return message.channel.send({ content: "This command doesn't exist. Please use (HELP COMMAND) to find all commands." });
    }

    try {
      command.run(client, message, args);

      // Log command usage after successful execution
      logCommandUsage(message, commandName);

    } catch (error) {
      console.error('Error executing command:', error);
      message.channel.send({ content: 'An error occurred while executing the command.' });
    }
  }
});

function logCommandUsage(message, commandName) {
  const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!logChannel) return;
  const logEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Command Executed")
    .setDescription(`\`${commandName}\` was executed by ${message.author.tag}.`)
    .addField("Channel", message.channel.name, true)
    .addField("Time", new Date().toISOString(), true);
  logChannel.send({ embeds: [logEmbed] });
}
```


