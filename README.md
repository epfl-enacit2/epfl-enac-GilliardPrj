# GilliardPrj

## Buts
Le projet GilliardPrj sert à acquérir des données envoyées par une carte Arduino ayant différents 
capteurs sur le port série d'un systéme d'acquisition (PC) et de les pusher sur une BDD SQL configurées 
par un module npm externe (epfl-enac-gilliarddb --> [readme](https://github.com/epfl-enacit2/epfl-enac-GilliardDB "Lien vers le github epfl-enac-GilliardDB") du projet pour plus d'infos) mais avec des configs locales.

##Installation

* Récupérer le projet GilliardPrj avec tout ces fichiers puis à la racine du projet lancer une commande dans la console node(rechercher dans windows "node" et lancer "command prompt nodejs") (*au moins v6.2.0*) (avoir préinstaller NodeJS --> [téléchargements](https://nodejs.org/en/ "Lien vers l'installation de NodeJS dernière version - Current") avant tout, pour linux voir [tuto](https://nodejs.org/en/download/package-manager/)) 
```bash
$ npm install
```
Cette commande installera les modules nécessaires au bon fonctionnement du systéme d'acquisition.

* Si vous devez mettre en place la BDD je vous invite à suivre ces quelques étapes (Windows);
 * Vous devez tout d'abord télécharger [Wamp](http://www.wampserver.com/ "Lien pour le téléchargement de Wamp") ou tout autre module faisant office d'un serveur Web ayant MySQL
 * Démarrer Wamp en lançant l'appli puis dans son menu (en bas à droite dans le menu masqué) clic sur l'image du "W" puis séléctionner "phpMyAdmin"
 * Entrer les identifiants (de base username = root et laisser blanc le password) et cliquer dans l'onglet "SQL" en haut 
 * Dans la boite de texte entrer le script [SQL](https://github.com/epfl-enacit2/epfl-enac-GilliardDB/blob/master/docs/GilliardDbModels.sql "Lien vers le script SQL de la BDD")
 * Désormais la BDD a été crée et un user avec alors pour la prochaine étape (configs) vous pouvez mettre comme username : insertValues et password : password

* Si vous devez mettre en place la BDD je vous invite à suivre ces quelques étapes (Linux) *Non recommandé car pas penser pour à la base...D'autant plus qu'après un test, avec une RaspBerry du moins, la mémoire ne soit pas suffisante à la capture des données et du push sur la BDD*;
 * Faire les étapes sous ce [lien]() pour installer le serveur apache et MySQL (nécessaire)
 * Puis ce [lien]() pour l'installation de phpmyadmin 
 * Entrez dans votre navigateur l'adresse localhost/phpmyadmin qui vous permettra de suivre les mêmes instructions que Windows à partir de la ligne 4
 * Si le script SQL fourni ne s'avère pas un succès changer à la main les "DATETIME" par des "TIMESTAMP"

* Une fois les modules nécessaires installés il vous faut modifier le fichier *configs_sample.json* dans le dossier *configs* en suivant les instructions des commentaires, une fois fait il vous faut renommer ce fichier *configs.json* et supprimer les commentaires.

## Utilisations

Lancer le programme ! Et là 2 options s'offrent à vous (après être aller à la racine du programme avec votre terminal grâce à la commande 'cd') ;

*  à l'aide du module pm2 (relance le programme  s'il déclenche une erreur,le relance au moins 20x avant de déclarer une erreur bloquante) dans ce cas lancer la ligne 
    ```bash
    $ npm run start
    ```
    Et 
    ```bash
    $ npm run stop
    ```
    pour arrêter le programme.
    Le programme sera relancé si des erreurs surviennent, les logs seront de toutes façons dans un fichier dans le repertoire "logs" si les options de logging sont sur "console". Les options de logging sur "fichier" créera un fichier dans logs aussi tandis que l'option "" ne fera aucun log.

    Et afin de voir quels sont les processus actuels du programme sur votre machine faites :
    ```bash
    $ npm run listprocess
    ```
  * Pour plus d'options telles que le monitoring à distance p.ex. lancer 
    ```
    $ npm install pm2 -g
    ```
    ensuite pour linker et faire du monitoring à distance créer un [compte](https://app.keymetrics.io/#/register "Register for KeyMetrics") puis créer un "bucket" puis suiver les instructions
    ```
    $ pm2 link {secret key} {public key} app.js
    ```
 * Si des erreurs surviennent et que le status du process se met en errored veuillerz stopper le process (npm run stop), corriger le problème puis restart (npm run start).

*  Et la deuxième et de lancer un terminal node et de lancer
    ```
    $ node app.js
    ```
    Ceci lancera une seule instance, s'il y a une erreur l'appli s'arrêtera tout simplement

## Cas d'utilisations

* Pour toutes utilisations spéciales (distributions linux etc...) je vous laisse consulter le [ReadMe](https://github.com/EmergingTechnologyAdvisors/node-serialport#raspberry-pi-linux) du module serialport.
* Pour les connexions aux ports séries ce seront des noms comme *COM3*, *COM2*, ... qui seront dans le fichier de config mais pour un environnement linux ce sera par défaut */dev/ttyUSB0*