<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <p v-html="message"></p>
      </div>
    </div>
    <div id="mentions">
      <p>Selamat {{ mention }}</p>
    </div>
   </div>
</template>

<script>

export default {
  name: "Footer",
  props: ["message", "mention"]
};
</script>

<style scoped>
#container {
  padding-top: 20px;
  margin-top: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #f3b43f;
  background-color: #102542;
}
#contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
#contacts--contact {
  text-align: right;
}
#contacts--social {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
#contacts--social div {
  height: 30px;
  width: 30px;
  background-color: white;
  border-radius: 50%;
}
#mentions p {
  font-size: 0.8em;
  text-align: center;
}
</style>
