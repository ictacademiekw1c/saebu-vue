<template>
  <!-- voorbeeld van https://github.com/r3code/vue-vis-network/blob/master/example/src/App.vue -->
  <div class="wrapper">
    <h2>Pohon keluarga | Familie stamboom</h2>
    <b-form-radio-group
      id="radio-group"
      v-model="selected"
      :options="options"
      name="radio-options"
    ></b-form-radio-group>
    <b-button
      v-if="selected == 'marriage'"
      v-bind:class="{
        green: this.aPair.filter(a => a.label == '?').length == 0,
        red: this.aPair.filter(a => a.label == '?').length == 1
      }"
      @click="addCoupleEdge"
      >{{ lbl1 }} heeft een relatie met {{ lbl2 }}</b-button
    >
    <b-button
      @click="addMotherChildEdge"
      v-if="selected == 'motherchild'"
      v-bind:class="{
        green: this.aPair.filter(a => a.label == '?').length == 0,
        red: this.aPair.filter(a => a.label == '?').length == 1
      }"
      >{{ lbl1 }} is moeder van {{ lbl2 }}</b-button
    >

    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @select-node="selectThisNode"
    ></network>
  </div>
</template>

<script>
import { Network } from "vue-vis-network";

let defNodes = [];
let defEdges = [];
const emptyPair = [
  { id: null, label: "?" },
  { id: null, label: "?" }
];

export default {
  data: () => ({
    networkEvents: "",
    network: {},
    aPair: emptyPair,
    lbl1: "?",
    lbl2: "?",
    selected: "marriage",
    options: [
      { text: "Voeg een relatie toe", value: "marriage" },
      { text: "Voeg een moeder-kind relatie toe", value: "motherchild" }
    ]
  }),
  beforeMount() {
    this.initNodesEdges();
  },
  components: {
    Network
  },
  computed: {
    gPerson1() {
      return this.aPair[0].label;
    },
    gPerson2() {
      return this.aPair[1].label;
    }
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    initNodesEdges() {
      this.network = {
        nodes: defNodes.slice(0),
        edges: defEdges.slice(0),
        options: {
          nodes: {
            shape: "circle",
            size: 20,
            color: {
              border: "grey",

              highlight: {
                border: "black",
                background: "white"
              },
              hover: {
                border: "orange",
                background: "grey"
              }
            },
            font: { color: "black" },
            shapeProperties: {
              useBorderWithImage: true
            }
          },
          edges: {
            color: "black"
          }
        }
      };
      //familieleden ophalen
      this.axios.get(this.$strapiendpoint + "members", {}).then(result => {
        if (result.data) {
          result.data.forEach(member => {
            this.network.nodes.push({
              id: member._id,
              label: member.firstname
            });
          });
        }
      });
      //relaties ophalen
      this.axios.get(this.$strapiendpoint + "pairs", {}).then(result => {
        if (result.data) {
          result.data.forEach(pair => {
            if (pair.pairType == "motherchild") {
              this.network.edges.push({
                id: pair._id,
                from: pair.member1,
                to: pair.member2,
                arrows: "from"
              });
            } else {
              //marriage
              this.network.edges.push({
                id: pair._id,
                from: pair.member1,
                to: pair.member2,
                dashes: true,
                color: "red"
              });
            }
          });
        }
      });
    },
    addCoupleEdge() {
      if (this.aPair.findIndex(el => el.label == "?") == -1) {
        if (
          this.network.edges.findIndex(
            edge => edge.from == this.aPair[0].id && edge.to == this.aPair[1].id
          ) == -1 &&
          this.network.edges.findIndex(
            edge => edge.from == this.aPair[1].id && edge.to == this.aPair[0].id
          ) == -1
        ) {
          this.network.edges.push({
            from: this.aPair[0].id,
            to: this.aPair[1].id,
            dashes: true,
            color: "red"
          });
          this.$emit("ajaxCurrentlyBusyChange", true);
          this.axios
            .post(this.$strapiendpoint + "pairs", {
              //data: {
              pairType: "marriage",
              member1: this.aPair[0].id,
              member2: this.aPair[1].id,
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
        } else {
          alert("Dit paar bestaat reeds | dua-dua ini sudah ada");
        }
      }
    },
    addMotherChildEdge() {
      if (this.aPair.findIndex(el => el.label == "?") == -1) {
        if (
          this.network.edges.findIndex(
            edge => edge.from == this.aPair[0].id && edge.to == this.aPair[1].id
          ) == -1 &&
          this.network.edges.findIndex(
            edge => edge.from == this.aPair[1].id && edge.to == this.aPair[0].id
          ) == -1
        ) {
          this.network.edges.push({
            from: this.aPair[0].id,
            to: this.aPair[1].id,
            arrows: "from"
          });

          this.$emit("ajaxCurrentlyBusyChange", true);
          this.axios
            .post(this.$strapiendpoint + "pairs", {
              //data: {
              pairType: "motherchild",
              member1: this.aPair[0].id,
              member2: this.aPair[1].id,
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

          this.aPair[1].id = null;
          this.aPair[1].label = "?";
          this.lbl2 = "?";
        }
      } else {
        alert("Deze moeder-kind bestaat reeds | Ibu-anak relasi ini sudah ada");
      }
    },
    resetNetwork() {
      this.network = {
        nodes: defNodes.slice(0),
        edges: defEdges.slice(0),
        options: {}
      };
    },
    selectThisNode(e) {
      //zoek de geselecteerde node en de index voor het koppel
      var nd = this.network.nodes.find(node => node.id == e.nodes[0]);
      var idx = this.aPair.findIndex(el => el.label == "?");

      if (idx == -1) {
        this.aPair[1].id = null;
        this.aPair[1].label = "?";
        idx = 0;
      }

      this.aPair[idx] = { id: e.nodes[0], label: nd.label };

      this.lbl1 = this.aPair[0].label;
      this.lbl2 = this.aPair[1].label;
      console.log(this.aPair);
    },
    removeNode() {
      this.network.nodes.splice(0, 1);
    },
    removeEdge() {
      this.network.edges.splice(0, 1);
    }
  }
};
</script>

<style>
* {
  font-family: sans-serif;
}

.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}

.network {
  height: 70vh;
}
canvas {
  position: absolute;
  top: 0%;
  left: 0%;
}

aside {
  display: none;
}

.green,
.green:hover {
  background-color: darkolivegreen;
}
.red {
  background-color: red;
}
</style>
