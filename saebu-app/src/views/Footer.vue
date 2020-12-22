<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{ message }}</p>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }}</p>
    </div>
   </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
        message: "De familie Saebu App | App keturunan keluarga Saebu",
        mention: "2020 | Abu Saebu"
    };
  }
};
</script>

<style scoped>


body {
  display: flex;
  background-color: #f0f8ff;
  height: 95vh;
  justify-content: center;
  align-items: flex-end;
  font-family: Open Sans;
}

#container {
  padding-top: 20px;
  margin-top: 20px;
  width: 80vw;
  color: white;
  background-color: #292354;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
</style>
