<template>
  <v-container>
    <v-row>
      <v-col class="mt-8">
        <BackButton />
        <h2 class="mt-12 ml-md-12">注文中商品</h2>
        <v-simple-table v-if="order" class="mt-4 text-center" >
          <thead>
            <tr>
              <th class="text-center">注文日</th>
              <th class="text-center">受取予定日</th>
              <th class="text-center">受取予定時間</th>
              <th class="text-center">商品詳細</th>
              <th class="text-center">合計金額</th>
              <th class="text-center">キャンセル</th>
            </tr>
          </thead>
          <tbody v-for="item in order" :key="item.id">
            <tr>
              <td width="10%">{{ item.created_at | momentDate }}</td>
              <td width="10%">{{ item.date }}</td>
              <td width="10%">{{ item.time }}</td>
              <td width="30%">
                <UserOrderList :OrderItem="item.menu_list"/>
              </td>
              <td width="10%">{{ myOrderTotalPrice | priceLocaleString }} 円</td>
              <td width="10%"><v-btn icon><v-icon>mdi-delete</v-icon></v-btn></td>
            </tr>
          </tbody>
        </v-simple-table>
        <p v-else>現在注文中の商品はありません</p>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col>
        <h2 class="mt-8 ml-md-12">購入履歴(過去3ヶ月)</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import UserOrderList from '@/components/UserOrderList.vue'
import BackButton from '@/components/BackButton.vue'
import { mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  name: 'BuyingHistory',
  components: {
    UserOrderList,
    BackButton
  },
  computed: {
    user() {
      if(JSON.stringify(this.$store.state.user) == []) {
        return false
      }
      return this.$store.state.user
    },
    order() {
      return this.$store.state.myOrder
    },
    ...mapGetters(['myOrderTotalPrice'])
  },
  methods: {
    getMyOrder() {
      this.$store.dispatch('getMyOrder', {user_id: this.$store.state.user.id});
    },
    // myOrderTotalPrice(item) {
    //   console.log(item)
    // }
  },
  filters: {
    momentDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    priceLocaleString(value) {
      return  value.toLocaleString();
    },
  },
  created() {
    this.getMyOrder();
    // this.myOrderTotalPrice();
  }
}
</script>
