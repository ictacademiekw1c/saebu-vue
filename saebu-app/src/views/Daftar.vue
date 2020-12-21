<template>
     <div v-if="!registered" id="login">
         <h1>Meld u aan als familielid | Mendaftar anda sebagai warga keluarga</h1>
        <div  class="msg" v-if="hasError">
            <p>{{ message }}
                </p>
        </div>
        <div><label>Naam | Namah:</label>&nbsp;<input type="text" name="username" v-model="username" placeholder="Username | Nama" /></div>
        <div><label>Email:</label>&nbsp;<input type="text" name="email" v-model="email" placeholder="Email" /></div>
        <div><label>Wachtwoord | Kata sandi:</label>&nbsp;<input type="password" name="password" v-model="password" placeholder="Wachtwoord | kata sandi" /></div>
        <div><label /><button type="button" v-on:click="login()">Verzend | Kirim</button></div>        
    </div>
    <div v-else>
        <h2>Gelukt | Jadi</h2>
        <p>Klik nog op bevestigen in het emailbericht dat naar u is verzonden. | Konfirmasikan anda alamat email.
            </p>
    </div>
</template>

<script>
export default {
  name: "Daftar",
  computed: {
    registered() {
      return this.registrationDone;
    }
  },
  methods: {
    login() {
      this.message = "";
      this.$emit("ajaxCurrentlyBusyChange", true);

      if (this.email != "" && this.password != "") {
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
  width: 70vw;
  margin-top: 200px;
  background-color: #ffffff;
  margin: auto;
  margin-top: 0px;
  padding: 20px;
}
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
</style>
