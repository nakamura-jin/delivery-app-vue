<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col md="6" class="mx-auto">
        <h1 class="mb-6 text-center">ログイン</h1>
        <validation-observer ref="obs" v-slot="ObserverProps">

            <!-- メールアドレス -->
            <validation-provider v-slot="ProviderProps" rules="required|email" name="メールアドレス">
              <v-col class="pa-0 d-flex">
                <v-icon class="pb-8 mr-3">mdi-email</v-icon>
                <v-text-field
                  label="メールアドレス"
                  v-model="email"
                  dense
                  class="mb-6"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
              </v-col>
            </validation-provider>

            <!-- パスワード -->
            <validation-provider v-slot="ProviderProps" rules="required|min:6" name="パスワード">
              <v-col class="pa-0 d-flex">
                <v-icon class="pb-8 mr-3">mdi-lock</v-icon>
                <v-text-field
                  label="パスワード"
                  v-model="password"
                  dense
                  class="mb-6"
                  :error-messages="ProviderProps.errors[0]"
                  :counter="6"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                >
                </v-text-field>
              </v-col>
            </validation-provider>

          <v-col class="text-right">
            <v-btn color="error" @click="reset">リセット</v-btn>
            <v-btn color="error" @click="login" class="ml-6" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</v-btn>
          </v-col>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      show1: false
    }
  },
  methods: {
    reset() {
      this.email = '',
      this.password = '',
      this.$refs.obs.reset()
    },
    login() {
      this.$store.dispatch('login', this.email)
      this.$router.push('/top')
    }
  },
}
</script>

<style>

</style>