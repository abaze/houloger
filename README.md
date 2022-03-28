# houloger.com

![Home Houloger.com](/static/img/screen/home.jpg)

Plateforme de biens immobiliers, moteur de recherche avec liste et détail de chaque annonce.

# Stack Technique

## Backend

Le Back se repose sur le CMS Wordpress. Ce dernier délivre les données au Front via une API native.
De cette manière, nous pouvons profiter de la partie CMS pour saisir toutes les données relatives aux annonces immobilières.

## Frontend

Le Front est totalement indépendant du BACK, nous libérant ainsi des contraintes d'intégration liées au CMS.
Il repose sur du NuxtJS et le framework CSS Boostrap-Vue.

![Exemple liste de biens](/static/img/screen/liste.jpg)

## Mise en route

```bash
# installation des modules
$ npm install

# rendu local
$ npm run dev

# build pour la prod et lancement du projet
$ npm run build
$ npm run start

# generation du projet en static
$ npm run generate
```

Pour plus d'informations [Nuxt.js docs](https://nuxtjs.org).

# Informations sur les modules supplementaires

### Axios - Gestion des requêtes HTTP etc.

```bash
# ajout d'Axios dans Nuxt
$ npm i @nuxtjs/axios

# dans nuxt.config.js
modules : [
   '@nuxtjs/axios'
],
```

### Node SASS & SASS Loader - Gestion du SCSS

```bash
# install
$ npm i --save-dev node-sass sass-loader

# example de config dans nuxt.config.js
css: ['~/assets/global.scss', '~/assets/scss/animation.scss'],
styleRessources: {
   scss: ['./assets/scss/vars/*.scss'],
},
```

### Icons Bootstrap Vue

```bash
# j'active les icones Bootstrap dans nuxt.config.js
modules: [
    [
      'bootstrap-vue/nuxt',
      {
        icons: true,
      },
    ],
    ...
  ],
```

---

<br>
<br>

## Vous pouvez utiliser la [démo en ligne](https://houloger.netlify.app/)
