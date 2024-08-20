# Plex Discord Bot

Ce projet est un bot Discord conçu pour interagir avec Plex, permettant de gérer et d'afficher des informations sur vos films et séries Plex directement depuis Discord.

## Configuration

Avant d'exécuter le bot, assurez-vous de :

1. **Obtenir un Token Discord** : Créez un bot sur le [portail des développeurs Discord](https://discord.com/developers/applications) et récupérez le token de votre bot.
2. **Obtenir un Token Plex** : Trouvez un token d'accès pour votre serveur Plex en suivant [ce guide](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/).
3. **Configurer l'URL du Serveur Plex** : Définissez l'adresse de votre serveur Plex, par exemple `http://127.0.0.1:32400`.

## Commandes

### `!plex`

**Description** : Cette commande affiche une liste des films et des séries actuellement disponibles dans votre bibliothèque Plex.

**Détails** :
- Le bot récupère les données des sections de films et de séries de votre serveur Plex.
- Les titres des films et des séries sont présentés dans un seul embed stylisé, avec des emojis pour améliorer la lisibilité.
- En cas d'erreur, un message d'erreur est envoyé pour informer de tout problème rencontré lors de la récupération des données.

### `!status`

**Description** : Vérifie l'état de votre serveur Plex et informe si le serveur est en ligne et fonctionne correctement.

**Détails** :
- Le bot envoie une requête pour vérifier la disponibilité du serveur Plex.
- Si le serveur est accessible, un message de confirmation est envoyé.
- En cas d'erreur (par exemple, si le serveur est hors ligne), un message d'erreur est fourni.

### `!refresh`

**Description** : Force Plex à actualiser ses bibliothèques pour inclure tout nouveau contenu ajouté (films, séries, etc.).

**Détails** :
- Cette commande envoie une requête au serveur Plex pour rafraîchir les sections de la bibliothèque spécifiées.
- Vous pouvez configurer les IDs des sections à rafraîchir selon vos besoins.
- Un message de confirmation est envoyé si l'actualisation est réussie.
- En cas de problème, un message d'erreur est envoyé.

## Utilisation

1. **Démarrer le Bot** : Lancez le bot avec la commande appropriée dans votre terminal ou environnement de développement.
2. **Utiliser les Commandes** :
   - Tapez `!plex` dans un canal Discord où le bot est actif pour afficher les films et les séries de votre bibliothèque Plex.
   - Tapez `!status` pour vérifier l'état de votre serveur Plex.
   - Tapez `!refresh` pour forcer le rafraîchissement des bibliothèques Plex.

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des suggestions ou souhaitez améliorer le bot, ouvrez une *pull request* ou signalez des problèmes via les issues sur GitHub.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
