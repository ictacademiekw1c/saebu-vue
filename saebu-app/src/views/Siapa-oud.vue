<template>
     <input v-model="$v.name.$model" :class="status($v.name)">
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'Siapa',
    data: {
        name: ''
    },
    validations: {
  	name: {
    	required
    }
  },
  methods: {
  	status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.dirty {
  border-color: #5A5;
  background: #EFE;
}

.dirty:focus {
  outline-color: #8E8;
}

.error {
  border-color: red;
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}
</style>