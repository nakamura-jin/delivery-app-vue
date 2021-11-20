<template>
  <v-container>
    <v-row>
      <v-col>
        <p>topPage</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Top',
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('login', user.email)
      }
    });
  }
}
</script>

<style>

</style>