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
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.link"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
            <v-icon>{{ child.icon }}</v-icon>
        </v-list-item>
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
      items: [
        {
          action: 'mdi-ticket',
          items: [{ title: 'メニュー',icon:'mdi-silverware-fork-knife', link: '/menu' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
        },
        {
          action: 'mdi-school',
          items: [{ title: 'List Item' }],
          title: 'Education',
        },
        {
          action: 'mdi-run',
          items: [{ title: 'List Item' }],
          title: 'Family',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: 'List Item' }],
          title: 'Health',
        },
        {
          action: 'mdi-content-cut',
          items: [{ title: 'List Item' }],
          title: 'Office',
        },
        {
          action: 'mdi-tag',
          items: [{ title: 'List Item' }],
          title: 'Promotions',
        },
      ],
    }),
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>