<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
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
    <v-list-group
        :value="true"
        prepend-icon="mdi-glass-mug"
      >
        <template v-slot:activator>
          <v-list-item-title>お店</v-list-item-title>
        </template>

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
    </v-list-group>

<!-------------------- 従業員 -------------------->
    <v-list-group
        :value="true"
        prepend-icon="mdi-card-account-details"
      >
        <template v-slot:activator>
          <v-list-item-title>従業員</v-list-item-title>
        </template>

        <v-list-item
          v-for="(member, i) in members"
          :key="i"
          link
          :to="member.link"
        >

        <v-list-item-title v-text="member.text" class="text-center"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="member.icon"></v-icon>
          </v-list-item-icon>

        </v-list-item>
    </v-list-group>

<!-------------------- ユーザー -------------------->
    <v-list-group
      :value="true"
      prepend-icon="mdi-account-circle"
    >
      <template v-slot:activator>
        <v-list-item-title>ユーザー</v-list-item-title>
      </template>

      <v-list-item
        v-for="(user, i) in users"
        :key="i"
        link
        :to="user.link"
      >

      <v-list-item-title v-text="user.text" class="text-center"></v-list-item-title>

      <v-list-item-icon>
        <v-icon v-text="user.icon"></v-icon>
      </v-list-item-icon>


      </v-list-item>

    </v-list-group>

    </v-list>
  </v-card>
</template>

<script>
  import LogoutButton from '@/components/LogoutButton.vue'
  export default {
    name: 'AdminNav',
    components: {
      LogoutButton
    },
    data: () => ({
      selectedItem: 0,
      shops: [
        { text: 'サイト', icon: 'mdi-web', link: '/top' },
        { text: 'メニュー', icon: 'mdi-silverware-variant', link: '/menu' },
        { text: 'オーダー', icon: 'mdi-note-edit', link: '/order' },
      ],
      members: [
        { text: '従業員一覧', icon: 'mdi-folder', link: '/admin/member' },
      ],
      users: [
        { text: 'ユーザー一覧', icon: 'mdi-folder-account', link: '/user'},
      ],
    }),
    computed: {
      user() {
        return this.$store.state.user
      }
    },
  }
</script>