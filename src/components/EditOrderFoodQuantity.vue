<template>
  <select @change="changeQuantity" v-model="editQuantity" class="select">
    <option class="text-center" v-for=" quantity in allQuantity" :key="quantity.id" :value="quantity">{{ quantity }}</option>
  </select>
</template>

<script>
export default {
  name: 'EditOrderFoodQuantity',
  props: {
    Food: Object
  },
  data(){
    return {
      allQuantity: [1, 2, 3, 4, 5],
      editQuantity: this.Food.quantity,
    }
  },
  methods: {
    changeQuantity() {
      const getData = {
        id: this.Food.id,
        quantity: this.editQuantity
      }
      this.$store.commit('EDIT_FOOD_QUANTITY', getData)
    },
  },

}
</script>

<style>
  .select {
    width: 40px;
    background: white;
    border-radius: 12px;
    height: 24px;
  }
</style>