<template>
  <v-container>
    <v-row>
      <v-col>
        <BackButton />
        <div v-if="$vuetify.breakpoint.xs && order.length > 0 || $vuetify.breakpoint.sm && order.length > 0">
          <h2 class="mb-4 text-center">注文一覧</h2>
          <v-col class="pa-0 ma-0" v-if="alert">
            <DeleteAlert />
          </v-col>

          <v-simple-table class="pa-0">
            <template>
              <thead>
                <tr>
                  <th class="text-center pt-2 pb-1">
                    <span>調理<br>状態</span>
                  </th>
                  <th class="text-center">
                    受取時間
                  </th>
                  <th class="text-center">
                    <span>お客様</span>
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
                  <th class="text-center">
                    決済
                  </th>
                  <th class="text-center">
                    削除
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in order" :key="item.id">
                  <!-- 調理状況 -->
                  <td class="text-center">
                    <OrderCooked :order="item" />
                  </td>

                  <!-- 受取時間 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center text-caption">
                    {{ item.time}}
                  </td>
                  <td v-else class="text-center">
                    {{ item.time }}
                  </td>

                  <!-- お客様名 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    {{ item.user_name }}
                  </td>
                  <td v-else class="text-center">
                    {{ item.user_name }}
                  </td>

                  <!-- 料理詳細 -->
                  <td>
                    <v-btn icon @click="mobileFoodDitail(item)"><v-icon>mdi-chevron-down</v-icon></v-btn>
                  </td>

                  <!-- 合計 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>
                  <td v-else class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>

                  <!-- 編集 -->
                  <td class="text-center"><v-btn icon color="success" style="width: 30px;" :disabled="item.cooked == 0" @click="shopOrderEdit(item)"><v-icon class="text-subtitle-2 text-md-h6">mdi-file-find</v-icon></v-btn></td>
                  <!-- 決済 -->
                  <td class="text-center"><v-btn icon color="primary" style="width: 30px;" :disabled="item.cooked == 0" @click="cashRegister(item)"><v-icon class="text-subtitle-2 text-md-h6">mdi-cash-register</v-icon></v-btn></td>
                  <!-- 削除 -->
                  <td class="text-center"><v-btn icon color="error" style="width: 30px;" @click="shopOrderDelete(item)"><v-icon class="text-subtitle-2 text-md-h6">mdi-delete</v-icon></v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <!-- 料理詳細モーダル -->
          <v-dialog v-model="ditail" width="500">
            <MobileFoodDitail @closeDitail="ditail = false" />
          </v-dialog>

          <!-- 編集モーダル -->
          <v-dialog v-model="editOrder" max-width="500">
            <ShopEditOrder
              :Order="editOrderMenu"
              v-if="editOrder"
              @closeEditOrder="editOrder = false"
              @updateOrder="editOrder= false"
              @shopEditOrder="editOrder = false, alert = false" />
          </v-dialog>

          <!-- 決済モーダル -->
            <v-dialog v-model="cash" width="300">
              <Payment @closeCashModal="cash = false" />
            </v-dialog>

        </div>



        <!----- スマホ以上 ----->



        <div v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm && order.length > 0">
          <h2 class="mb-6 text-center mx-auto">注文一覧</h2>
          <v-col class="pa-0 ma-0" v-if="alert">
            <DeleteAlert />
          </v-col>

          <v-simple-table class="pa-0">
            <template>
              <thead>
                <tr>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="12%">
                    調理状態
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold">
                    受取時間
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="12%">
                    お客様名
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
                  <th class="text-center text-subtitle-2 font-weight-bold" width="6%">
                    編集
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="6%">
                    決済
                  </th>
                  <th class="text-center text-subtitle-2 font-weight-bold" width="6%">
                    削除
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order" :key="item.id">
                  <!-- 調理状況 -->
                  <td class="text-center">
                    <OrderCooked :order="item" />
                  </td>

                  <!-- 受取時間 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    {{ item.time}}
                  </td>
                  <td v-else class="text-center">
                    {{ item.time }}
                  </td>

                  <!-- お客様名 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    {{ item.user_name }}
                  </td>
                  <td v-else class="text-center">
                    {{ item.user_name }}
                  </td>

                  <!-- 料理名 -->
                  <td v-if="item.cooked == 0" class="my-2" style="color: #555">
                    <OrderMenu :Order="item.menu_list" />
                  </td>
                  <td v-else>
                    <OrderMenu class="my-2" :Order="item.menu_list" />
                  </td>

                  <!-- 数量 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    <OrderQuantity :Order="item.menu_list"/>
                  </td>
                  <td v-else class="text-center">
                    <OrderQuantity :Order="item.menu_list"/>
                  </td>

                  <!-- 合計 -->
                  <td v-if="item.cooked == 0" style="color: #555" class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>
                  <td v-else class="text-center">
                    <TotalPrice :Order="item.menu_list"/>
                  </td>

                  <!-- 編集 -->
                  <td class="text-center"><v-btn icon color="success" :disabled="item.cooked == 0" @click="shopOrderEdit(item)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
                  <!-- 決済 -->
                  <td class="text-center"><v-btn icon color="primary" @click="cashRegister(item)"><v-icon class="text-caption text-md-h6">mdi-cash-register</v-icon></v-btn></td>
                  <!-- 削除 -->
                  <td class="text-center"><v-btn icon color="error" @click="shopOrderDelete(item)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
                </tr>

              </tbody>
            </template>
          </v-simple-table>

          <!-- 編集モーダル -->
          <v-dialog v-model="editOrder" max-width="500">
            <ShopEditOrder
              :Order="editOrderMenu"
              v-if="editOrder"
              @closeEditOrder="editOrder = false"
              @updateOrder="editOrder= false"
              @shopEditOrder="editOrder = false, alert = false" />
          </v-dialog>

          <!-- 決済モーダル -->
          <v-dialog v-model="cash" width="300">
            <Payment @closeCashModal="cash = false" />
          </v-dialog>

        </div>
        <div v-if="order.length == 0" class="mt-12">
          <p class="text-center text-h6 text-md-h5 font-weight-bold">現在注文はありません</p>
        </div>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import DeleteAlert from '@/components/DeleteAlert.vue'
import OrderCooked from '@/components/OrderCooked.vue'
import OrderMenu from '@/components/OrderMenu.vue'
import OrderQuantity from '@/components/OrderQuantity.vue'
import ShopEditOrder from '@/components/ShopEditOrder.vue'
import TotalPrice from '@/components/TotalPrice.vue'
import BackButton from '@/components/BackButton.vue'
import MobileFoodDitail from '@/components/MobileFoodDitail.vue'
import Payment from '@/components/Payment.vue'

// import axios from 'axios'

export default {
  name: 'Order',
  components: {
    DeleteAlert,
    OrderCooked,
    OrderMenu,
    OrderQuantity,
    ShopEditOrder,
    TotalPrice,
    BackButton,
    MobileFoodDitail,
    Payment,
  },
  data(){
    return {
      editOrder: false,
      cash: false,
      alert: false,
      ditail: false,
      editOrderMenu: '',
      totalPrice: '',
      finish: false
    }
  },
  computed: {
    order() {
      return this.$store.state.order
    },
    shopEditOrder() {
      return this.$store.state.editOrder
    },
    cart() {
      return this.$store.state.cart
    },
    paid() {
      return this.$store.state.paid
    }
  },
  mounted() {
    this.$store.dispatch('getOrder')

    // ページを開いた状態でもリアルタイムで更新できるようにする今後編集
    // this.$echo.channel('delivery-app')
    //   .listen('OrderCreated', (e) => {
    //     this.$store.dispatch('getOrder')
    //     console.log(e)
    //   });

  },

  methods: {
    mobileFoodDitail(item) {
      this.ditail = true;
      this.$store.commit('MOBILE_FOOD_DITAIL', item.id)
    },

    shopOrderEdit(item) {
      let setList = [];
      item.menu_list.forEach(el => {
        setList.push({id: el.id, quantity: el.quantity})
      })

      this.$store.commit('SET_EDIT_MENU_LIST', setList)

      this.editOrderMenu = item
      this.editOrder = true
    },

    cashRegister(item) {
      this.cash = true
      this.$store.commit('CASH_REGISTER', { user_name: item.user_name, id: item.id, order: item })
    },

    shopOrderDelete(item) {
      let orderDelete = confirm('本当に削除してもよろしいですか？');
      if(orderDelete) {
        let itemMenuList = [];
        item.menu_list.forEach(value => {
          itemMenuList.push({id: value.id, quantity: value.quantity})
        })
        this.$store.dispatch('editShopOrder', {
          id: item.id,
          user_id: item.user_id,
          menu_list: itemMenuList,
          display: 0,
          date: item.date,
          time: item.time
        })
      }
    },

    shopOrderDitail(item) {
      this.$router.push('/order/' + item.id)
    },
  },
  filters: {
    priceLocaleString(value) {
      return  value.toLocaleString();
    },
  }
}
</script>

<style>
</style>