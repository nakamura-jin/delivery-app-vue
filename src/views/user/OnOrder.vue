<template>
  <v-container>
    <v-row>
      <v-col>
        <BackButton />
        <div v-if="$vuetify.breakpoint.xs && orderList.length > 0 || $vuetify.breakpoint.sm && order.length > 0">
          <h2 class="mb-4 text-center">注文情報</h2>

          <v-simple-table class="pa-0">
            <template>
              <thead>
                <tr>
                  <th class="text-center pt-2 pb-1">
                    <span>受取日</span>
                  </th>
                  <th class="text-center">
                    受取時間
                  </th>
                  <th class="text-center">
                    <span>注文<br>詳細</span>
                  </th>
                  <th class="text-center">
                    料金
                  </th>
                  <th class="text-center">
                    詳細
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in orderList" :key="item.id">
                  <!-- 受取日 -->
                  <td class="text-center">
                    {{ item.date }}
                  </td>

                  <!-- 受取時間 -->
                  <td class="text-center">
                    {{ item.time }}
                  </td>

                  <!-- 料理詳細 -->
                  <td>
                    <v-btn icon @click="mobileFoodDitail(item)"><v-icon>mdi-chevron-down</v-icon></v-btn>
                  </td>

                  <!-- 合計 -->
                  <td class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

        </div>



        <!----- スマホ以上 ----->



        <div v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm && orderList.length > 0">
          <h2 class="mb-6 text-center mx-auto">注文情報</h2>

          <v-simple-table class="pa-0">
            <template>
              <thead>
                <tr>
                  <th class="text-center text-subtitle-2 font-weight-bold">
                    受取日
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold">
                    受取時間
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="28%">
                    料理名
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="10%">
                    数量
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="12%">
                    料金
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderList" :key="item.id">
                  <!-- 調理状況 -->
                  <td class="text-center">
                    {{ item.date}}
                  </td>

                  <!-- 受取時間 -->
                  <td class="text-center">
                    {{ item.time }}
                  </td>

                  <!-- 料理名 -->
                  <td>
                    <OrderMenu class="my-2" :Order="item.menu_list" />
                  </td>

                  <!-- 数量 -->
                  <td class="text-center">
                    <OrderQuantity :Order="item.menu_list"/>
                  </td>

                  <!-- 合計 -->
                  <td class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>
                </tr>

              </tbody>
            </template>
          </v-simple-table>

        </div>
        <div v-if="orderList.length == 0" class="mt-12">
          <p class="text-center text-h6 text-md-h5 font-weight-bold">現在注文はありません</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import BackButton from '@/components/BackButton.vue'
  import OrderMenu from '@/components/OrderMenu.vue'
  import OrderQuantity from '@/components/OrderQuantity.vue'
  import TotalPrice from '@/components/TotalPrice.vue'

  import axios from 'axios'
  export default {
    name: 'OnOrder',
    components: {
      BackButton,
      OrderMenu,
      OrderQuantity,
      TotalPrice
    },
    data() {
      return {
        orderList: []
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
    },

    mounted() {
      axios.get('/api/v1/order/user/' + this.$store.state.user.id)
      .then(res => {
        this.orderList = res.data.data
      })
    }

  }

</script>
