<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      width="220"
      clipped
      color="error"
    >
      <!-- 未ログインユーザー用 -->
      <div v-if="user == false">
        <AllUserNav />
      </div>
      <!-- オーナー -->
      <div v-if="user.role_id == 1">
        <AdminNav />
      </div>

      <!-- メンバー -->
      <div v-if="user.role_id == 2">
        <MemberNav />
      </div>

      <!-- メンバー -->
      <div v-if="user.role_id == 3">
        <UserNav />
      </div>

    </v-navigation-drawer>

    <v-app-bar app color="error">
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="goToCart(user.role_id)">
        <v-icon>mdi-cart</v-icon>
        <v-badge offset-y="-2" offset-x="14" :content="cartItemCount" :value="cartItemCount" v-if="cartItemCount > 0">
        </v-badge>
      </v-btn>

    </v-app-bar>


    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  import AdminNav from '@/components/AdminNav.vue'
  import AllUserNav from '@/components/AllUserNav.vue'
  import UserNav from '@/components/UserNav.vue'
  import MemberNav from '@/components/MemberNav.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      AdminNav,
      AllUserNav,
      UserNav,
      MemberNav
    },
    data: () => ({
      drawer: false,
      base: false,
      search: ''
    }),
    methods: {
      goToCart(id) {
        if(id != 3) {
          alert('ユーザーのみ利用可能です')
        } else {
          this.$router.push('/cart')
        }
      },
      selectMenu(tag) {
        if(tag != 0) {
          this.$store.dispatch('selectMenu', tag)
        } else {
          this.$store.dispatch('getMenu');
        }
      },
      setVuexUser() {
        firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.$store.dispatch('login', user.uid)
          }
        })
      },
    },
    computed: {
      user() {
        if(JSON.stringify(this.$store.state.user) == []) {
          return false
        }
        return this.$store.state.user
      },

      ...mapGetters(['cartItemCount'])
    },
    created() {
      this.setVuexUser()
    },
  }
</script>

<style>
  .display_center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
