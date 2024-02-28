# discord-bot-info-command
## **MAKE YOUR OWN INDEX.JS!!**

This is a single command, there is no index.js/app.js made. I will make examples for a command handler below :)

```js
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

### __COLOURS__ 

- DEFAULT: #000000
- WHITE: #FFFFFF
- AQUA: #1ABC9C
- GREEN: #2ECC71
- BLUE: #3498DB
- YELLOW: #FFFF00
- PURPLE: #9B59B6
- LUMINOUS_VIVID_PINK: #E91E63
- FUCHSIA: #EB459E
- GOLD: #F1C40F
- ORANGE: #E67E22
- RED: #E74C3C
- GREY: #95A5A6
- NAVY: #34495E
- DARK_AQUA: #11806A
- DARK_GREEN: #1F8B4C
- DARK_BLUE: #206694
- DARK_PURPLE: #71368A
- DARK_VIVID_PINK: #AD1457
- DARK_GOLD: #C27C0E
- DARK_ORANGE: #A84300
- DARK_RED: #992D22
- DARK_GREY: #979C9F
- DARKER_GREY: #7F8C8D
- LIGHT_GREY: #BCC0C0
- DARK_NAVY: #2C3E50
- BLURPLE: #7289DA
- GREYPLE: #99AAB5
- DARK_BUT_NOT_BLACK: #2C2F33
- NOT_QUITE_BLACK: #23272A


## INDEX.JS EXAMPLE ! !
```js
const fs = require("fs");
const express = require("express");
const path = require("path"); 
const app = express();
const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const token = config.token;

app.listen(3000, () => {
  console.log("Bot is online!");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  allowedMentions: { parse: ["users"] }
});

// insert the command handler here, 

client.login(token);
```

## CONFIG.JSON EXAMPLE ! !
```json
{
"token": "",
}

```
This example is for if you choose to use the command handler provided, if you do not clarify your prefix in your index.js, you can do that in the config.json by adding another field 

```json
{
"token": "",
"prefix": ""
}
```
## Install dependancies ! !

Do 
```
npm install discord.js
```

If it doesn't work, and you've tried fixing it yourself, it might be the version of discord.js you can run. Try doing 
```
npm install discord.js@13
```
