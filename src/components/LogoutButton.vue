<template>
  <v-btn color="error" style="width: 100%" @click="logout">ログアウト</v-btn>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.commit('LOGOUT')
      })
    }
  }
}
</script>

<style>

</style>