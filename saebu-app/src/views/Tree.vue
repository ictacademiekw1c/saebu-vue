<template>
  <div class="container">
   
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
  </div>
</template>

<script>
// @ is an alias to /src
//import Family from "@/components/Family.vue";
import Vue2OrgTree from "vue2-org-tree";

export default {
  name: "vue2orgtree",
  components: {
    Vue2OrgTree,
  },
  data() {
    return {
      tree: {
        label: "Tjitju Saga/Andi achmad",
        children: [
          {
            label: "Label 1",
          },
          {
            label: "Label 2",
          },
          {
            label: "Label 3",
          },
        ],
      },
      collapsable: true,
    };
  },
  mounted() {},
  methods: {
    toggleCollapsable() {
      this.collapsable = !this.collapsable;
    },
    labelClass(_data) {
      return "bg_node";
    },
    renderContent(_h, data) {
      return data.label;
    },
    onNodeClick(e, _data) {
      console.log("CLICK", e);
    },
    onNodeMouseOver(_e, _data) {
      console.log("MOUSE OVER - ");
    },
    onNodeMouseOut(e, _data) {
      console.log("MOUSEOUT", e);
    },
  },
};
</script>

<style scoped>
.org-tree-container {
  background: rgba(179, 166, 114, 1);
}
</style>
