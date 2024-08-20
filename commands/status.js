const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'status'
  },
  async execute(message) {
    try {
      // Fonction pour vérifier le statut du serveur Plex
      async function fetchPlexData(endpoint) {
        const response = await axios.get(`${process.env.PLEX_SERVER_URL}${endpoint}`, {
          headers: { 'X-Plex-Token': process.env.PLEX_TOKEN }
        });
        return response.data;
      }

      // Vérification du statut du serveur
      await fetchPlexData('/server');

      // Création de l'embed pour le statut du serveur
      const embed = new EmbedBuilder()
        .setTitle('Statut du Serveur Plex')
        .setDescription('✅ Le serveur Plex est en ligne et fonctionne correctement.')
        .setColor('#00FF00')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' }); // Remplace par l'URL de l'icône de ton choix

      // Envoi de l'embed
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la vérification du statut du serveur Plex :', error);

      // Création de l'embed pour les erreurs
      const embed = new EmbedBuilder()
        .setTitle('Statut du Serveur Plex')
        .setDescription('❌ Le serveur Plex semble hors ligne ou inaccessible.')
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' }); // Remplace par l'URL de l'icône de ton choix

      // Envoi de l'embed
      await message.channel.send({ embeds: [embed] });
    }
  }
};
