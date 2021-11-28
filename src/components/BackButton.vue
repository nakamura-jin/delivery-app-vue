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
export default {
  name: 'BackButton',
  methods: {
    back() {
      if(this.$route.path == '/register' || this.$route.path == '/login') {
        this.$router.push('/')
      } else {
        this.$router.push('/top')
      }
    }
  }
}
</script>
