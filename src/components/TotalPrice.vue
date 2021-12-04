<template>
  <div class="text-center">
    <div v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" style="width: 60px;">
      ¥ {{ total_price | priceLocaleString }}
    </div>

    <div v-else>
      ¥ {{ total_price | priceLocaleString }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalPrice',
  props: {
    Order: Array
  },
  data(){
    return {
      order: this.Order,
      total_price: ''
    }
  },
  mounted() {
    let unit_price = 0;
    for(let i = 0; i < this.order.length; i++) {
      unit_price += (this.order[i].price * this.order[i].quantity)
    }

    this.total_price = unit_price * 1.1
  },
  filters: {
    priceLocaleString(value) {
      return value.toLocaleString();
    },
  },
}
</script>

<style>

</style>