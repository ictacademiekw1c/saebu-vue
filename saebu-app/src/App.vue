<template>
  <div id="app">
    <b-container fluid>
      <Loadingbar :ajaxCurrentlyBusy="getBusy"></Loadingbar>
      <b-navbar toggleable="lg" type="dark" id="navsaebu">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home - pulang</b-nav-item>
            <b-nav-item to="/about">Over - tentang kita</b-nav-item>
            <b-nav-item v-if="!this.$parent.isAuthenticated" to="/daftar"
              >Meld je aan - Mendaftermu</b-nav-item
            >
            <b-nav-item v-if="!this.$parent.isAuthenticated" to="/login"
              >Login - Pintu masuk
            </b-nav-item>

            <b-nav-item v-if="this.$parent.isAuthenticated" to="/tree">
              Familieboom - Pohon sekeluarga
            </b-nav-item>
            <b-nav-item v-if="this.$parent.isAuthenticated" to="/tahun">
              Familiekalender - Kalender tahunan
            </b-nav-item>

            <b-nav-item v-if="this.$parent.isAuthenticated" to="/logout"
              >Logout - Henti sesi</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <aside>
        <img src="@/assets/footer.jpg">
      </aside>
      <router-view
        @authenticated="setAuthenticated"
        @ajaxCurrentlyBusyChange="ajaxCurrentlyBusyChange"
        @forceRerender="reRender"
      />
      <!-- key is nodig om een rerender te doen bij wijziging van userNow -->
      <Footer :message="getFooterLine" :mention="userNow" :key="userNow" />
    </b-container>
  </div>
</template>

<script>
import Loadingbar from "./components/Loadingbar";
import Footer from "./views/Footer";
import { mapGetters } from "vuex";

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
    ...mapGetters(["userNow"]),
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #fff;
}

.container-fluid { 
  min-height: call(100vh);
  background-position: 70% top;
  background-repeat: no-repeat;
  background: rgb(97, 66, 36);
  background: linear-gradient(90deg, rgba(97,66,36,1) 6%, rgba(141,122,58,1) 44%, rgba(179,166,114,1) 100%);
}

aside img {
  display: none;
}

figure img {
  float: left;
  margin: 0.5em 1em 0.5em 1em;
  height: 200px;
}


@media only screen and (min-width: 768px) {
  .container-fluid {
    min-height: 1000px;
  }
  aside img {
    display: block;
    float: right;
  }
  figure img {
    max-width: 33%;
    max-height: 50vh;
    float: left;
    margin: 0.5em 1em 0.5em 1em;
}

}

h1 {
  color: #f3b43f;
}

h2 {
  color: #b3a394;
}

h1,
p {
  padding: 0.5em;
}

#nav-collapse a.router-link-exact-active {
  color: #f3b43f;
  font-weight: bold;
}

.navbar-dark .navbar-nav .nav-link {
  color: #f3b43f;
}

#navsaebu {
  background-color: #102542;
}
</style>
