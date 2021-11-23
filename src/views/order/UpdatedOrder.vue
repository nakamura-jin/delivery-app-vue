<template>
  <v-container>
    <v-row justify="center" align-content="center" style="height: 450px;">
      <v-col class="text-center" width="400" cols="12">
        <p class="text-h5 mb-6">注文を更新しました</p>
        <v-btn small class="error" @click="goToOrder">オーダー画面に戻る</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToOrder() {
      this.$store.dispatch('getOrder')
      this.$router.push('/order')
    }
  }
}
</script>

<style>

</style>