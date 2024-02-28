
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle("Commands")
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setDescription("You can use all the commands below!")
        .addFields(
            { name: "Information Commands", value: "`(prefix)start` - Good information for beginners.\n`" }, // Add more commands in a similar format
        )
        .setColor("#0099ff") // You can find more color codes in the README.md or use hexadecimal color codes.
        .setFooter({ text: "Server Name" }); // Replace "Server Name" with your server's name

    message.channel.send({ embeds: [embed] });
};

exports.name = "help"; // The command name that users will use to access this information
