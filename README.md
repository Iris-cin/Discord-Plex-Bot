# Plex Discord Bot

Ce projet est un bot Discord qui interagit avec Plex pour afficher des informations sur les films, les séries, et rafraîchir les bibliothèques. Ce bot utilise `discord.js` pour l'intégration Discord et `axios` pour les appels à l'API Plex.

## Configuration

Avant de commencer, assure-toi d'avoir les éléments suivants :

1. **Token Discord** : Créé un bot sur le [portail des développeurs Discord](https://discord.com/developers/applications) et récupère le token de ton bot.
2. **Token Plex** : Obtiens un token d'accès pour ton serveur Plex en suivant [ce guide](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/).
3. **URL du serveur Plex** : L'adresse de ton serveur Plex, par exemple `http://127.0.0.1:32400`.

## Installation

1. Clone le dépôt :

    ```bash
    git clone https://github.com/ton-utilisateur/plex-discord-bot.git
    cd plex-discord-bot
    ```

2. Installe les dépendances :

    ```bash
    npm install
    ```

3. Crée un fichier `.env` pour stocker les variables d'environnement :

    ```dotenv
    DISCORD_TOKEN=ton_token_discord
    PLEX_TOKEN=ton_token_plex
    PLEX_SERVER_URL=http://127.0.0.1:32400
    ```

## Commandes

### 1. `!plex`

Affiche une liste des films et séries dans ta bibliothèque Plex.

```javascript
// commands/plex.js
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'plex'
  },
  async execute(message) {
    try {
      async function fetchPlexData(endpoint) {
        const response = await axios.get(`${process.env.PLEX_SERVER_URL}${endpoint}`, {
          headers: { 'X-Plex-Token': process.env.PLEX_TOKEN }
        });
        return response.data;
      }

      const movies = await fetchPlexData('/library/sections/1/all');
      const shows = await fetchPlexData('/library/sections/2/all');

      const movieTitles = movies.MediaContainer.Metadata.map(movie => `🎬 ${movie.title}`).join('\n') || 'Aucun film trouvé.';
      const showTitles = shows.MediaContainer.Metadata.map(show => `📺 ${show.title}`).join('\n') || 'Aucune série trouvée.';

      const embed = new EmbedBuilder()
        .setTitle('📚 Bibliothèque Plex')
        .setDescription(`
          **Films :**\n${movieTitles}\n\n
          **Séries :**\n${showTitles}
        `)
        .setColor('#3498db')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' });

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la récupération des données Plex :', error);
      const embed = new EmbedBuilder()
        .setTitle('📚 Bibliothèque Plex')
        .setDescription('❌ Il y a eu une erreur lors de la récupération des données Plex.')
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' });

      await message.channel.send({ embeds: [embed] });
    }
  }
};
