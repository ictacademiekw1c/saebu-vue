<template>
  <div class="container" id="login">
    <div class="row">
      <div class="col-sm-12">
        <h1>Login | Pintu Masuk</h1>
        <div class="msg" v-if="errors.length">
          <ul>
            <li>{{ errors[errors.length - 1] }}</li>
          </ul>
        </div>
        <div>
          <label>E-mail | Email anda</label>&nbsp;<input
            type="text"
            name="username"
            v-model="username"
            placeholder="Naam | Nama"
          />
        </div>
        <div>
          <label>Wachtwoord | Kata sandi</label>&nbsp;<input
            type="password"
            name="password"
            v-model="password"
            placeholder="Wachtwoord | kata sandi"
          />
        </div>
        <div>
          <label /><b-button type="button" v-on:click="login()">Login</b-button>
          <b-navbar-nav>
            <b-nav-item to="/lupa"
              >Wachtwoord vergeten| Lupa kata sandi</b-nav-item
            >
          </b-navbar-nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//const querystring = require("querystring");

export default {
  name: "Login",
  message: "",
  created() {
    this.$emit("forceRerender");
  },
  methods: {
    getAuth(id, pw) {
      this.$emit("ajaxCurrentlyBusyChange", true);
      this.axios
        .post(this.$strapiendpoint + "auth/local", {
          identifier: id,
          password: pw,
        })
        .then((response) => {
          this.$store.state.authenticated = true;
          this.$store.state.jwt = response.data.jwt;
          this.$store.state.userLoggedin = response.data.user;
          this.$router.replace({ name: "secure" });
          this.$emit("ajaxCurrentlyBusyChange", false);
        })
        .catch((error) => {
          console.log(error);
          this.$emit("ajaxCurrentlyBusyChange", false);
          this.errors.push("Ongeldige poging | Tidak jadi masuk ke situs");
        });
    },

    login() {
      this.message = "";
      if (this.username != "" && this.password != "") {
        this.getAuth(this.username, this.password);
      } else {
        this.errors.push("A username and password must be present");
      }
    },
  },
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
};
</script>

<style scoped>
#login label {
  width: 15rem;
}
#login .msg {
  color: green;
  font-weight: bold;
}
ul {
  list-style-type: none;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#login input {
  width: 20rem;
}
#login div {
  margin: 0.5rem;
}
</style>
