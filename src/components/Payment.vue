<template>
  <v-container class="pa-0">
    <template>
      <v-card>
        <v-card-text class="text-center text-h6 py-4 font-weight-bold">決済しますか？</v-card-text>
        <v-col>
          <v-card-text class="py-0 text-caption">お客様名</v-card-text>
          <v-card-text class="text-center text-subtitle-1">{{ paymentData.user }}</v-card-text>
          <v-card-text class="py-0 text-caption">合計金額</v-card-text>
          <v-card-text class="text-center text-subtitle-1">￥ {{ paymentData.totalPrice | priceLocaleString }}</v-card-text>
        </v-col>

        <v-col class="text-right">
          <v-btn @click="closeCashModal" class="font-weight-bold" color="error">戻る</v-btn>
          <v-btn @click="payment(paymentData.order)" class="ml-6 font-weight-bold" color="primary">決済</v-btn>
        </v-col>
      </v-card>
    </template>
  </v-container>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Payment',
  computed: {
    paymentData() {
      return this.$store.state.cashRegister
    }
  },
  filters: {
    priceLocaleString(value) {
      return  value.toLocaleString();
    },
  },
  methods: {
    async payment(item) {
      let menuList = [];
      item.menu_list.forEach(element => {
        menuList.push({id: element.id, quantity: element.quantity})
      });
      // await axios.post('/api/v1/sales_list', {
      //   user_id: item.user_id,
      //   menu_list: menuList,
      //   date: item.date,
      //   time: item.time
      // })
      this.$store.dispatch('setSalesList', {
        id: item.id,
        user_id: item.user_id,
        menu_list: menuList,
        display: 0,
        date: item.date,
        time: item.time,
      })
      .then(() => {
        this.closeCashModal()
      })
    },
    closeCashModal() {
      this.$emit('closeCashModal')
    }
  }
}
</script>

<style>

</style>