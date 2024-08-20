require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Configurations
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PLEX_TOKEN = process.env.PLEX_TOKEN;
const PLEX_SERVER_URL = process.env.PLEX_SERVER_URL;

// Initialisation du client Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Chargement des commandes
client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Événement de connexion du bot
client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

// Événement de message
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  
  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande :', error);
    message.channel.send('Il y a eu une erreur lors de l\'exécution de la commande.');
  }
});

// Connexion du bot
client.login(DISCORD_TOKEN);
