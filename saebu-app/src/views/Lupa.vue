<template>
  <div id="secure">
    <h1>Wachtwoord vergeten | Lupa kata sandi</h1>
    <div>
      <label>E-mail | Email anda</label>:&nbsp;<input
        type="text"
        name="username"
        v-model="username"
        @focus="clearMsg"
      />
      <span>&nbsp;{{ responseMsg }}</span>
    </div>
    <div>
      <label /><b-button type="button" v-on:click="requestReset"
        >Request password</b-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Lupa",
  created() {
    this.$emit("forceRerender");
  },
  methods: {
    clearMsg() {
      this.responseMsg = "";
    },
    sendRequest(user) {
      console.log(user);
      this.$emit("ajaxCurrentlyBusyChange", true);
      const headers = {
        "content-type": "text/json"
      };
      this.axios
        .post(
          this.$strapiendpoint + "auth/forgot-password",
          { email: user },
          headers
        )
        .then(response => {
          this.$emit("ajaxCurrentlyBusyChange", false);
          console.log(response.data);
          //this.$router.replace({ name: "sandibaru" });
          this.responseMsg =
            "Je hebt een email ontvangen. Check ook je spam. Email sedang dikirim. Bacahlah.";
        })
        .catch(error => {
          console.log(error);
          this.responseMsg =
            "Server error. Probeer het later nog eens. Server kasih error, sabar, cobah lain kali lagi.";
          this.$emit("ajaxCurrentlyBusyChange", false);
        });
    },

    requestReset() {
      if (this.username != "") {
        this.sendRequest(this.username);
      } else {
        this.responseMsg = "Vul je emailadres in. Apakah email anda?";
        //alert("Isi alamat dulu dong.");
      }
    }
  },
  data() {
    return {
      username: "",
      responseMsg: ""
    };
  }
};
</script>
<style scoped>
#secure {
  padding: 20px;
  margin-top: 10px;
}
</style>
