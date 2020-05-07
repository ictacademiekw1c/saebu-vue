<template>
  <div class="family">
    <h1>Familieboom | Pohon sekeluarga</h1>
      <vue2-org-tree
        :data="tree"
        :labelWidth="90"
        :labelClassName="labelClass"
        :render-content="renderContent"
        @on-node-click="onNodeClick"
        @on-node-mouseover="onNodeMouseOver"
        @on-node-mouseout="onNodeMouseOut"
      />
  </div>
</template>

<script>
export default {
  name: "Family",
  props: {
  },
 data() {
      return {
         tree: {
          label: 'Owner',
          children: [{
            label: 'Label 1'
          },{
            label: 'Label 2'
          },{
            label: 'Label 3'
          }]
        }
      }
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
