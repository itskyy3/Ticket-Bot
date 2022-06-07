//MODULES - DON'T TOUCH IT
const Discord = require('discord.js');
//MODULES - DON'T TOUCH IT
const client = new Discord.Client();
//MODULES - DON'T TOUCH IT
const fs = require('fs');
//MODULES - DON'T TOUCH IT
const disbut = require("discord-buttons")
//MODULES - DON'T TOUCH IT
disbut(client);
//MODULES - DON'T TOUCH IT
const { MessageButton, MessageActionRow } = require("discord-buttons")
//MODULES - DON'T TOUCH IT
const { MessageMenuOption, MessageMenu } = require("discord-buttons")

//PREFIX - IF U WANT YOU CAN CHANGE IT
var prefix = "tb!"

//TOKEN
client.login('your-token-goes-here')

//READY
client.on("ready", () => {
    console.clear()
    console.log(`Ready!`);
    client.user.setActivity('tb!open to create a open ticket\'embed', {
        type: 'PLAYING'
    });
});

//OPEN A TICKET EMBED
client.on("message", message =>{
    if(message.content === prefix + "open"){
        //DELETE THE MESSAGE
        message.delete()
        //EMBED
        var embedopen = new Discord.MessageEmbed()
        .setTitle("Open a Ticket")
        .addFields(
            {name: "Do you need some help?", value: "Don't worry!\nClick the button below and you will be help from the staff"}
        )
        
        //BUTTON
        var button = new disbut.MessageButton()
        .setLabel("Open a Ticket!")
        .setStyle("green")
        .setEmoji("🎫")
        .setID("open")

        //SEND TO THE CHANNEL
        message.channel.send(embedopen, button)
    }
})

//CLICKED BUTTONS
client.on("clickButton", button => {
    var logs = client.channels.cache.get("your-log-channel-id-goes-here")
    if (button.id == "open") {
        if (button.guild.channels.cache.find(canale => canale.topic == `User ID: ${button.clicker.user.id}`)) {
            button.reply.send("You can't open more than one ticket", true).catch(() => { })
            return
        }
        button.guild.channels.create(button.clicker.user.username, {
            type: "text",
            topic: `User ID: ${button.clicker.user.id}`,
            parent: "983744511853334608",
            permissionOverwrites: [
                {
                    id: button.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: button.clicker.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
            ]
        }).then(channel => {
            var closebutton = new disbut.MessageButton()
            .setLabel("Close")
            .setID("close")
            .setStyle("blurple")
            .setEmoji("❌")

            var openembed = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle("**Welcome***")
            .setDescription(`Welcome, ${button.clicker.user}\nPlease describe your problem and the staff will help you!`)

            channel.send(openembed, closebutton)
            button.reply.send("Your ticket is open!\n<#" + channel + ">", true)
                        
            var embed = new Discord.MessageEmbed()
            .setTitle("❓ Opened ticket")
            .setDescription(`Opened by: <@${button.clicker.id}>\n\nChannel: ${channel}`)
            .setColor("#FF0000")
            .setTimestamp()
            
            logs.send(embed)

        })
    }
    if(button.id == "close"){
        var closebutton = new disbut.MessageButton()
            .setLabel("Close")
            .setID("close")
            .setStyle("blurple")
            .setEmoji("❌")
            .setDisabled(true)

        var openembed = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle("**Welcome***")
            .setDescription(`Welcome, ${button.clicker.user}\nPlease describe your problem and the staff will help you!`)


        var deletebutton = new disbut.MessageButton()
            .setLabel("Delete")
            .setID("delete")
            .setStyle("red")
            .setEmoji("🗑")

        button.channel.setParent("983746407435493396")
        button.reply.send("The ticket was closed", true)
        button.channel.send(deletebutton)
        button.message.edit(openembed, closebutton)
        button.channel.setTopic("CLOSED")

        var embed = new Discord.MessageEmbed()
        .setTitle("❌ Closed ticket")
        .setDescription(`Closed by: <@${button.clicker.id}>\n\nChannel: #${button.channel.name}`)
        .setColor("#FF0000")
        .setTimestamp()
        
        logs.send(embed)
    }
    if(button.id === "delete"){
        button.channel.delete()
        var embed = new Discord.MessageEmbed()
        .setTitle("🗑 Deleted ticket")
        .setDescription(`Deleted by: <@${button.clicker.id}>\n\nChannel: #${button.channel.name}`)
        .setColor("#FF0000")
        .setTimestamp()
        
        logs.send(embed)
    }
})