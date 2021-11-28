<template>
  <v-container>
    <BackButton />
    <h1 class="mb-md-4 text-center text-h5">User List</h1>
      <v-main class="pa-2">
        <UserList />
      </v-main>
  </v-container>
</template>

<script>
import UserList from '@/components/UserList.vue'
import BackButton from '@/components/BackButton.vue'
export default {
  name: 'User',
  components: {
    UserList,
    BackButton
  }
}
</script>
