<template>
  <div v-if="!registered" id="login">
    <h1>Meld u aan als familielid | Mendaftar anda sebagai warga keluarga</h1>
    <div class="msg" v-if="hasError">
      <p>{{ message }}</p>
    </div>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Naam | Namah:</label>&nbsp;<input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username | Nama"
        />
      </div>
      <div>
        <label>Email:</label>&nbsp;<input
          type="text"
          name="email"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div>
        <label>Wachtwoord | Kata sandi:</label>&nbsp;<input
          type="password"
          name="password"
          v-model="password"
          placeholder="Wachtwoord | kata sandi"
        />
      </div>
      <div>
        <div id="recaptcha">
          <vue-recaptcha
            @verify="onVerify"
            @expired="onExpired"
            :loadRecaptchaScript="true"
            sitekey="6LcZjVoaAAAAAA1So3w0WQb8SnhE0eSuFvaD6D0S"
          >
          </vue-recaptcha>
        </div>
      </div>
      <div>
        <label />
        <b-button type="submit">
          Verzend | Kirim
        </b-button>
      </div>
    </form>
  </div>
  <div v-else>
    <h2>Gelukt | Jadi</h2>
    <p>
      Klik nog op bevestigen in het emailbericht dat naar u is verzonden. |
      Konfirmasikan anda alamat email.
    </p>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Daftar",
  components: { VueRecaptcha },
  computed: {
    registered() {
      return this.registrationDone;
    }
  },
  data() {
    return {
      noRobot: false
    };
  },
  methods: {
    onSubmit: function() {
      this.register();
    },
    onVerify: function() {
      this.noRobot = true;
    },
    onExpired: function() {
      console.log("Expired");
    },
    register() {
      if (!this.noRobot) {
        this.message =
          "Engkau bukan manusia tetapi mesin. | Bewijs dat je geen robot bent.";
        return;
      }

      this.message = "";
      if (this.email != "" && this.password != "") {
        this.$emit("ajaxCurrentlyBusyChange", true);
        const ep = this.$strapiendpoint + "auth/local/register";
        this.axios
          .post(ep, {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(response => {
            // Handle success.
            console.log("User profile", response.data.user);
            this.registrationDone = true;
            this.$emit("ajaxCurrentlyBusyChange", false);
          })
          .catch(error => {
            // Handle error.
            this.hasError = true;
            console.log(error);
            this.message =
              "Aanmelding mislukt, probeer een ander emailadres | Tidak jadi mendaftar, coba dengan alamat lain";
            this.$emit("ajaxCurrentlyBusyChange", false);
          });
      } else {
        this.hasError = true;
        this.message = "All fields are required.";
      }
    }
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      message: "",
      registrationDone: false,
      hasError: false
    };
  }
};
</script>

<style scoped>
#login {
  width: 90vw;
}
#login label {
  width: 15rem;
}
#login .msg {
  color: red;
  font-weight: bold;
}
ul {
  list-style-type: none;
}
</style>
