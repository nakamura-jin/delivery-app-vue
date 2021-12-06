<template>
  <v-container class="pa-0">
    <v-alert v-show="now >= '20:30'" class="warning text-center black--text text-caption mb-6" type="warning" dense>
      本日分の受付は終了しました<br>明日以降の受け取りになります
    </v-alert>
    <v-card max-width="400">
      <v-card-text class="text-center py-3 text-h6">最終確認</v-card-text>
        <template v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
          <v-col class="pb-0">
            <span class="text-subtitle-2">受取日</span>
            <v-select class="mt-0"
              :items="week"
              :value="today"
              v-model="today"
              hide-details
            >{{ week }}
            </v-select>
          </v-col>

          <v-col class="pt-10">
            <span class="text-subtitle-2">受取時間</span>
            <v-select class="mt-0"
              :items="selectTime" :value="time" v-model="time" hide-details
              >{{ setTime }}
            </v-select>
          </v-col>
        </template>

        <template v-else>
          <v-col class="d-flex px-10">
            <v-card-text class="pt-5 pb-0" style="width:40%">受取日</v-card-text>
            <v-col class="pa-0">
              <v-select
                :items="week"
                :value="today"
                v-model="today"
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
                hide-details>
              {{ setTime }}
              </v-select>
            </v-col>
          </v-col>
        </template>
      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
        <v-btn text @click="closeConfirm">戻る</v-btn>
        <v-btn text @click="goToCompleted">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'OrderConfirmation',
  props: {
    Cart: Array,
    Total: Number,
  },
  data() {
    return {
      myCart: this.Cart,
      totalCartPrice: this.Total,
      checkOut: [],
      week: [],
      selectTime: [],
      today: moment().format('YYYY年M月D日'),
      time: '',
      getTime: '',
      now: ''
    }
  },
  computed: {
    user() {
      if(JSON.stringify(this.$store.state.user) == []) {
        return false
      }

      return this.$store.state.user
    }
  },


  mounted() {
    this.now = moment().format('HH:mm')
    if(this.now <= '20:30') {
      // 今日含む一週間
      let start = moment()
      let week = [start.format('YYYY年M月D日')]
      for(let i = 0; i < 6; i++) {
        week.push(start.add(1, 'days').format('YYYY年M月D日'))
      }
      this.week = week
    } else {
      // 明日から一週間
      let start = moment()
      for (let i = 0; i < 7; i++) {
        this.week.push(start.add(1, 'days').format('YYYY年M月D日'))
      }
    }
  },
  methods: {
    goToCompleted(){

      let selectDay = moment().format('YYYY-MM-DD')

      let menuList = [];
      this.Cart.forEach(item => {
        menuList.push({id: item.menu_id, quantity: item.quantity})
      });

      this.$store.dispatch('checkOut', {
        user_id: this.$store.state.user.id,
        menu_list: menuList,
        date: selectDay,
        time: this.time,
      });
      this.$router.push('/checkout')
    },

    closeConfirm() {
      this.$emit('closeConfirm')
    },

    setTime() {
      let getTime = moment().format('HH:mm');
      let setToday = moment().format('YYYY年M月D日')


      if(getTime < '17:30' && this.today == setToday || this.today != setToday) {
        this.selectTime =
          [
            '18:00', '18:15', '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '17:45' && this.today == setToday ){
        this.selectTime =
          [
            '18:15', '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:00' && this.today == setToday ){
        this.selectTime =
          [
            '18:30', '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:15' && this.today == setToday ){
        this.selectTime =
          [
            '18:45',
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:30' && this.today == setToday ){
        this.selectTime =
          [
            '19:00', '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '18:45' && this.today == setToday ){
        this.selectTime =
          [
            '19:15', '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:00' && this.today == setToday ){
        this.selectTime =
          [
            '19:30', '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:15' && this.today == setToday ){
        this.selectTime =
          [
            '19:45',
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:30' && this.today == setToday ){
        this.selectTime =
          [
            '20:00', '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '19:45' && this.today == setToday ){
        this.selectTime =
          [
            '20:15', '20:30', '20:45','21:00'
          ]
      } else if(getTime < '20:00' && this.today == setToday ){
        this.selectTime =
          [
            '20:30', '20:45','21:00'
          ]
      } else if(getTime < '20:15' && this.today == setToday ){
        this.selectTime =
          [
            '20:45','21:00'
          ]
      } else if(getTime <= '20:30' && this.today == setToday ){
        this.selectTime =
          [
            '21:00'
          ]
      } else {
        this.selectTime = ['本日の受付は終了しました']
      }
      // return
    },
  },
  created() {
    this.setTime()
  }
}
</script>

<style>

</style>