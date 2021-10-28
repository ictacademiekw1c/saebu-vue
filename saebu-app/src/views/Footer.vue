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
  padding-top: 10px;
  margin-top: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #f3b43f;
  background-color: #102542;
}

#container:hover {
  animation: hideanim 10s ease;
}

@keyframes hideanim {
  0% {
    height: 10em;
  }
  50% {
    height: 2.8em;
  }
  60% {
    height: 0.1em;
  }
  100% {
    height: 0em;
  }
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
