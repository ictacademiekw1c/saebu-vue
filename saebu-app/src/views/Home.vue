<template>
  <div class="home">
  <Saebu msg="Welkom - Selamat datang"/>
  <div class="homefrm">
    <!-- name -->
   <b-form-group
      id="fieldset1"
      description=""
      label="Wie ben jij? Siapa engkau?"
      label-for="name"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
                  <b-form-input id="name" :state="state" v-model.trim="name"></b-form-input>  
  </b-form-group>
 
 <!-- namefather -->
   <b-form-group
      id="fieldset2"
      description=""
      label="Wie is je vader? Siapa Bapakmu?"
      label-for="namefather"
      :invalid-feedback="invalidFeedbackF"
      :valid-feedback="validFeedbackF"
      :state="stateF"
  >

  <b-form-input id="namefather" :state="stateF" v-model.trim="namefather"></b-form-input>
  </b-form-group>

  <!-- namemother -->
     <b-form-group
      id="fieldset3"
      description=""
      label="Wie is je moeder? Siapa Ibumu?"
      label-for="namemother"
      :invalid-feedback="invalidFeedbackM"
      :valid-feedback="validFeedbackM"
      :state="stateM"
  >
    <b-form-input id="namemother" :state="stateM" v-model.trim="namemother"></b-form-input>
  </b-form-group>

        <button type="button"  class="close" data-dismiss="alert" aria-label="Close">
               Verzenden - Kirim
        </button>
 
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Saebu from "@/components/Saebu.vue";

export default {
  name: "home",
  components: {
    Saebu
  },
computed: {
    state () {
      return this.name.length >= 3 ? true : false
    },
    stateF () {
      return this.namefather.length >= 3 ? true : false
    },
    stateM () {
      return this.namemother.length >= 3 ? true : false
    },
    invalidFeedback () {
      if (this.name.length > 3) {
        return ''
      } else if (this.name.length > 0) {
        return 'Minimaal 3 karakters - 3 huruf mesti'
      } else {
        return 'Ik wacht.. menungguin...'
      }
    },
    validFeedback () {
      return this.state === true ? 'Was dat nou zo moeilijk? Apakah sulit?' : ''
    },
    validFeedbackM () {
      return this.stateM === true ? 'Was dat nou zo moeilijk? Apakah sulit?' : ''
    },
    validFeedbackF () {
      return this.stateF === true ? 'Was dat nou zo moeilijk? Apakah sulit?' : ''
    },
    invalidFeedbackF () {
      if (this.namefather.length > 3) {
        return ''
      } else if (this.namefather.length > 0) {
        return 'Minimaal 3 karakters - 3 huruf mesti'
      } else {
        return 'Ik wacht.. menungguin...'
      }
    },
    invalidFeedbackM () {
      if (this.namemother.length > 3) {
        return ''
      } else if (this.namemother.length > 0) {
        return 'Minimaal 3 karakters - 3 huruf mesti'
      } else {
        return 'Ik wacht.. menungguin...'
      }
    }
  },
  data () {
    return {
      name: '',
      namefather: '',
      namemother: ''
    }
  }
};

</script>

<style scoped>
.home {
  max-width: 600px;
  margin: auto;
  padding: 1em;
}
</style>
