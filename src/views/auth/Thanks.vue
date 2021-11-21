<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-col class="text-center">
        <p class="text-h5 text-md-h5">会員登録完了<br>ありがとうございます</p>
        <v-btn class="mt-6" color="error" @click="loginPage">ログインページへ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Thanks',
  methods: {
    loginPage() {
      this.$router.push('/top')
    }
  }
}
</script>

