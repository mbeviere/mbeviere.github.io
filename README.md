# TX DataVisualisation

1) npm install -g @angular/cli : installer angular sur npm
2) Mettre à jour node.js : sudo npm install npm@latest -g
Attention angular fonctionne sur la V12 mais pas la v13, j'ai mis super longtemps à coprendre et tout remettre à jour... https://stackoverflow.com/questions/64051509/unknown-error-syntaxerror-unexpected-token-export-on-ng-command
Les Maj de npm sont asse compliqués mais avec un peu de chance, vous n'aurez pas besoin de les faire
3) ng new TXdata3 (je l'ai appelé TXdata3 car apres plusieurs manip)
(au cas où, ce lien m'a sauvé : https://www.c-sharpcorner.com/article/how-to-solve-the-schematic-workflow-failed-error-in-angular/#:~:text=After%20selecting%20routing%20and%20CSS,network%20or%20any%20other%20issue.)

4) installer D3js sur le angular : npm install d3 && npm install @types/d3 --save-dev


5) besoin de mettre D3 dans chacun des composant de Angular :
ng g component bar
ng g component pie
ng g component scatter
(les 3 composant dispos dans src/app/ )

Déja fait dans les fichiers pas besoin de le faire pas vous : 6) ouvrir : src/app/app.component.html dans un éditeur et remplacer tout par
```html
<header>
  <h1>Angular + D3</h1>
</header>
<app-bar></app-bar>
<app-pie></app-pie>
<app-scatter></app-scatter>
</code>
```
7)  ng serve --open : ouvre dans en local l'application


Déja fait dans les fichiers pas besoin de le faire pas vous : 9) Dans chaque page .ts utilisant d3 besoin d'inscrire
import * as d3 from 'd3';   au début de la page
Si utilisation d'atom : besoin de le mettre à jour pour pouvoir modifier des .ts dans atom et non dans l'éditeur de texte classique



Pour les pb de d3 non connu : https://forum.ionicframework.com/t/d3js-import-typescript/56027/5


**Pour pouvoir ouvrir des fichiers .ts sur atom (sinon c'est illisible): **
- Install atom.
- Install dependencies (see below).
- apm install atom-typescript (apm needs git in your path).
- Fire up atom. Open a TypeScript file.



# Script turtle to json
Le dossier `script_data-transformation` permet de transformer les données d'un fichier .ttl en un fichier .js utilisable par l'application. Une fois les données transformée, il faut les entrer à la main dans le fichier `environment.ts`.
Pour réaliser une transformation, rentrer les nom des fichiers source et destination dans le fichier `create_json.py`, puis lancer la commande ` python create_json.py` dans ce dossier.
