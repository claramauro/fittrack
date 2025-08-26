<h1 align="center">
    <img src="public/images/logo.png" alt="Logo">
</h1>

<!-- TABLE DES MATIÈRES -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#à-propos">À propos</a>
      <ul>
        <li><a href="#technologies">Technologies utilisées</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-démarrer">Pour démarrer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisation">Utilisation</a></li>
  </ol>
</details>

## À propos

FitTrack est une application web permettant de suivre l’évolution de son poids et ses mensurations et de fixer des objectifs personnels.

Elle offre une interface simple pour ajouter, modifier et visualiser ses données.
Elle intègre un graphique pour visualiser son évolution ainsi qu’un historique pour suivre sa progression.

J'ai développer cette application pour mon propre usage personnel mais aussi pour mettre en pratique mes compétences autour de Next.js.

### Technologies utilisées

-   ![TypeScript]
-   ![Next.js]
-   ![React.js]
-   ![Tailwind]
-   ![MySQL]
-   ![Node.js]

## Pour démarrer

### Prérequis

-   node 22 et npm
-   MySQL 8.4 ou supérieur recommandé (testé avec MySQL 9.2.0)

### Installation

1. Cloner le dépôt

    ```sh
    git clone https://github.com/claramauro/fittrack.git
    ```

2. Installer les dépendances avec NPM

    ```sh
    npm install
    ```

3. Créer un fichier `.env` à la racine (cf. `.env.example`)

4. Créer les tables MySQL (cf. [script SQL](/src/libs/server/database/migration/createTables.sql) )

## Utilisation

Lancer le serveur de développement (à l'adresse http://localhost:3000)

```sh
npm run dev
```

**NB** :  
En mode développement, l'inscription d'un utilisateur est possible en cliquant sur le lien de preview de l'email qui sera affiché dans le terminal après la soumission du formulaire.

<!-- [product-screenshot]: images/screenshot.png -->

[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white
[MySQL]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
