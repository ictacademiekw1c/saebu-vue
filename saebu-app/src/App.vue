<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home - pulang</router-link> |
      <router-link to="/about">Over - tentang kita</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Familie Saebu webApp',
      // all titles will be injected into this template
      titleTemplate: '%s | Liefde, warmte en geborgenheid.',
       meta: [{
        vmid: 'description',
        name: 'description',
        content: 'De site van de familie Saebu, Situs keluarga Saebu di Belanda, Indonesia dan seluruh dunia. Hoe ziet de stamboom eruit, Wie zijn mijn voorouders.' 
        }]
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #b33c0d;
}
</style>
