<template>
  <v-container>
    <BackButton />
    <v-row class="mt-6">
      <v-col class="text-center">
        <h2 class="mb-8">売上詳細</h2>
        <v-simple-table v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="mt-12">
          <thead>
            <tr>
              <th class="text-center pa-0">お客様名</th>
              <th class="text-center pa-0">料理名</th>
              <th class="text-center pa-0">料金</th>
            </tr>
          </thead>
          <tbody>
            <template>
              <tr v-for="item in salesListDitail" :key="item.id">
                <td class="pa-0">{{ item.user_name }}</td>
                <td class="pa-0"><OrderMenu :Order="item.menu_list" /></td>
                <td class="pa-0 mx-auto"><TotalPrice :Order="item.menu_list" /> </td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>

        <v-simple-table v-else class="mt-12">
          <thead>
            <tr>
              <th class="text-center">お客様名</th>
              <th class="text-center">料理名</th>
              <th class="text-center">料金</th>
            </tr>
          </thead>
          <tbody>
            <template>
              <tr v-for="item in salesListDitail" :key="item.id">
                <td>{{ item.user_name }}</td>
                <td><OrderMenu :Order="item.menu_list" /></td>
                <td><TotalPrice :Order="item.menu_list" /> </td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderMenu from '@/components/OrderMenu.vue'
import TotalPrice from '@/components/TotalPrice.vue'
import BackButton from '@/components/BackButton.vue'
import axios from 'axios'
export default {
  name: 'ListDitail',
  components: {
    OrderMenu,
    TotalPrice,
    BackButton
  },
  data() {
    return {
      created_at: this.$route.query.created_at,
      salesListDitail: []
    }
  },
  async mounted() {
    await axios.get('/api/v1/sales_list/' + this.created_at)
    .then( res => {
      this.salesListDitail = res.data.data;
    })
  }
}
</script>

<style>

</style>