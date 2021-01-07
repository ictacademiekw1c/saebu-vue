<template>
  <div class="home">
  <Saebu msg="Welkom - Selamat datang"/>
  <div class="homefrm">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>

    <p v-if="submitted==true">
        <b>Je aanmelding is verzonden. Je krijgt tzt een email met je login gegevens.</b>
    </p>
    
  <form v-else>
    <fieldset>
      <legend>Vul de volgende gegevens in / Lengkapi info </legend>
  <p>
    <label for="name">Volledige voorna(a)m(-en) / Nama lengkap: &nbsp;</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>
  <p>
    <label for="father">Naam van je vader / Nama Bapakmu: &nbsp;</label>
    <input
      id="father"
      v-model="father"
      type="text"
      name="father"
    >
  </p>
  <p>
    <label for="mother">Naam van je moeder / Nama Ibumu: &nbsp;</label>
    <input
      id="mother"
      v-model="mother"
      type="text"
      name="mother"
    >
  </p>
  <p>
    <label for="email">Email : &nbsp;</label>
    <input
      id="email"
      v-model="email"
      type="text"
      name="email"
    >
  </p>
    <p>
    <input type="button" v-on:click="checkForm()" value="verzend / kirim">
    </p>
    </fieldset>
  </form>
  </div>
</div>
</template>

<script>
const querystring = require("querystring");

// @ is an alias to /src
import Saebu from "@/components/Saebu.vue";

export default {
  name: "home",
  components: {
    Saebu
  },
  created() {
    this.getAuth();
  },
  methods: {
    async getAuth() {
      const { data } = await this.axios.post(
        this.$strapiendpoint + "auth/local",
        {
          identifier: "abu.saebu@gmail.com",
          password: ""
        }
      );
      console.log(this.$strapiendpoint);
      console.log(data);
    },
    checkForm: function() {
      this.errors = [];
      if (!this.name || !this.father || !this.mother || !this.email) {
        this.errors.push(
          "Semua kotak mesti diisi / Alle velden zijn verplicht"
        );
        return;
      }
      this.axios
        .post(
          this.$mongoresturl + "register.php",
          querystring.stringify({
            name: this.name,
            father: this.father,
            mother: this.mother,
            email: this.email
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.status != "ok") {
            this.errors.push("Niet ok");
            return;
          }
        })
        .catch(error => {
          this.errors.push(error.message);
          return;
        });
      this.submitted = true;
    }
  },
  data() {
    return {
      errors: [],
      name: "",
      father: "",
      mother: "",
      email: "",
      submitted: false,
      auth: {}
    };
  }
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: auto;
  padding: 1em;
}
form input {
  float: right;
}
form p > label {
  text-align: right;
}
</style>
