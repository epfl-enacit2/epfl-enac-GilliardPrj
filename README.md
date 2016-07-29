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

* Lancer le programme !

## Instance actuelle

Pour le moment le logiciel  le fichier de configs ne doit pas contenir de Sensors dû au module npm epfl-enac-gilliardDb qui n'est pas encore totalement fini.