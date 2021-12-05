<template>
  <v-btn
    icon
    color="error"
    class="ml-3"
    @click="back"
  >
  <v-icon>mdi-arrow-left</v-icon>
  戻る
  </v-btn>
</template>

<script>
import moment from 'moment'
export default {
  name: 'BackButton',
  props: {Month: String},
  data() {
    return {
      path: moment(this.$route.query.created_at).format('YYYY-MM')
    }
  },
  methods: {
    back() {
      if(this.$route.path == '/register' || this.$route.path == '/login') {
        this.$router.push('/')
      } else if(this.$route.path == '/list_ditail') {
        this.$router.push({path: '/sales_lists', query: {month: this.path }})
      } else {
        this.$router.push('/top')
      }
    }
  }
}
</script>
