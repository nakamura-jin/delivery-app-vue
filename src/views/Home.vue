<template>
  <v-container>
    <v-row class="top">
      <v-col class="text-center">
        <h1>Delivery app</h1>
        <v-col class="mt-6">
          <v-btn color="error" @click="registerPage">新規登録</v-btn>
          <v-btn color="error" class="ml-6" @click="loginPage">ログイン</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',
    methods: {
      registerPage() {
        this.$router.push('/register')
      },
      loginPage() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  .top {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw
  }
</style>
