# Cité du jeu vidéo, Twitter scraper

## Les API twitter:

Il en existe 4:

* TfW: Twitter for websites: «quickly and easily integrate very basic Twitter functions» sur le site web.
* Search API: «allow a user to query for Twitter content». Ce sont des requêtes légères.
* REST API: «building application that leverages core Twitter objects» (utilisateur, avatar, followers, etc.)
* Streaming API: «data intensive needs. If you're looking to build a data mining product or are interested in analytics research».

Source: https://dev.twitter.com/start

## Limites:

*Search API* ou la *Streaming API*. La *Search API* est destinée à effectuer des recherches rapides, mais les corpus sont réduits je pense, voir la rapidité des serveurs. Plutôt centré sur les productions utilisateurs pas utilisateurs. Cette API est idéale pour les applications mobiles, à connexions lentes, réduites.

La *Streaming API* est beaucoup plus robuste mais nécessite de pouvoir effectuer des connexion HTTP persistantes et maintenues (bonne connexion Internet). D'autre part, «If you're currently developing on the Search API, and find that your application is being rate-limited or you just have aggressive querying needs, then you should be moving over to the Streaming API». En fait, «The Streaming API results are a superset of the Search API result».

Je pense qu'il est plus intéressant pour nous de partir sur une base de *Streaming API*, bien que les limites soient les suivantes:

* sur les données récupérables: «Statuses created by protected accounts and all direct messages are non-public and are currently not available via the Streaming API, but are available on User Streams and Site Streams».
* sur les limites de fréquences de connexions: 
* sur le corpus: Twitter filtre les corpus de twits accessible via son API. Par exemple «frequent and repetitious status updates may, in some instances, and in combination with other metrics, result in a different status quality score for a given account», comptes suspendus, etc.

Source: https://dev.twitter.com/docs/streaming-api/concepts

## Précautions d'emploi

L'utilisation de la *Streaming API* nécessite un compte utilisateur pour créer des requêtes.

«Each account may create only one standing connection to the Streaming API. Subsequent connections from the same account may cause previously established connections to be disconnected. Excessive connection attempts, regardless of success, will result in an automatic ban of the client's IP address. Continually failing connections will result in your IP address being blacklisted from all Twitter access».

«The Streaming API service is fairly lenient. Clients are not banned for a few dozen bungled connections here and there. But, if you code anything in a while loop that also doesn't have a sleep, you will eventually be banned for some small number of minutes. If you get banned repeatedly, all access to Twitter will be cut off for an indeterminate period of time.»

Source: https://dev.twitter.com/docs/streaming-api/concepts#access-rate-limiting

Conclusion: si on fait attention au login et au mot de passe, une mise à jour des données toutes les 5 ou 10 minutes est absolument faisable, même s'il y a beaucoup de résultats et que la requête met plusieurs secondes à donner sa réponse.

## Méthodes

En général:

«Placing long parameters in the URL may cause the request to be rejected for excessive URL length. Use a POST request header parameter to avoid long URLs.»
