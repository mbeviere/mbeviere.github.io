# Tutoriel Flutter

## Installation et mise en place de l'environnement



Ici les instructions d'installation sont pour un système d'exploitation Windows.

Pour un autre système d'exploitation suivez les étapes sur le site officiel de Flutter: https://flutter.dev/docs/get-started/install 



### Installation de Flutter SDK

- J'utilise Chocolatey de Microsoft pour gérer mes applications sur Windows 10

```bash
	choco install flutter
```



- Pour une installation plus classique:

  - Télécharger le Flutter SDK sur le site de Flutter et extraire le ZIP téléchargé là où vous le souhaitez

    **OU**

  - ```bash
    git clone https://github.com/flutter/flutter.git -b stable
    ```

  

  - Mettez à jour votre PATH en ajoutant le chemin complet vers *flutter/bin*



### Vérification de l'installation

```bash
flutter doctor
```

Cette commande vérifie la bonne installation et nous donne des conseils si elle détecte un problème.



### Installation de l'IDE

Android Studio ou IntelliJ sont recommandés pour Flutter.

J'ai utilisé Android Studio.

https://developer.android.com/studio

Vous pourrez ajouter le plugin Flutter après avoir installé le SDK Android.



### Installation de Android SDK

Au démarrage de Android Studio passez par l '«Assistant de configuration d'Android Studio». 

Cela installe le dernier SDK Android, les outils de ligne de commande du SDK Android et les outils de construction du SDK Android, qui sont requis par Flutter lors du développement pour Android.



### Initialisation de l'émulateur Android

Suivez les démarches sur le site de Flutter ou d'Android Studio pour mettre en place un émulateur Android.

Si vous utilisez un téléphone Android, vous pouvez utiliser ADB pour installer l'application directement sur votre smartphone. Cela permet d'utiliser l'application dans des conditions réelles et cela soulagera votre ordinateur. 



## Création de l'application Flutter



Si vous avez fait le choix d'utiliser Android Studio avec le plugin Flutter suivez ces étapes, sinon renseignez vous sur la façon de créer une application avec votre IDE.

```
Fichier > Nouveau > Nouvelle application Flutter > Application Flutter
```

Vous pouvez ensuite suivre les étapes de création.



<u>Pour ce tutoriel j'ai utilisé:</u>

- Nom du projet : tutoriel_flutter
- Nom du package : ig2i.mobile.tutorielflutter



Le fichier lancé au démarrage de l'application est le fichier ***main.dart*** contenu dans **<u>*/lib*</u>** 

Essayez de lancer votre projet fraîchement créé pour vérifier que tout se passe bien.



Vous devez obtenir cet affichage :

<img src="C:\Users\gasto\AppData\Roaming\Typora\typora-user-images\image-20210525201407287.png" alt="image-20210525201407287" style="zoom: 25%;" />
