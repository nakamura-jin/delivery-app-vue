<template>
  <v-container>
    <v-row>
      <v-col>
        <span class="text-subtitle-1">総合売上金額 </span>
        <span class="text-h6 text-md-h4 mr-md-8">￥ {{ totalPrice(date) | priceLocaleString }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MonthTotalPrice',
  computed: {
    date() {
      return this.$store.state.setDate
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
    totalPrice() {
      let format = ''
      this.$store.state.setDate.forEach(item => {
        format = moment(item).format('YYYY-MM')
      })
      let setList = []
      this.$store.state.sales_list.forEach(item => {
        let changeFormat = moment(item.created_at).format('YYYY-MM')
        if(changeFormat == format) {
          setList.push(item)
        }
      })

      let total = 0
      setList.forEach(item => {
        item.menu_list.forEach(el => {
          total += (el.price * el.quantity) * 1.1
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