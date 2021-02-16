<template>
  <div class="loadingBarOverlay" v-if="ajaxCurrentlyBusy">
    <div>
      <b-spinner variant="primary"> </b-spinner>
    </div>
  </div>
</template>
<style scoped>
.loadingBarOverlay {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  text-align: center;
  padding-top: calc(15%);
  opacity: 0.5;
  top: 0px;
  left: 0px;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0% {
    background-color: #dddd99;
  }
  100% {
    background-color: #d84a12;
  }
}
</style>

<script>
export default {
  name: "Loadingbar",
  props: ["ajaxCurrentlyBusy"]
};
</script>
