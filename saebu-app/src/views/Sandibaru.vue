<template>
  <div id="secure">
    <form>
      <h1>Reset wachtwoord | Ganti kata sandi</h1>
      <div>
        <label>Nieuw wachtwoord | Kata sandi baru</label>:&nbsp;<input
          type="password"
          name="password0"
          v-model="password0"
          @focus="clearMsg"
        />
        <label>Bevestig wachtwoord | Konfirmasi </label>:&nbsp;<input
          type="password"
          name="password1"
          v-model="password1"
          @focus="clearMsg"
        />
        <br /><span>&nbsp;{{ responseMsg }}</span>
      </div>
      <div>
        <label /><b-button type="button" v-on:click="requestNewPassword"
          >Verstuur password</b-button
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
#secure {
  padding: 20px;
  margin-top: 10px;
}

p {
  padding: 1em;
}
</style>
<script>
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!~%&*?])[A-Za-z\d#$@!~%&*?]{8,30}$/;

export default {
  name: "Sandibaru",
  created() {
    this.$emit("forceRerender");
    console.log(this.$route.query.code);
  },
  methods: {
    clearMsg() {
      this.responseMsg = "";
    },
    sendRequest() {
      this.$emit("ajaxCurrentlyBusyChange", true);
      const headers = {
        "content-type": "text/json"
      };
      this.axios
        .post(
          this.$strapiendpoint + "auth/reset-password",
          {
            code: this.code,
            password: this.password0,
            passwordConfirmation: this.password1
          },
          headers
        )
        .then(response => {
          this.$emit("ajaxCurrentlyBusyChange", false);
          console.log(response.data);
          //this.$router.replace({ name: "sandibaru" });
          this.responseMsg =
            "Wachtwoord is aangepast, log opnieuw in. Coba login sekarang.";
          alert(
            "Wachtwoord is aangepast, Log opnieuw in. Coba login sekarang."
          );
        })
        .catch(error => {
          console.log(error);
          this.responseMsg =
            "Server error. Probeer het later nog eens. Server kasih error, sabar, cobah lain kali lagi.";
          this.$emit("ajaxCurrentlyBusyChange", false);
        });
    },
    requestNewPassword() {
      // min 8 max 30 , 1 hoofdletter, 1 cijfer, 1 apart teken
      if (
        this.password0 != "" &&
        this.password0 == this.password1 &&
        pattern.test(this.password0)
      ) {
        this.sendRequest();
      } else {
        this.responseMsg =
          "Wachtwoord niet incorrect (minimaal 8 karakters [1 hoofdletter, 1 cijfer, 1 andere karakter]). Kata sandi tidak sah.";
      }
    }
  },
  watch: {
    // eslint-disable-next-line
    password0: function(newP, oldP) {
      //console.log(newP + oldP);
      this.responseMsg = !pattern.test(newP)
        ? "Password is not valid"
        : "Valid password";
      console.log(newP);
    }
  },
  data() {
    return {
      code: this.$route.query.code,
      password0: "",
      password1: ""
    };
  }
};
</script>
