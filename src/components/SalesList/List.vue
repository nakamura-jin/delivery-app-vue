<template>
  <v-container>
    <ul class="pa-0" style="list-style: none">
      <li>{{ item(date).length }} 件</li>
    </ul>
  </v-container>
</template>

<script>
import moment from 'moment';
export default {
  name: 'List',
  props: {Date: String},
  computed: {
    // dates() {
    //   return this.$store.state.setDate
    // },
    date() {
      return this.Date
    }
  },
  methods: {
    item(date) {
      let data = [];
      this.$store.state.sales_list.forEach(item => {
        let changeFormat = moment(item.created_at).format('YYYY-MM-DD')
        if(changeFormat == date) {
          data.push(changeFormat)
        }
      })
      return data
    }
  },
  created() {
    this.item()
  }
}
</script>

<style>

</style>