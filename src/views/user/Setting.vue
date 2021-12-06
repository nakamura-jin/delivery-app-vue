<template>
  <v-row>
    <BackButton class="ml-12 mt-12" />
    <v-col md="8" class="display_center text-center d-md-flex ">
      <div v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
        <v-btn @click="changeEmail" width="220" height="100" outlined plain color="error" class="my-6">
          <v-icon>mdi-email</v-icon>
          メールアドレス変更
        </v-btn>
        <v-btn @click="passwordResetPage" width="220" height="100" outlined plain color="error" class="my-6">
          <v-icon>mdi-lock</v-icon>
          パスワード変更
        </v-btn>
      </div>

      <div v-else class="mx-auto">
        <v-btn @click="changeEmail" width="300" height="140" outlined plain color="error" class="font-weight-bold text-h6 mr-8">
          <v-icon>mdi-email</v-icon>
          メールアドレス変更
        </v-btn>
        <v-btn @click="passwordResetPage" width="300" height="140" outlined plain color="error" class="font-weight-bold text-h6 ml-8">
          <v-icon>mdi-lock</v-icon>
          パスワード変更
        </v-btn>
      </div>

    </v-col>
  </v-row>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
export default {
  name: 'Setting',
  components: {
    BackButton
  },
  methods: {
    changeEmail() {
      this.$router.push('/change_email')
    },
    passwordResetPage() {
      this.$router.push('/password_reset')
    }
  }
}
</script>

<style>

</style>