<template>
  <v-row justify="center">
    <v-col sm="6" cols="12" class="text-center">
      <v-alert type="success" class="mt-8 mx-auto" width="90%" dense>
        Created a menu
      </v-alert>
      <v-card-text class="text-h5 mt-12">登録完了しました</v-card-text>
        <v-btn class="mt-8" color="error" @click="goToMenu">メニュー一覧ページへ</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    goToMenu() {
      this.$router.push('/menu')
    }
  }
}
</script>

<style>

</style>