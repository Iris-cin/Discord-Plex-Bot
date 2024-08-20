const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'refresh'
  },
  async execute(message) {
    try {
      // Fonction pour rafraîchir la section de la bibliothèque Plex
      async function refreshPlexLibrary() {
        // Remplace ces IDs par les IDs de tes sections de bibliothèque
        const sectionIds = [2, 1]; // IDs des sections à rafraîchir
        const promises = sectionIds.map(id =>
          axios.post(`${process.env.PLEX_SERVER_URL}/library/sections/${id}/refresh`, null, {
            headers: { 'X-Plex-Token': process.env.PLEX_TOKEN }
          })
        );
        await Promise.all(promises);
      }

      // Exécuter l'actualisation
      await refreshPlexLibrary();

      // Création d'un embed pour confirmer l'actualisation
      const embed = new EmbedBuilder()
        .setTitle('🔄 Actualisation des Bibliothèques Plex')
        .setDescription('✅ Les bibliothèques Plex ont été rafraîchies avec succès.')
        .setColor('#2ECC71')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' }); // Remplace par l'URL de l'icône de ton choix

      // Envoi de l'embed
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'actualisation des bibliothèques Plex :', error);

      // Création d'un embed pour les erreurs
      const embed = new EmbedBuilder()
        .setTitle('🔄 Actualisation des Bibliothèques Plex')
        .setDescription('❌ Une erreur est survenue lors de l\'actualisation des bibliothèques Plex.')
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter({ text: 'Bot Plex', iconURL: 'https://example.com/icon.png' }); // Remplace par l'URL de l'icône de ton choix

      // Envoi de l'embed
      await message.channel.send({ embeds: [embed] });
    }
  }
};
