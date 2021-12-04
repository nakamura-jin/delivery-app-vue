<template>
  <v-container>
    <span>￥ {{ totalPrice(date) | priceLocaleString }}</span>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ListTotalPrice',
  props: {Date: String},
  computed: {
    date() {
      return this.Date
    },
    list() {
      return this.$store.state.sales_list
    }
  },
  filters: {
    priceLocaleString(value) {
      return value.toLocaleString();
    },
  },
  methods: {
    totalPrice(date) {
      let total = 0;
      this.$store.state.sales_list.forEach(item => {
        let changeFormat = moment(item.created_at).format('YYYY-MM-DD')
        item.menu_list.forEach(el => {
          if(changeFormat == date) {
            total += (el.price * el.quantity) * 1.1
          }
        })
      })
      return total
    }
  },
  created () {
    this.totalPrice()
  }
}
</script>

<style>

</style>