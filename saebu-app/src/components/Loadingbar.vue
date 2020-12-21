<template>
    <div class="loadingBarOverlay" v-if="ajaxCurrentlyBusy">
        <div >
            <b-spinner
            variant="primary"
            >
            </b-spinner>
        </div>
    </div>
</template>
<style scoped>
.loadingBarOverlay {
  width: 100%;
  height: 100%;
  background-color: #dddd99;
  position: absolute;
  z-index: 1;
  text-align: center;
  padding-top: calc(15%);
  opacity: 0.5;
  top: 0px;
  left: 0px;
}
</style>

<script>
export default {
  name: "Loadingbar",
  props: ["ajaxCurrentlyBusy"]
};
</script>
