<template>
  <v-container>
    <v-row class="mt-8">
      <v-col>
        <h2 class="mt-8">注文中商品</h2>
        <v-simple-table v-if="order" class="mt-4 text-center">
          <thead>
            <tr>
              <th class="text-center">注文日</th>
              <th class="text-center">受取予定日</th>
              <th class="text-center">受取予定時間</th>
              <th class="text-center">商品詳細</th>
              <th class="text-center">キャンセル</th>
            </tr>
          </thead>
          <tbody v-for="item in order" :key="item.id">
            <tr>
              <td width="30%">{{ item.created_at }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.time }}</td>
              <td>ここにテーブル</td>
              <td width="10%"><v-btn icon><v-icon>mdi-delete</v-icon></v-btn></td>
            </tr>
          </tbody>
        </v-simple-table>
        <p v-else>現在注文中の商品はありません</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'BuyingHistory',
  data() {
    return {
      // order: [],
    }
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
    }
  },
  methods: {
    getMyOrder() {
      this.$store.dispatch('getMyOrder', {user_id: this.$store.state.user.id})
    }
  },
  created() {
    this.getMyOrder()
  }
}
</script>

<style>

</style>