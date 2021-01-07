<template>
  <div id="app">
    <Loadingbar :ajaxCurrentlyBusy="getBusy"></Loadingbar>
    <b-navbar toggleable="lg" type="dark" id="navsaebu">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home - pulang</b-nav-item> |
          <b-nav-item to="/about">Over - tentang kita</b-nav-item>
          <b-nav-item v-if="!this.$parent.isAuthenticated" to="/daftar"
            >| Meld je aan - Mendaftermu</b-nav-item
          >
          <b-nav-item v-if="!this.$parent.isAuthenticated" to="/login"
            >| Login - Pintu masuk
          </b-nav-item>

          <b-nav-item v-if="this.$parent.isAuthenticated" to="/tree">
            | Familieboom - Pohon sekeluarga
          </b-nav-item>
          <b-nav-item v-if="this.$parent.isAuthenticated" to="/tahun">
            | Familiekalender - Kalender tahunan
          </b-nav-item>

          <b-nav-item v-if="this.$parent.isAuthenticated" to="/logout"
            >| Logout - Henti sesi</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view
      @authenticated="setAuthenticated"
      @ajaxCurrentlyBusyChange="ajaxCurrentlyBusyChange"
    />

    <Footer :message="getFooterLine" :mention="userNow" />
  </div>
</template>

<script>
import Loadingbar from "./components/Loadingbar";
import Footer from "./views/Footer";

export default {
  name: "App",
  components: {
    Loadingbar,
    Footer
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Familie Saebu webApp",
    // all titles will be injected into this template
    titleTemplate: "%s | Liefde, warmte en geborgenheid.",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "De site van de familie Saebu, Situs keluarga Saebu di Belanda, Indonesia dan seluruh dunia. Hoe ziet de stamboom eruit, Wie zijn mijn voorouders."
      }
    ]
  },
  data() {
    return {
      authMessage: "",
      ajaxCurrentlyBusy: false
    };
  }, //einde data
  computed: {
    userNow() {
      return this.$store.state.userLoggedin.username;
    },
    getFooterLine() {
      var dt = new Date();
      return (
        "Saebu familie website | Keluarga Saebu situs " +
        dt.getFullYear() +
        " | &copy; Abu Saebu"
      );
    },
    getBusy() {
      return this.ajaxCurrentlyBusy;
    }
  }, //einde computed
  methods: {
    // Listen to the ajaxCurrentlyBusy event, emitted from all around the app (other components, etc)
    ajaxCurrentlyBusyChange: function(params) {
      //alert(params);
      this.ajaxCurrentlyBusy = params;
    },
    setAuthenticated(status) {
      this.$store.state.authenticated = status;
    }
  } //einde methods
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  max-width: 90vw;
  margin: auto;
}

#nav-collapse a.router-link-exact-active {
  color: #b33c0d;
}

#navsaebu {
  background-color: #292354;
}

h1,
p {
  padding: 0.5em 10em 0.5em 0.2em;
}
</style>
