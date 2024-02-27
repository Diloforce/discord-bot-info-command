// RENAME FILE NAME TO AS WISHED, I do this with all my command's so I know what it is from just a glance.
// Start.js
// Lists good information for starting players
// 27/02/2024

const Discord = require("discord.js")
exports.run = (client, message, args) => {
  const commands = client.commands.map(command=> command.name).join(",")
  const embed = new Discord.MessageEmbed()
  .setTitle(`Here is your information ${message.author.tag}!`)
  .setAuthor(message.author.username, message.author.displayAvatarURL()) 
  .setThumbnail("INSERT-LINK")
   .setDescription("If you are stuck please do not hesistate to ask!")  
   .addField("**LIST EXAMPLE**:",
   "1. Click [HERE](cave.yannordi.fr).\n" +
   "2. \n" +
   "4. \n" +
   "5\n" + // To add more list, do "CONTENT\n" + to end it, just do not add the \n +.
   "6/End") // This is the end of the list.
   .addField(":", ".") // The , in this changes it from the TITLE to the CONTENT
   // To add more fields do .addField("TITLE", "CONTENT")
   .addField("More Information:", "CONTENT") // This is optinal but I like to do this.
   .setFooter("")
   .setColor("WHIE") // Set the colour/color of your embed, it can be seen on the side. There is a list of Colours in the README.md
  message.channel.send({embeds:[embed]})
}

exports.name = "COMMAND-NAME" // IMPORTANT!!!
