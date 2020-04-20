const Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("|Dev By [V8] GForce|");
    console.log("Le bot a bien ete connecte")
});

const PREFIX = "*";

const EVERYONE = "@";

bot.on('guildMemberAdd', member => {

    let serverTag = member.guild.name
    const welcomechannel = member.guild.channels.find('id', '699004101563777106')
    const role = member.guild.roles.find("name", "New")    
    member.addRole(role)
    var embed = new Discord.RichEmbed()
    .setColor("#38ad15")
    .setDescription(`:white_check_mark: **Bienvenue** sur le discord '' ${serverTag} '' **<@${member.user.id}>**`)
    return welcomechannel.send({embed})
});

bot.on('guildMemberRemove', member => {

    let serverTag = member.guild.name
    const welcomechannel = member.guild.channels.find('id', '699004101563777106')
    var embed = new Discord.RichEmbed()
    .setColor("#38ad15")
    .setDescription(`:wave: **<@${member.user.id}>** viens de quitté le serveur ${serverTag}, **bye bye** !!!`)
    return welcomechannel.send({embed})
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var roleJoueur= member.guild.roles.find("name", "Membre")
    
    var roleMute = member.guild.roles.find("name", "Mute")
    
    var modlog = member.guild.channels.find("name", "log")
    
    var user = message.mentions.users.first();


    switch (args[0].toLowerCase()) {
            case "unmute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'exécuter cette commande.");
                if(!modlog) return message.reply("Il n'y a aucun salon log.");
            var member = message.mentions.members.first();
                if (message.mentions.users.size < 1) return message.reply("À qui dois-je retire la sanction: MUTE ?")
                    member.removeRole(roleMute)
                    message.channel.sendMessage(user.toString() + " a bien été unmute ?")
        
            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "UNMUTE")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Administrateur/Modérateur :", message.author.username)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0044ff")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - UNMUTE - BOT-Brotherhood par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('700158981707923457').sendMessage(":white_check_mark: Le membre " + user.username + " **a été unmute**.")
            break;
        
            case "mute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");  
            if (!reasontimed) return message.reply("Veuillez précisez la raison du mute.")
                var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: MUTE")
                message.channel.sendMessage(member.toString() + " a bien été mute. ?")
                member.addRole(roleMute)

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Action :", "Mute")
                .addField(":bust_in_silhouette: Utilisateur :", user.toString())
                .addField(":cop::skin-tone-3: Administrateur/Modérateur :", message.author.toString())
                .addField(":scroll: Raison :", reasontimed)
                .setColor("#0044ff")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - MUTE - BOT-Brotherhood par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('700158981707923457').sendMessage(":white_check_mark: Le membre " + user.username + " **a été mute** pour : " + reason);
            break;

            case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");
            if (reason.length < 1) return message.reply("Veuillez précisez la raison du kick.");
            if (message.mentions.users.size < 1) return message.reply("Pseudo incomplet.")
            message.guild.member(user).kick();
            message.channel.send(user.toString() + " a bien été kick ?")

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "KICK")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Administrateur/Modérateur :", message.author.username)
                .addField(":scroll: Raison : ", reason)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0044ff")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - KICK - BOT-Brotherhood par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('700158981707923457').sendMessage(":white_check_mark: Le membre " + user.username + " a été kick pour : " + reason);
       
            message.delete();
            break;

            case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");
            if (reason.length < 1) return message.reply("Veuillez précisez la raison du ban.");
            if (message.mentions.users.size < 1) return message.reply("Veuillez mentionné le membre à bannir.")
            
            message.guild.ban(user, 2);
            message.channel.send(user.toString() + " a bien été banni ?")

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "BAN")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Administrateur/Modérateur :", message.author.username)
                .addField(":scroll: Raison : ", reason)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0044ff")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - BAN - BOT-Brotherhood par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('700158981707923457').sendMessage(":white_check_mark: Le membre " + user.username + " a été banni pour: " + reason);
            
            message.delete();
            break;

            case "purge":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "PURGE")
                .addField(":cop::skin-tone-3: Administrateur/Modérateur :", message.author.username)
                .addField(":wastebasket: Message supprimé", messagecount)
                .addField(":clock10: Heure:", message.channel.createdAt)
                .addField(":scroll: Salon :", message.channel)
                .setColor("#0044ff")
                .setFooter("LOG - PURGE - BOT-Brotherhood par @GForceV8#5880")
                .setTimestamp()
            message.delete()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            break;

            case "modération":
            var embed = new Discord.RichEmbed()
                .addField(":rocket: *ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites !ban @(utilisateur) + (raison)")
                .addField(":door: *kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites !kick @(utilisateur) + (raison)")
                .addField(":wastebasket: *purge", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites !purge (nombredemessages)")
                .addField(":mute: *mute", "Cette commande permet de muté un utilisateur. Pour l'utiliser, faites .mute @(utilisateur) + (raison)")
                .addField(":loud_sound: *unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites .unmute @(utilisateur)")
                .addField(":busts_in_silhouette: *membres","Cette commande vous affiche le nombre de membre actuel **sur le serveur Discord**")
                .addField(":level_slider: *ping","Cette commande vous affiche le ping actuel **du bot**.")
                .setColor("#0044ff")
                .setFooter("Aide - Brotherhood by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici la liste des commandes du Bot-Brotherhood - By @GForceV8.")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;
		        	    
            case "unit":
            var embed = new Discord.RichEmbed()
                .addField("Groupe Unit", "https://units.arma3.com/unit/brotherhood-hl")
                .setColor("#3b9908")
                .setFooter("Unit - Brotherhood by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;

            case "brotherhood":
            message.channel.sendMessage("Le bot Brotherhood est en ligne.");
            message.delete();
            break;
		    
            case "uniterror":
            message.channel.sendMessage("Actuellement le site des **"units"** est en PLS donc il faudras attendre un moment pour les avoir .");
            message.delete();
            break;
		    
            case "membres":
            message.reply("Nous sommes actuellement " + (bot.users.size - 2) + " membres sur le **Brotherhood** !");
            message.delete();
            break;
		    
            case "ping":
            message.channel.sendMessage("BOT-Brotherhood a actuellement un ping de `" + bot.ping + " ms` ! ");
            message.delete();
            break;
		    
            default:
            message.channel.sendMessage(":x: Commande invalide. Fait !aide pour voir toutes les commandes disponibles !")
            message.delete();
        }
    });

	bot.login(process.env.TOKEN);
