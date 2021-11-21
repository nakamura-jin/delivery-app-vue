<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="text-h6 mx-auto">
      ログインが必要です
    </v-card-title>
    <v-card-text class="text-subtitle-2">カートの利用、ご注文をする際にはログインが必要です。</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="closeDialog"
      >
        戻る
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="goToLogin"
      >
        ログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    goToLogin(){
      this.$router.push('/login')
    },
    closeDialog(){
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

</style>