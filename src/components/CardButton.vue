<template>
  <div>
    <v-btn v-if="addedCart" color="primary" disabled class="ma-0"><v-icon small>mdi-cart</v-icon>追加済み</v-btn>
    <v-btn v-else color="error" @click="addToCart"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    Item: Object,
    userId: Number
  },
  data() {
    return {
      user: this.$store.state.user,
      quantity: 1
    }
  },
  methods: {
    addToCart() {
      if(this.$store.state.user.role_id!= 3) {
        alert('ユーザーのみ利用可能です')
      } else {
        this.$store.state.quantity.forEach(el => {
          if(this.Item.id == el.id) {
            this.quantity = el.quantity
          }
        })

        this.$store.dispatch('addMenuToCart', {
          user_id: this.userId,
          menu_id: this.Item.id,
          quantity: this.quantity,
        })
      }
    },
  },
  computed: {
    addedCart(){
      let cart = this.$store.state.cart.some(item => {
        return item.menu_id === this.Item.id
      })
      if(cart) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style>

</style>