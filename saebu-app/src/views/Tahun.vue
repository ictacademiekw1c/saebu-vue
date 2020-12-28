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
      :title="currentId != null ? 'Wijzig verjaardag' : 'Voeg verjaardag toe'"
      ok-title="Bewaar"
      v-model="show"
      @ok="saveBirthday"
    >
      <form class="form-horizontal">
        <div class="form-group row">
          <label for="event-name" class="col-sm-2 control-label"
            >Naam | Nama lengkap</label
          >
          <div class="col-sm-10">
            <input
              id="event-name"
              type="text"
              class="form-control"
              v-model="currentName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="event-location" class="col-sm-2 control-label"
            >Geboren in</label
          >
          <div class="col-sm-10">
            <input
              id="event-location"
              type="text"
              class="form-control"
              v-model="currentLocation"
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
                id="min-date"
                type="date"
                class="form-control"
                v-model="birthdayDate"
              />
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
    tippy
  },
  data() {
    return {
      tooltip: null,
      show: false,
      currentName: null,
      birthdayDate: null
    };
  },
  methods: {
    getDataSource: function() {
      return [
        {
          startDate: new Date("2020/12/28"),
          endDate: new Date("2020/12/28"),
          name: "Pietje",
          details: "Geboren in 1988"
        },
        {
          startDate: new Date("2020/12/29"),
          endDate: new Date("2020/12/29"),
          name: "Jacky Potetie",
          location: "Waar geboren",
          details: "Geboren in 1989"
        }
      ];

      /*****
      fetch(`https://api.github.com/search/issues?q=repo:Paul-DS/bootstrap-year-calendar%20created:${year}-01-01..${year}-12-31`)
        .then(result => result.json())
        .then(result => {
          if (result.items) {
            return result.items.map(r => ({
              startDate: new Date(r.created_at),
              endDate: new Date(r.created_at),
              name: '#' + r.number + ' - ' + r.title,
              details: r.comments + ' comments'
            }));
          }

          return [];
      *****/
    },
    addBirthday(evt) {
      this.show = true;
      this.currentName = "Jarige job";
      //console.log(evt.date.toLocaleDateString());
      var d = evt.date;
      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      this.birthdayDate = [year, month, day].join("-");
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
