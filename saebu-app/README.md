# saebu-app

## Software architecture

This app uses STRAPI CMS for the backend.
All dynamic content is stored in a MongoDB database with STRAPI/Rest API as a headless CMS. The frontend is built with Vue.js and Vuetify.

The backend resides on Heroku and the frontend on a shared web server of Versio, for which I also act as a reseller.

## Versions

This app is dependent on a minimal version of node v14.17.0 and a @vue/cli 5.0.1 version.

## Project setup
```
npm install
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
