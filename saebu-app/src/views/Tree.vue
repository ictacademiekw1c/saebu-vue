<template>
  <div class="tree">
    <Family />
  </div>
</template>

<script>
// @ is an alias to /src
import Family from "@/components/Family.vue";

export default {
  name: "family",
  components: {
    Family
  },
computed: {
  },
  data () {
    return {
    }
  }
};
</script>

<style scoped>
.family {
  max-width: 600px;
  margin: auto;
  padding: 1em;
}
</style>