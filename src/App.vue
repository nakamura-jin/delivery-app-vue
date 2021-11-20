<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
      <AdminNav v-if="this.$store.state.user.role_id == 1" />
    </v-navigation-drawer>

    <v-app-bar app color="error">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Delivery</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import firebase from 'firebase'
import AdminNav from './components/AdminNav.vue'
  export default {
    components: {
      AdminNav
    },
    data: () => ({ drawer: null }),
    created() {
  }
  }
</script>
