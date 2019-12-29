<template>
     <div id="login">
        <h1>Login | Pintu Masuk</h1>
        <div  class="msg" v-if="errors.length">
            <ul>
                <li >{{ errors[errors.length-1] }}</li>
            </ul>
            </div>
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
                        
                        this.$store.state.userAccount = this.username;
                        this.$store.state.authenticated = true;
                        this.$router.replace({ name: "secure" });
                    } else {
                        
                        this.errors.push("The username and / or password is incorrect");
                    }
                } else {
                    
                    this.errors.push("A username and password must be present");
                }
            }
        },
        data() {
            return {
                    username: "",
                    password: "",
                    errors: []
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
    ul {
        list-style-type: none;
    }
    </style>