<template>
  <v-container>
    <v-row>
      <v-col class="pb-0">
        <v-btn
          icon
          color="error"
          class="ml-3"
          @click="back"
        >
        <v-icon>mdi-arrow-left</v-icon>
        戻る
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <h1 class="pt-0 pb-2 pb-sm-8 text-h5 text-center font-weight-black">メニュー編集</h1>
        <UpdateMenu />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpdateMenu from '@/components/UpdateMenu.vue'
export default {
  name: 'EditMenu',
  components: {
    UpdateMenu
  },
  methods: {
    back() {
      this.$router.push('/menu')
    }
  },
}
</script>

<style>

</style>