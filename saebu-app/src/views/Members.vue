<template>
  <h1>Familieleden</h1>

</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      member: {
        firstname: null,
        birthplace: null,
        birthdate_dd: null,
        birthdate_mm: null,
        birthdate_yy: null,
        birthdate: null
      },
      datasource: null
    };
  },
  created: function() {
    this.datasource = this.getDataSource();
    console.log(this.datasource);
  },
  methods: {
    getDataSource: async function(year) {
      return (
        await this.axios
          .get(this.$strapiendpoint + "members", {
            headers: {
              Authorization: "Bearer " + this.$store.state.jwt
            }
          })
          .then(result => {
            if (result.data) {
              result.data.forEach(element => {
                element.birthyear = element.birthdate.split("-")[0];
                element.birthdate = new Date(
                  element.birthdate.split("-")[0],
                  element.birthdate.split("-")[1] - 1,
                  element.birthdate.split("-")[2]
                );
                element.birthyear =
                  element.birthyear == undefined ? "?" : element.birthyear;
                
              });
              return result.data.map(r => ({
                startDate: new Date(r.birthdate),
                endDate: new Date(r.birthdate),
                name: r.firstname,
                details:
                  "Geboren|Lahir di " + r.birthplace + " in|di " + r.birthyear
              }));
            }
          })
      );
    }
  }
};
</script>

<style scoped>
.calendar {
  padding: 18px;
}
</style>
