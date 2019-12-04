<template>
     <div id="login">
        <h1>Login | Pintu Masuk</h1>
        <div  class="msg" v-if="message != ''">{{ message }}{{ this.$parent.authMessage }}</div>
        <div><label>Naam | Nama</label>:&nbsp;<input type="text" name="username" v-model="username" placeholder="Naam | Nama" /></div>
        <div><label>Wachtwoord | Kata sandi</label>:&nbsp;<input type="password" name="password" v-model="password" placeholder="Wachtwoord | kata sandi" /></div>
        <div><label /><button type="button" v-on:click="login()">Login</button></div>
        
    </div>
</template>

<script>
    export default {
        name: 'Login',
        message: "",
        methods: {
            login() {
                this.message = '';
                if(this.username != "" && this.password != "") {
                    if(this.username == this.$parent.mockAccount.username && this.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        this.$parent.authMessage = "The username and / or password is incorrect"; 
                        this.message = "The username and / or password is incorrect";
                        this.$router.replace({ name: "login" });
                    }
                } else {

                    this.message = "A username and password must be present";
                }
            }
        },
        data() {
            return {
                    username: "",
                    password: ""
            }
        }
 
    }
</script>

<style scoped>
    #login {
        width: 500px;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    #login label{
        width: 15rem;
    }
    #login .msg {
        color: green;
        font-weight: bold;
    }
    </style>