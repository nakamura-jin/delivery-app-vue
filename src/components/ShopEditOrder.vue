<template>
  <v-container class="pa-0">
    <v-card v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" max-width="500" class="mx-auto">
      <v-card-text class="text-center py-3 text-h6">注文内容</v-card-text>
        <template >
          <v-col class="d-flex px-1">
            <v-card-text class="pa-0 pt-5 pb-0" style="width:30%">受取日</v-card-text>
            <v-col class="pa-0">
              <v-select
                :items="week"
                :value="today"
                v-model="today"
                :placeholder="editOrder.date"
                hide-details>
              {{ week }}
              </v-select>
            </v-col>
          </v-col>
          <v-col class="d-flex px-1">
            <v-card-text class="pa-0 pt-5 pb-0" style="width:30%">受取時間</v-card-text>
            <v-col class="pa-0">
              <v-select
                :items="selectTime"
                :value="time"
                v-model="time"
                :placeholder="editOrder.time"
                hide-details>
              {{ setTime }}
              </v-select>
            </v-col>
          </v-col>

          <v-col class="d-flex px-1">
            <v-card-text class="pa-0 pt-5 pb-0" style="width:30%">料理名</v-card-text>
          </v-col>

          <v-col class="pl-2">
            <ul v-for="item in editOrder.menu_list" :key="item.id" style="list-style: none" class="pa-0">
              <li style="font-size: 18px">{{ item.title }}</li>
              <div class="d-flex mt-1">
                <li class="d-flex py-2 ml-auto" style="font-size: 16px;">
                  <EditOrderFoodQuantity :Food="item" @foodQuantity="foodQuantity($event, getData)" style="width: 40px; height:22px; font-size: 14px;" class="mr-2" />
                  個
                </li>
                <li class="py-2 ml-4" v-if="editOrder.menu_list.length > 1">
                  <v-btn color="error" small @click="foodDelete(editOrder, item)" style="width: 30px; height: 22px;">取消</v-btn>
                </li>
              </div>
            </ul>
          </v-col>

        </template>
      <v-card-actions class="mt-4">
        <v-spacer></v-spacer>
        <v-btn text @click="closeEditOrder">戻る</v-btn>
        <v-btn text @click="shopEditOrder">確定</v-btn>
      </v-card-actions>
    </v-card>




    <!-- スマホ以外 -->

    <v-card v-else max-width="500" class="mx-auto">
      <v-card-text class="text-center py-3 text-h6">注文内容</v-card-text>
        <template >
          <v-col class="d-flex px-10" >
            <v-card-text class="pt-5 pb-0" style="width:40%">受取日</v-card-text>
            <v-col class="pa-0">
              <v-select
                :items="week"
                :value="today"
                v-model="today"
                :placeholder="editOrder.date"
                hide-details>
              {{ week }}
              </v-select>
            </v-col>
          </v-col>
          <v-col class="d-flex px-10">
            <v-card-text class="pt-5 pb-0" style="width:40%">受取時間</v-card-text>
            <v-col class="pa-0">
              <v-select
                :items="selectTime"
                :value="time"
                v-model="time"
                :placeholder="editOrder.time"
                hide-details>
              {{ setTime }}
              </v-select>
            </v-col>
          </v-col>

          <v-col class="d-flex px-10">
            <v-card-text class="pt-5 pb-0" style="width:40%">料理名</v-card-text>
          </v-col>

          <v-col class="pl-12">
            <ul v-for="item in editOrder.menu_list" :key="item.id" style="list-style: none" class="d-flex pa-0">
              <li class="py-2">{{ item.title }}</li>
              <li class="py-2 ml-6"><EditOrderFoodQuantity :Food="item" @foodQuantity="foodQuantity($event, getData)"/> 個</li>
              <li class="py-2 ml-6" v-if="editOrder.menu_list.length > 1"><v-btn color="error" small @click="foodDelete(editOrder, item)">取消</v-btn></li>
            </ul>
          </v-col>

        </template>
      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
        <v-btn text @click="closeEditOrder">戻る</v-btn>
        <v-btn text @click="shopEditOrder">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import EditOrderFoodQuantity from '../components/EditOrderFoodQuantity'
export default {
  props: {
    Order: Object
  },
  compornents: {
    EditOrderFoodQuantity
  },
  data() {
    return {
      editOrder: this.Order,
      week: [],
      selectTime: [],
      // today: '',
      today: this.Order.date,
      // time: '',
      time: this.Order.time,
      getTime: '',
      setAlert: '',
      editFoodQuantity: []
    }
  },
  computed: {
    setTime() {
      let date = new Date()
      this.setAlert = ("0" + (date.getHours())).slice(-2) + ':' + ("0" + (date.getMinutes())).slice(-2) + ':00';
      // let getTime = ("0" + (date.getHours())).slice(-2) + ':' + ("0" + (date.getMinutes())).slice(-2);
      let getTime = this.setAlert
      // let getTime = '19:10'
      let setToday = date.getFullYear() + '年' + ("0" + (date.getMonth() + 1)).slice(-2) + '月' + ("0" + (date.getDate())).slice(-2) + '日'
      

      if(getTime < '17:30:00' && this.today == setToday || this.today != setToday) {
        this.selectTime =
          [
            '18:00', '18:15', '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '17:45:00' && this.today == setToday ){
        this.selectTime =
          [
            '18:15', '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:00:00' && this.today == setToday ){
        this.selectTime =
          [
            '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:15:00' && this.today == setToday ){
        this.selectTime =
          [
            '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:30:00' && this.today == setToday ){
        this.selectTime =
          [
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:45:00' && this.today == setToday ){
        this.selectTime =
          [
            '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:00:00' && this.today == setToday ){
        this.selectTime =
          [
            '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:15:00' && this.today == setToday ){
        this.selectTime =
          [
            '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:30:00' && this.today == setToday ){
        this.selectTime =
          [
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:45:00' && this.today == setToday ){
        this.selectTime =
          [
            '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '20:00:00' && this.today == setToday ){
        this.selectTime =
          [
            '20:30', '20:45','21:00'
          ]
      } else if(getTime < '20:15:00' && this.today == setToday ){
        this.selectTime =
          [
            '20:45','21:00'
          ]
      } else if(getTime <= '20:30:00' && this.today == setToday ){
        this.selectTime =
          [
            '21:00'
          ]
      } else {
        this.selectTime = ['本日の受付は終了しました']
      }
      // return
    }
  },


  mounted() {
    let date = new Date();
    // let getTime = ("0" + (date.getHours())).slice(-2) + ':' + ("0" + (date.getMinutes())).slice(-2);
    let getTime = this.setAlert;
    // let getTime = '20:50';
    if(getTime <= '20:30') {
      for (let i = 0; i < 6; i++) {
        let today = new Date();
        today.setDate(date.getDate() + i);
        // this.week.push(today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日');
        this.week.push(today.getFullYear() + '年' + ("0" + (today.getMonth() + 1)).slice(-2) + '月' + ("0" + (today.getDate())).slice(-2) + '日');
      }
    } else {
      for (let i = 0; i < 6; i++) {
        let today = new Date();
        today.setDate((date.getDate() + 1) + i);
        this.week.push(today.getFullYear() + '年' + ("0" + (today.getMonth() + 1)).slice(-2)  + '月' + ("0" + (today.getDate())).slice(-2) + '日');
      }
    }

  },
  methods: {
    // foodQuantity(getData) {
    //   console.log(getData)
    // },
    shopEditOrder(){
      //日付の型変更
      let date = this.today.split(/年|月|日/)
      let selectDay = date[0] + '-' + ("0" + (date[1])).slice(-2) + '-' + ("0" + (date[2])).slice(-2)

      if(this.today === this.Order.date) {
        this.today = this.Order.date
      } else {
        this.today = selectDay
      }

      // 数量変更
      let menuList = [];
      this.$store.state.editFoodQuantity.forEach(item => {
        menuList.push({id: item.id, quantity: item.quantity})
      });



      this.$store.dispatch('editShopOrder', {
        id: this.Order.id,
        user_id: this.Order.user_id,
        menu_list: menuList,
        display: 1,
        date: this.today,
        time: this.time,
      })
      this.$router.push('/order/updated_order')
      this.$emit('updateOrder')
    },

    closeEditOrder() {
      this.$emit('closeEditOrder')
    },

    foodDelete(editOrder, item) {
      let orderDelete = confirm('削除してもよろしいですか？')
      if(orderDelete) {
        this.$store.dispatch('orderMenuListDelete', {
          id: editOrder.id,
          menu_id: item.id,
          quantity: item.quantity
        })
        this.$emit('shopEditOrder')
      }
    }
  },
}
</script>

<style>

</style>