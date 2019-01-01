<template>
  <div class="home">
    <Saebu msg="Hallo vreemdeling"/>
   <b-form-group
      id="fieldset1"
      description="Met wie hebben we te maken?"
      label="Enter your name"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
    <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
  </b-form-group>
 </div>
</template>
<script>

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
        return 'Enter at least 4 characters'
      } else {
        return 'Please enter something'
      }
    },
    validFeedback () {
      return this.state === true ? 'Thank you' : ''
    }
  },
  data () {
    return {
      name: ''
    }
  }
}

// @ is an alias to /src
import Saebu from "@/components/Saebu.vue";
</script>
