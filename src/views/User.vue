<template>
  <v-container>
    <!-- <v-col cols="12"> -->
        <v-btn
          icon
          color="error"
          class="ml-3"
          @click="back"
        >
        <v-icon>mdi-arrow-left</v-icon>
        戻る
        </v-btn>
    <!-- </v-col> -->
    <h1 class="mb-4 text-center text-h5">User List</h1>
      <v-main class="pa-2">
        <UserList />
      </v-main>
  </v-container>
</template>

<script>
import UserList from '../components/UserList.vue'
export default {
  name: 'User',
  components: {
    UserList
  },
  methods: {
    back() {
      this.$router.push('/top')
    }
  }
}
</script>
