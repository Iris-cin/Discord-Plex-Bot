const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'plex'
  },
  async execute(message) {
    try {
      // Remplace ces valeurs par les ID réels de tes sections Plex
      const MOVIES_SECTION_ID = 1; // ID de la section Films 
      const SHOWS_SECTION_ID = 2;  // ID de la section Séries

      // Fonction pour récupérer les données de Plex
      async function fetchPlexData(endpoint) {
        const response = await axios.get(`${process.env.PLEX_SERVER_URL}${endpoint}`, {
          headers: { 'X-Plex-Token': process.env.PLEX_TOKEN }
        });
        return response.data;
      }

      // Récupération des films et séries
      const movies = await fetchPlexData(`/library/sections/${MOVIES_SECTION_ID}/all`);
      const shows = await fetchPlexData(`/library/sections/${SHOWS_SECTION_ID}/all`);

      if (!movies || !shows) {
        return message.channel.send('Il y a eu une erreur lors de la récupération des données Plex.');
      }

      // Formatage des titres des films et des séries
      const movieTitles = movies.MediaContainer.Metadata.map(movie => `🎬 ${movie.title}`).join('\n') || 'Aucun film trouvé.';
      const showTitles = shows.MediaContainer.Metadata.map(show => `📺 ${show.title}`).join('\n') || 'Aucune série trouvée.';

      // Création d'un seul embed stylisé
      const embed = new EmbedBuilder()
        .setTitle('📚 Bibliothèque Plex')
        .setDescription(`
          **Films :**\n${movieTitles}\n\n
          **Séries :**\n${showTitles}
        `)
        .setColor('#3498db')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' }); // Remplace par l'URL de l'icône de ton choix

      // Envoi de l'embed
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la récupération des données Plex :', error);
      message.channel.send('Il y a eu une erreur lors de la récupération des données Plex.');
    }
  }
};
