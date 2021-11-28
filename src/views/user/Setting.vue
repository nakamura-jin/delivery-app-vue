<template>
  <v-row>
    <v-col md="8" class="display_center text-center">

      <div class="mb-8">
        <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" width="220" height="100" outlined plain color="error">
          <v-icon>mdi-account</v-icon>
          ユーザーネーム変更
        </v-btn>
        <v-btn v-else width="300" height="140" outlined plain color="error" class="font-weight-bold text-md-h6">
          <v-icon>mdi-account</v-icon>
          ユーザーネーム変更
        </v-btn>
      </div>

      <div class="mb-8">
        <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" width="220" height="100" outlined plain color="error">
          <v-icon>mdi-email</v-icon>
          メールアドレス変更
        </v-btn>
        <v-btn v-else width="300" height="140" outlined plain color="error" class="font-weight-bold text-md-h6">
          <v-icon>mdi-email</v-icon>
          メールアドレス変更
        </v-btn>
      </div>

      <div>
        <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" width="220" height="100" outlined plain color="error">
          <v-icon>mdi-lock</v-icon>
          パスワード変更
        </v-btn>
        <v-btn v-else width="300" height="140" outlined plain color="error" class="font-weight-bold text-md-h6">
          <v-icon>mdi-lock</v-icon>
          パスワード変更
        </v-btn>
      </div>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style>

</style>