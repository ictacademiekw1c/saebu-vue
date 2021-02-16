<template>
  <div>
    <Calendar
      :min-date="new Date()"
      :data-source="getDataSource"
      @mouse-on-day="mouseOnDay"
      @mouse-out-day="mouseOutDay"
      @click-day="addBirthday"
    ></Calendar>

    <b-modal
      :title="'Verjaardag | Hari ulang tahun'"
      ok-title="Bewaar | Simpang"
      v-model="show"
      @ok="saveBirthday"
    >
      <form class="form-horizontal">
        <div class="form-group row">
          <label for="event-name" class="col-sm-2 control-label"
            >Voornaam | Nama pertama</label
          >
          <div class="col-sm-10">
            <input
              id="event-name"
              type="text"
              placeholder="Wie is er jarig | Siapa HUT"
              class="form-control"
              v-model="member.firstname"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="birthplace" class="col-sm-2 control-label"
            >Geboren te | Lahir di</label
          >
          <div class="col-sm-10">
            <input
              id="birthplace"
              placeholder="Geboorteplaats | Lahir di mana"
              type="text"
              class="form-control"
              v-model="member.birthplace"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="min-date" class="col-sm-2 control-label"
            >Verjaardag</label
          >
          <div class="col-sm-10">
            <div class="input-group input-daterange">
              <input
                id="day"
                type="number"
                class="form-control"
                v-model="member.birthdate_dd"
                disabled
              />
              <input
                id="month"
                type="number"
                class="form-control"
                v-model="member.birthdate_mm"
                disabled
              />
              <input
                id="year"
                type="number"
                class="form-control"
                v-model="member.birthdate_yy"
              />
              <input id="yearyear" type="hidden" v-model="member.birthdate" />
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Calendar from "v-year-calendar";
import { tippy } from "vue-tippy";

export default {
  components: {
    Calendar,
    // eslint-disable-next-line vue/no-unused-components
    tippy
  },
  data() {
    return {
      tooltip: null,
      show: false,
      member: {
        firstname: null,
        birthplace: null,
        birthdate_dd: null,
        birthdate_mm: null,
        birthdate_yy: null,
        birthdate: null
      }
    };
  },
  methods: {
    getDataSource: function(year) {
      return (
        this.axios
          .get(this.$strapiendpoint + "members", {})
          //.then(result => JSON.stringify(result))
          .then(result => {
            if (result.data) {
              year = !year ? new Date().getFullYear() : year;
              result.data.forEach(element => {
                element.birthyear = element.birthdate.split("-")[0];
                element.birthdate = new Date(
                  year,
                  element.birthdate.split("-")[1] - 1,
                  element.birthdate.split("-")[2]
                );
                element.birthyear =
                  element.birthyear == undefined ? "?" : element.birthyear;
                console.log(element);
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
    },
    saveBirthday: function() {
      this.$emit("ajaxCurrentlyBusyChange", true);
      this.member.birthdate_yy *= 1;
      if (
        this.member.birthdate_yy < 1900 ||
        this.member.birthdate_yy > new Date().getFullYear()
      ) {
        this.$emit("ajaxCurrentlyBusyChange", false);
        console.log("Jaar niet ok");
        alert("Tahun yang diisi tidak baik");
        return;
      }
      this.member.birthdate = [
        this.member.birthdate_yy,
        this.member.birthdate_mm,
        this.member.birthdate_dd
      ].join("-");

      this.axios
        .post(this.$strapiendpoint + "members", {
          //data: {
          firstname: this.member.firstname,
          birthplace: this.member.birthplace,
          birthdate: this.member.birthdate,
          //},
          //authorisatie is nog even uitgezet, later nog eens fixen
          headers: {
            Authorization: "Bearer " + this.$store.state.jwt
          }
        })
        .then(response => {
          console.log(response.data.id);
          this.$emit("ajaxCurrentlyBusyChange", false);
        })
        .catch(error => {
          this.$emit("ajaxCurrentlyBusyChange", false);
          console.log(error.message);
          alert("Maaf tidak disimpang");
        });
    },
    addBirthday(evt) {
      this.show = true;
      var d = evt.date;
      this.member.birthdate_mm = "" + (d.getMonth() + 1);
      this.member.birthdate_dd = "" + d.getDate();
      this.member.birthdate_yy = d.getFullYear();

      if (this.member.birthdate_mm.length < 2)
        this.member.birthdate_mm = "0" + this.member.birthdate_mm;
      if (this.member.birthdate_dd.length < 2)
        this.member.birthdate_dd = "0" + this.member.birthdate_dd;
    },
    mouseOnDay: function(e) {
      if (e.events.length > 0) {
        var content = "";

        for (var i in e.events) {
          content +=
            '<div class="event-tooltip-content">' +
            '<div class="event-name" style="color:' +
            e.events[i].color +
            '">' +
            e.events[i].name +
            "</div>" +
            '<div class="event-details">' +
            e.events[i].details +
            "</div>" +
            "</div>";
        }

        if (this.tooltip != null) {
          this.tooltip.destroy();
          this.tooltip = null;
        }

        this.tooltip = new tippy(e.element, {
          placement: "right",
          content: content,
          animateFill: false,
          animation: "shift-away",
          arrow: true
        });

        //console.log(this.tooltip);

        this.tooltip.show();
      }
    },
    mouseOutDay: function() {
      if (this.tooltip !== null) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }
};
</script>

<style scoped>
.calendar {
  padding: 18px;
}
</style>
