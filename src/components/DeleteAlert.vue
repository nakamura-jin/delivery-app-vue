<template>
  <v-alert
    type="error"
    :value="alert"
    dense
    class="alert"
    max-width="240px"
    dismissible
  >
    削除しました。
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      alert: true
    }
  },
  created () {
    setTimeout(() => {
      this.alert = false
    }, 3000)
  }
}
</script>

<style>
  .alert {
    position: absolute;
    top: 20px;
    right: 140px;
  }
</style>
