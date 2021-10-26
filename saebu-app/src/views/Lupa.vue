<template>
  <div id="secure">
    <h1>Wachtwoord vergeten | Lupa kata sandi</h1>
    <div>
      <label>E-mail | Email anda</label>:&nbsp;<input
        type="text"
        name="username"
        v-model="username"
      />
    </div>
    <div>
      <label /><b-button type="button" v-on:click="requestReset()"
        >Reset password</b-button
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
    sendRequest(user) {
      this.$emit("ajaxCurrentlyBusyChange", true);
      this.axios
        .post(this.$strapiendpoint + "auth/local/forgot-password", {
          email: user
        })
        .then(response => {
          this.$emit("ajaxCurrentlyBusyChange", false);
          alert(response.data);
        })
        .catch(error => {
          console.log(error);
          this.$emit("ajaxCurrentlyBusyChange", false);
        });
    },

    requestReset() {
      if (this.username != "") {
        this.sendRequest(this.username);
      } else {
        alert("Isi alamat dulu dong.");
      }
    }
  },
  data() {
    return {
      username: ""
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
