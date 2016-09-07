# GilliardPrj

## Buts
Le projet GilliardPrj sert à acquérir des données envoyées par une carte Arduino ayant différents 
capteurs sur le port série d'un systéme d'acquisition (PC) et de les pusher sur une BDD SQL configurées 
par un module npm externe (epfl-enac-gilliarddb --> [readme](https://github.com/epfl-enacit2/epfl-enac-GilliardDB "Lien vers le github epfl-enac-GilliardDB") du projet pour plus d'infos) mais avec des configs locales.

##Installation

* Récupérer le projet GilliardPrj avec tout ces fichiers puis à la racine du projet lancer une commande dans la console node(rechercher dans wîndows "node" et lancer "command prompt nodejs") (*au moins v6.2.0*) (avoir préinstaller NodeJS --> [téléchargements](https://nodejs.org/en/ "Lien vers l'installation de NodeJS") avant tout) 
```bash
$ npm install
```
Cette commande installera les modules nécessaires au bon fonctionnement du systéme d'acquisition.

* Si vous devez mettre en place la BDD je vous invite à suivre ces quelques étapes ;
 * Vous devez tout d'abord télécharger [Wamp](http://www.wampserver.com/ "Lien pour le téléchargement de Wamp") ou tout autre module faisant office d'un serveur Web ayant MySQL
 * Démarrer Wamp en lançant l'appli puis dans son menu (en bas à droite dans le menu masqué) clic sur l'image du "W" puis séléctionner "phpMyAdmin"
 * Entrer les identifiants (de base username = root et laisser blanc le password) et cliquer dans l'onglet "SQL" en haut 
 * Dans la boite de texte entrer le script [SQL](https://github.com/epfl-enacit2/epfl-enac-GilliardDB/blob/master/docs/GilliardDbModels.sql "Lien vers le script SQL de la BDD")
 * Désormais la BDD a été crée et un user avec alors pour la prochaine étape (configs) vous pouvez mettre comme username : insertValues et password : pass

* Une fois les modules nécessaires installés il vous faut modifier le fichier *configs_sample.json* dans le dossier *configs* en suivant les instructions des commentaires, une fois fait il vous faut renommer ce fichier *configs.json* et supprimer les commentaires.

## Utilistation

Lancer le programme ! Et là 2 options s'offrent à vous ;

*  à l'aide du module pm2 (relance le programme  s'il déclenche une erreur,le relance au moins 20x avant de déclarer une erreur bloquante) dans ce cas lancer la ligne 
    ```bash
    $ npm start
    ```
    Et 
    ```bash
    $ npm stop
    ```
    pour arrêter le programme.
    Le programme sera relancé si des erreurs surviennent, les logs seront de toutes façons dans un fichier dans le repertoire "logs" si les options de logging sont sur "console". Les options de logging sur "fichier" créera un fichier dans logs aussi mais l'option "" ne fera aucun log.

    Et afin de voir quels sont les processus actuels du programme sur votre machine faites :
    ```bash
    $ npm test
    ```
  * Pour plus d'options telles que le monitoring à distance p.ex. lancer 
    ```bash
    $ npm install pm2 -g
    ```
    ensuite pour linker et faire du monitoring à distance créer un [compte](https://app.keymetrics.io/#/register "Register for KeyMetrics") puis créer un "bucket" pui suiver les instructions
    ```bash
    $ pm2 link {secret key} {public key} app.js
    ```
 * Si des erreurs surviennent et que le status du process se met en errored veuillerz stopper le process (npm stop), corriger le problème puis restart (npm start).

*  Et la deuxième et de lancer un terminal node et de lancer
    ```bash
    $ node app.js
    ```
    Ceci lancera une seule instance, s'il y a une erreur l'appli s'arrêtera tout simplement