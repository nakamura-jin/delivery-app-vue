<template>
  <div class="send_mail text-center">
    <p class="text-md-h6 text-subtitle-2 font-weight-bold">メールを送信しました</p>
    <router-link to="login">ログインへ</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .send_mail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>