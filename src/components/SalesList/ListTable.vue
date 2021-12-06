<template>
  <v-container>
    <BackButton :Month="dates[0]" />
    <v-row class="mt-6">
      <v-col>
        <h2 class="text-center">{{ value | monthFormat }}月 売上リスト</h2>
        <v-col md="4" class="ml-auto">
          <v-select :items="setMonth" v-model="value">{{ changeMonth(value) }}</v-select>
        </v-col>
        <v-simple-table class="mx-4">
          <thead>
            <tr>
              <th class="text-center text-subtitle-1 font-weight-bold">日付</th>
              <th class="text-center text-subtitle-1 font-weight-bold">決済数</th>
              <th class="text-center text-subtitle-1 font-weight-bold">商品詳細</th>
              <th class="text-center text-subtitle-1 font-weight-bold">売上金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(date, index) in dates" :key="index">
              <td class="text-center">{{ date | momentDate }}</td>
              <td class="text-center"><List :Date="date" /></td>
              <td class="text-center"><v-btn color="error" @click="dayOrderDitail(date)">ditail</v-btn></td>
              <td class="text-center"><ListTotalPrice :Date="date" /></td>
            </tr>
          </tbody>
        </v-simple-table>

        <v-col cols="4" class="mt-6 ml-auto">
          <span class="text-h6 text-right"><MonthTotalPrice :Value="value" /></span>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import moment from 'moment'
import List from '@/components/SalesList/List.vue'
import ListTotalPrice from '@/components/SalesList/ListTotalPrice.vue'
import MonthTotalPrice from '@/components/SalesList/MonthTotalPrice.vue'

export default {
  name: 'SalesLists',
  components: {
    BackButton,
    List,
    ListTotalPrice,
    MonthTotalPrice
  },
  data() {
    return {
      setMonth: [],
      value: this.$route.query.month,
    }
  },
  computed: {
    listsData() {
      return this.$store.state.sales_list
    },
    dates() {
      return this.$store.state.setDate
    }
  },
  async mounted() {

    // 1年前までのデータ取得
    let thisMonth = moment().startOf('months')
    let setMonth = [thisMonth.format('YYYY-MM')]
    for(let i = 0; i < 12; i++ ) {
      setMonth.push(thisMonth.add(-1, 'month').format('YYYY-MM'))
    }
    this.setMonth = setMonth

    this.$store.dispatch('sales_list')
    this.$store.commit('SET_DATE', this.value)
  },

  filters: {
    momentDate(value) {
      return moment(value).format('D 日')
    },
    monthFormat(value) {
      return moment(value).format('YYYY年 M')
    },
    priceLocaleString(value) {
      return value.toLocaleString();
    },
  },

  methods: {
    dayOrderDitail(date) {
      this.$router.push({path: '/list_ditail', query: {created_at: date}})
    },
    changeMonth(value) {
      let tMonth = moment(this.dates[0]).format('YYYY-MM')
      let setMonth = moment(value).format('YYYY-MM')
      if(tMonth != setMonth) {
        let changeValue = moment(value)
        let start = moment(changeValue).startOf('months')
        let setDate = [start.format('YYYY-MM-DD')];
        let end = moment(changeValue).endOf('months').format('D') -1

        for(let i = 0; i < end; i++) {
          setDate.push(start.add(1, 'days').format('YYYY-MM-DD'))
        }
        this.$store.commit('CHANGE_DATE', { value })
      }
    }
  },
  created() {
    this.changeMonth()
  }
}
</script>

<style>

</style>