# GilliardPrj

## Buts
Le projet GilliardPrj sert à acquérir des données envoyées par une carte Arduino ayant différents 
capteurs sur le port série d'un systéme d'acquisition (PC) et de les pusher sur une BDD SQL configurées 
par un module npm externe (epfl-enac-gilliarddb --> [readme](https://github.com/epfl-enacit2/epfl-enac-GilliardDB "Lien vers le github epfl-enac-GilliardDB") du projet pour plus d'infos) mais avec des configs locales.

## Utilistation
* Récupérer le projet GilliardPrj avec tout ces fichiers puis à la racine lancer 
```bash
$ npm install
```
Cette commande va installer les modules nécessaires au bon fonctionnement du systéme d'acquisition.

* Une fois les modules nécessaires installés il vous faut modifier le fichier *configs_sample.json* dans le dossier *configs* en suivant les instructions des commentaires, une fois fait il vous faut renommer ce fichier *configs.json* et supprimer les commentaires.

* Lancer le programme ! Et là 2 options s'offrent à vous ;

 *  à l'aide du module forever (relance le programme  s'il déclenche une erreur,le relance au moins 20x) dans ce cas lancer la ligne 
    ```bash
    $ npm start
    ```
    Et 
    ```bash
    $ npm stop
    ```
    pour arrêter le programme.
    Le programme sera relancé si des erreurs surviennent, les logs seront de toutes façons dans un fichier dans le repertoire "logs" si les options de logging sont sur "console". Les options de logging sur "fichier" créera un fichier dans logs aussi mais l'option ""ne fera aucun log.

    Et afin de voir quels sont les processus actuels du programme sur votre machine faites :
    ```bash
    $ npm test
    ```
    Si vous voulez le nombre de fois que le programme sera relancéaprès une erreur vous pouvez allez dans le fichier *package.json* et modifier le chiffre "20".
    ```json
    "start": "forever start -o ./logs/logForever.log -m 20 app.js ",
    ```

 *  Et la deuxième et de lancer un terminal node et de lancer
    ```bash
    $ node app.js
    ```
    Ceci lancera une seule instance, s'il y a une erreur l'appli s'arrêtera tout simplement

## Instance actuelle

Pour le moment le logiciel ne prends pas automatiquement le nom de la machine il faut donc la mettre en dur dans le fichier configs