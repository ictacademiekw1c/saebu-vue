<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home - pulang</router-link> |
      <router-link to="/about">Over - tentang kita</router-link> 
      <router-link to="/wiebenje">| Wie ben je - Siapa engkau?</router-link> 
      <router-link v-if="!this.$parent.isAuthenticated" to="/login">| Login - Pintu masuk </router-link> 
      <router-link v-if="this.$parent.isAuthenticated" to="/login" v-on:click.native="logout()" replace>| Logout - Henti sesi</router-link>
    </div>
     <router-view @authenticated="setAuthenticated" />
     <footer>&copy; Saebu, 2019  || {{ this.$store.state.userAccount }}</footer>
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
    },
     data() {
            return {
                authMessage: "",
                mockAccount: {
                    username: "abu",
                    password: "tjitjusaga"
                },                
                jaar: 0
            }
        },
        created() {
            var dt = new Date();
            jaar = dt.GetYear();
        },
        methods: {
            setAuthenticated(status) {
                this.$store.state.authenticated = status;
            },
            logout() {
                this.$store.state.userAccount = "Anonymous";
                this.$store.state.authenticated = false;
            }
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
