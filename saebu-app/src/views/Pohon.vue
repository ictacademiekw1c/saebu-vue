<template>
  <div class="wrapper">
    <h2>Pohon kelurga | Familie stamboom</h2>
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="networkEvent('click')"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="networkEvent('selectNode')"
      @select-edge="networkEvent('selectEdge')"
      @deselect-node="networkEvent('deselectNode')"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('dragEnd')"
      @hover-node="networkEvent('hoverNode')"
      @blur-node="networkEvent('blurNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="
        networkEvent('stabilizationIterationsDone')
      "
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')"
    ></network>
    <button @click="addNode">Add node</button>
    <button @click="addEdge">Add edge</button>
    <!--    <button @click="resetNetwork">Reset Network</button>
    <button @click="removeNode">Remove Node</button>
    <button @click="removeEdge">Remove Edge</button> -->
    <div class="events">
      <p>
        Network events:
        <br />
        {{ networkEvents }}
      </p>
    </div>
  </div>
</template>

<script>
import { Network } from "vue-vis-network";

let defNodes = [
  { id: 1, label: "Abu" },
  { id: 2, label: "Brechtje" },
  { id: 4, label: "Jiwa" },
  { id: 5, label: "Anais" },
  {
    id: 3,
    label: "X"
  }
];

let defEdges = [
  { id: 1, from: 1, to: 3, color: "blue", length: 0.1 },
  { id: 2, from: 2, to: 3, color: "blue", length: 0.1 },
  { id: 3, from: 1, to: 2, color: "blue", length: 0.1 },
  { id: 4, from: 4, to: 3, arrows: "to" },
  { id: 5, from: 5, to: 3, arrows: "to" }
];

export default {
  data: () => ({
    networkEvents: "",
    network: {
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
    }
  }),
  components: {
    Network
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    addNode() {
      const id = new Date().getTime();
      this.network.nodes.push({ id, label: "New node" });
    },
    addEdge() {
      const n1 = Math.floor(Math.random() * this.network.nodes.length);
      const n2 = Math.floor(Math.random() * this.network.nodes.length);
      this.network.edges.push({
        id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
        from: this.network.nodes[n1].id,
        to: this.network.nodes[n2].id
      });
    },
    resetNetwork() {
      this.network = {
        nodes: defNodes.slice(0),
        edges: defEdges.slice(0),
        options: {}
      };
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
</style>
