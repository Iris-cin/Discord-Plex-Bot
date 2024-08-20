const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'findmovie'
  },
  async execute(message, args) {
    const query = args.join(' ');
    if (!query) return message.channel.send('Veuillez spécifier un titre de film.');

    try {
      const response = await axios.get(`${process.env.PLEX_SERVER_URL}/search?query=${encodeURIComponent(query)}&type=1`, {
        headers: { 'X-Plex-Token': process.env.PLEX_TOKEN }
      });
      const movies = response.data;
      const movieTitles = movies.MediaContainer.Metadata.map(movie => `🎬 ${movie.title}`).join('\n') || 'Aucun film trouvé.';
      
      const embed = new EmbedBuilder()
        .setTitle(`Résultats pour "${query}"`)
        .setDescription(movieTitles)
        .setColor('#FF0000')
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la recherche de film :', error);
      message.channel.send('Il y a eu une erreur lors de la recherche du film.');
    }
  }
};
