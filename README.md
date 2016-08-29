# GilliardPrj

## Buts
Le projet GilliardPrj sert à acquérir des données envoyées par une carte Arduino ayant différents 
capteurs sur le port série d'un systéme d'acquisition (PC) et de les pusher sur une BDD SQL configurées 
par un module npm externe mais avec des configs locales.

## Utilistation
* Récupérer le projet GilliardPrj avec tout ces fichiers puis à la racine lancer 
```bash
$ npm install
```
    Cette commande va installer les modules nécessaires au bon fonctionnement du systéme d'acquisition.

* Une fois les modules nécessaires installés il vous faut modifier le fichier *congis_sample.json* dans le dossier *configs* en suivant les instructions des commentaires, une fois fait il vous faut renommer ce fichier *configs.json* et supprimer les commentaires.

* Lancer le programme ! Et là 2 options s'offrent à vous ;

 *  à l'aide du module forever (relance le programme  s'il déclenche une erreur,le relance au moins 10x) dans ce cas lancer la ligne 
    ```bash
    $ npm start
    ```
    Et Ctrl + C pour arrêter le programme. Le programme sera relancé au moins 10x si des erreurs surviennent, les logs seront de toutes façons dans la console (cela veut aussi dire que vous pouvez activez l'option de logging dans un fichier dans le fichier de configs).

 *  Et la deuxième et de lancer un terminal node et de lancer
    ```bash
    $ node app.js
    ```
    Ceci lancera une seule instance, s'il y a une erreur l'appli s'arrêtera

## Instance actuelle

Pour le moment le logiciel ne prends pas automatiquement le nom de la machine il faut donc la mettre en dur dans le fichier configs