<template>
  <v-row justify="center" style="height:500px" align="center">
    <v-col cols="12" md="4" >
      <v-card class="text-center">
        <v-card-title class="justify-center text-h5">注文が確定しました</v-card-title>
        <v-card-text>お受け取りのご来店お待ちしております</v-card-text>
        <!-- <v-img src="https://test-izakaya.s3.ap-northeast-1.amazonaws.com/cart.png" width="140" class="mx-auto"></v-img> -->
        <v-col class="text-center mt-10 pb-10">
          <router-link to="/top">トップに戻る</router-link>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CheckOut'
}
</script>

<style>

</style>