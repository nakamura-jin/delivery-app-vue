<template>
  <v-container >
    <BackButton />
    <v-row>
      <v-col md="6" class="display_center">
        <h1 class="my-6 text-center">ログイン</h1>
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
                  counter="min:6"
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
        <p class="text-center mt-8">パスワードをお忘れの方は<router-link to="password_reset">こちら</router-link></p>
      </v-col>
    </v-row>

    <v-dialog v-model="loading">
      <v-overlay :opacity="opacity">
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="15"
          :value="value"
          color="error"
        >
          {{ value }}
        </v-progress-circular>
        <!-- <v-progress-circular
          indeterminate
          color="error">

        </v-progress-circular> -->
      </v-overlay>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import BackButton from '@/components/BackButton.vue'
export default {
  name: 'Login',
  components: {
    BackButton
  },
  data() {
    return {
      email: '',
      password: '',
      show1: false,

      loading: false,
      interval: {},
      value: 0,
      opacity: 1
    }
  },
  methods: {
    reset() {
      this.email = '',
      this.password = '',
      this.$refs.obs.reset()
    },
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.interval = setInterval(() => {
          this.loading = true
          if (this.value === 100) {
            this.$router.push('/top')
          }
          this.value += 10
        }, 500)
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/user-disabled':
            alert('ユーザーが無効になっています。')
            break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません。')
            break
          case 'auth/wrong-password':
            alert('パスワードが間違っております。')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            break
        }
      })
    }
  },
}
</script>

<style>

</style>