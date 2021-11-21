<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{user.name}} 様
            </v-list-item-title>
            <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
        <LogoutButton />
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >

<!-------------------- お店 -------------------->

        <v-list-item
          v-for="(shop, i) in shops"
          :key="i"
          link
          :to="shop.link"
        >

        <v-list-item-title v-text="shop.text" class="text-center"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="shop.icon"></v-icon>
          </v-list-item-icon>

        </v-list-item>


    </v-list>
  </v-card>
</template>

<script>
  import LogoutButton from '@/components/LogoutButton.vue'
  export default {
    name: 'UserNav',
    components: {
      LogoutButton
    },
    data: () => ({
      selectedItem: 0,
      shops: [
        { text: 'サイト', icon: 'mdi-web', link: '/top' },
        { text: '購入履歴', icon: 'mdi-note'},
        { text: '退会', icon: 'mdi-logout' },
      ],
    }),
    computed: {
      user() {
        if(JSON.stringify(this.$store.state.user) == []) {
          return false
        }

        return this.$store.state.user
      }
    }
  }
</script>