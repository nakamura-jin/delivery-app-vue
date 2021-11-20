<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-toolbar style="height: 70px"></v-toolbar>
      <v-list>

        <v-list-item link>
          <v-list-item-content class="text-center">
            <v-list-item-title class="text-h6">
              {{ user.name }} 様
            </v-list-item-title>
            <v-list-item-subtitle class="mt-1">{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-btn color="error" style="width: 100%" @login="logout">ログアウト</v-btn> -->
        <LogoutButton />
      </v-list>
      <v-divider></v-divider>
      <v-list>

        <v-list-group
          :value="true"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-group
            :value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="item in admins"
              :key="item"
              title
              link
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon], i) in cruds"
              :key="i"
              :to="link"
            >
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
  </v-card>
</template>

<script>
  import LogoutButton from './LogoutButton.vue'
  export default {
    name: 'AdminNav',
    components: {
      LogoutButton
    },
    data: () => ({
      selectedItem: 0,
      admins: [
        {title: 'top', icon: 'mdi-home', link: '/'}
      ]
    }),
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>