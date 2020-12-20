<template>
  <div class="home">
  <Saebu msg="Welkom - Selamat datang"/>
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
  computed: {},
  data() {
    return {};
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
