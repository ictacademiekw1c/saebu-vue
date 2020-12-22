<template>
    <Calendar :min-date="new Date()"></Calendar>
</template>
<script>
import Calendar from "v-year-calendar";

export default {
  components: {
    Calendar
  }
};
</script>

<style scoped>
.calendar {
  padding: 18px;
}
</style>
