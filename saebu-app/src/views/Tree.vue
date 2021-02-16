<template>
  <div class="tree">
    <Vue2OrgTree
      :data="tree"
      :labelWidth="200"
      :labelClassName="labelClass"
      :render-content="renderContent"
      @on-node-click="onNodeClick"
      @on-node-mouseover="onNodeMouseOver"
      @on-node-mouseout="onNodeMouseOut"
    />
  </div>
</template>

<script>
// @ is an alias to /src
//import Family from "@/components/Family.vue";
import Vue2OrgTree from "vue2-org-tree";

export default {
  name: "vue2orgtree",
  components: {
    Vue2OrgTree
  },
  computed: {},
  data() {
    return {
      tree: {
        label: "Tjitju Saga/Andi achmad",
        children: [
          {
            label: "Label 1"
          },
          {
            label: "Label 2"
          },
          {
            label: "Label 3"
          }
        ]
      },
      collapsable: true
    };
  },
  methods: {
    labelClass(data) {
      return "bg_node";
    },
    renderContent(h, data) {
      return data.label;
    },
    onNodeClick(e, data) {
      console.log("CLICK", e);
    },
    onNodeMouseOver(e, data) {
      console.log("MOUSE OVER - ");
    },
    onNodeMouseOut(e, data) {
      console.log("MOUSEOUT", e);
    }
  }
};
</script>

<style scoped>
.org-tree-container {
  background: rgba(179,166,114,1);
}
</style>
