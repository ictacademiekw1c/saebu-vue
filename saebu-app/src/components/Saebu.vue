<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Welkom op de saebu site, wie ben je? Ben je een telg uit de familie Saebu en heb je nog geen login, dan kun je je hieronder aanmelden.
      Je krijgt via de email een wachtwoord opgestuurd zodat je kan inloggen en jezelf kan toevoegen aan de familie Saebu stamboom. 
    </p>
    <p>
      Selamat datang di situs keluarga Saebu, siapa engkau? Kalau engkau sesuatu warga dari keluarga, anda bisa registrasikan diri dengan formulir di bawah.
      Setelah diisi dan dikirim engkau dapat email dengan kata sana supaya bisa antar di halaman web dan bisa melihat kita pohon keluarga, dan juga bisa 
      bikin perubahan di pohon kalau mesti. 
    </p>
    
  </div>
</template>

<script>
export default {
  name: "Saebu",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
