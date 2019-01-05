<template>
  <div class="home">
    <Saebu msg="Hallo vreemdeling"/>
  <div class="homefrm">
   <b-form-group
      id="fieldset1"
      description="Met wie hebben we te maken?"
      label="Zeg het maar"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
    <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
  </b-form-group>
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
      return this.name.length >= 4 ? true : false
    },
    invalidFeedback () {
      if (this.name.length > 4) {
        return ''
      } else if (this.name.length > 0) {
        return 'Minimaal 4 karakters'
      } else {
        return 'Nou...'
      }
    },
    validFeedback () {
      return this.state === true ? 'Was dat nou zo moeilijk?' : ''
    }
  },
  data () {
    return {
      name: ''
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
