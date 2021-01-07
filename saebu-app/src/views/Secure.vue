<template>
  <div id="secure">
    <h1>Besloten pagina</h1>
    <p>
      Je bent ingelogd als {{ $store.state.userLoggedin.username }} en deze
      pagina is alleen te zien wanneer je bent ingelogd.
    </p>
    <p>
      Engkau masuk ke situs Saebu di mana ini terlihat khusus untuk warga
      keluarga ini.
    </p>
  </div>
</template>

<script>
export default {
  name: "Secure",
  data() {
    return {};
  }
};
</script>
<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
