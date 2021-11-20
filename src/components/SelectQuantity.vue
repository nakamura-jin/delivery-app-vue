<template>
  <v-container class="pa-0" style="display: inline">
    <select v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm " @change="selectQuantity" v-model="selected" class="select">
      <option class="text-center" v-for=" quantity in allQuantity" :key="quantity.id" :value="quantity">{{ quantity }}</option>
    </select>


    <select v-else @change="selectQuantity" v-model="selected" class="select">
      <option class="text-center" v-for=" quantity in allQuantity" :key="quantity.id" :value="quantity">{{ quantity }}</option>
    </select>
  </v-container>
</template>

<script>
export default {
  props: {
    Item: Object
  },
  data(){
    return {
      allQuantity: [1, 2, 3, 4, 5],
      selected: 1,
      Id: this.Item.id
    }
  },
  methods: {
    selectQuantity() {
      const data = {
        id: this.Id,
        quantity: this.selected
      }
      this.$store.commit('SELECT_QUANTITY', data);
    }
  }
}
</script>

<style>
  .select {
    width: 40px;
    background: white;
    border-radius: 12px;
    height: 24px;
    padding: 0 14px;
  }
</style>