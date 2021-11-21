<template>
  <v-container>
    <h1 class="text-center text-h5">カート一覧</h1>
    <template v-if="this.$store.state.cart.length >= 1">
      <v-row>
        <v-col class="pa-2 pa-0 px-md-8 d-sm-flex flex-wrap">
          <v-card v-for="item in cart" :key="item.id" class="ma-3" max-width="340px">
            <v-card-title class="text-subtitle-1 text-sm-h6 py-2">{{ item.menu_title }}</v-card-title>
            <v-col class="d-flex py-1">
              <v-col class="pa-0 pb-2" cols="6">
                <v-img :src="item.menu_image" width="100%"></v-img>
              </v-col>
                <v-col class="py-1 pr-0">
                  <v-col class="py-1 px-0" height="30">
                    <!-- <v-card-text class="hidden-sm-and-down pa-0 pb-6">{{ item.menu_discription }}</v-card-text> -->
                    <v-col class="pa-0">
                      <v-card-text class="pa-0 text-md-subtitle-1">数量: {{ item.quantity }}</v-card-text>
                      <v-card-text class="pa-0 text-md-subtitle-1">税抜価格 ¥ {{ totalPrice(item.quantity, item.menu_price)| priceLocaleString }}</v-card-text>
                    </v-col>
                    <!-- スマホ -->
                    <v-col v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="d-flex pa-0 pt-4">
                      <v-btn @click.prevent="removeCart(item.id)" color="error" class="ml-auto" small>削除</v-btn>
                    </v-col>
                    <!-- pc -->
                    <v-col v-else class="text-right pa-0 pt-6">
                      <v-btn @click.prevent="removeCart(item.id)" color="error" class="ml-3 px-8 font-weight-bold text-sm-subtitle-1">削除</v-btn>
                    </v-col>
                  </v-col>
                </v-col>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-col class="text-right px-0">
        <v-card class="py-2" color="pink lighten-4" tile light>
          <v-card-text background-color="pink" class="pr-6 px-0 py-0 font-weight-bold text-h6" style="color: red;">合計 ¥ {{ totalCartPrice | priceLocaleString }} (税込)</v-card-text>
        </v-card>
      </v-col>
      <v-col class="px-0 mx-auto mt-3" sm="6" md="4">
        <v-btn width="100%" color="error" large class="font-weight-bold text-subtitle-1" @click.stop="confirm = true">上記内容で注文する</v-btn>
      </v-col>
    </template>

    <!-- カートなし -->
    <template v-else>
      <v-row justify="center" class="mt-12" top="50%">
        <!-- <v-col cols="12"> -->
          <!-- <v-img src="https://test-izakaya.s3.ap-northeast-1.amazonaws.com/cart.png" width="140" class="mx-auto" ></v-img> -->
        <!-- </v-col> -->
          <span class="mt-10 text-h5 font-weight-bold">カートは空です</span>
      </v-row>
    </template>
    <v-dialog v-model="confirm" max-width="400">
      <OrderConfirmation :Cart="cart" :Total="totalCartPrice" @closeConfirm="confirm = false"/>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderConfirmation from '@/components/OrderConfirmation.vue'
export default {
  name: 'Cart',
  components: {
    OrderConfirmation
  },
  data() {
    return {
      option: [
        1, 2, 3, 4
      ],
      confirm: false
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
    user() {
      if(JSON.stringify(this.$store.state.user) == []) {
        return false
      }

      return this.$store.state.user
    },
    ...mapGetters(['totalCartPrice'])
  },
  methods: {
    back() {
      this.$router.push('/top')
    },
    removeCart(id) {
      this.$store.dispatch('removeCart', {cart_id: id});
    },
    totalPrice(quantity, price) {
      return quantity * price
    },
    getCartItems() {
      this.$store.dispatch('getCartItems', {user_id: this.$store.state.user.id})
    }
  },
  filters: {
    priceLocaleString(value) {
      return  value.toLocaleString();
    },
    taxPrice(value) {
      return  value.toLocaleString();
    },
  },

  created() {
    this.totalPrice();
    this.getCartItems();
  }
}
</script>


