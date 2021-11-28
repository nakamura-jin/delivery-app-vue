<template>
  <v-container>
    <v-row>
      <v-col>
        <BackButton />
        <h1 class="mb-md-4 text-center text-h5">メニュー一覧</h1>
        <v-col class="text-right">
          <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" small color="error" @click="createMenu">料理を追加する</v-btn>
          <v-btn v-else color="error" class="text-bold" large @click="createMenu">料理を追加する</v-btn>
        </v-col>
        <MenuList />
          </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuList from '@/components/MenuList.vue'
import BackButton from '@/components/BackButton.vue'
export default {
  name: 'Menu',
  components: {
    MenuList,
    BackButton
  },
  data() {
    return {
      photo: ''
    }
  },
  methods: {
    createMenu() {
      this.$router.push('/menu_create')
    }
  },
}
</script>

<style>

</style>