<template>
  <v-container>
    <BackButton />
    <v-row>
      <v-col md="6" class="display_center">
        <h1 class="my-6 text-center">会員登録</h1>
        <div class="mt-md-12">
          <validation-observer ref="obs" v-slot="ObserverProps">

            <!-- 名前 -->
            <validation-provider v-slot="ProviderProps" rules="required" name="名前">
              <v-col class="pa-0 d-flex">
                <v-icon class="pb-8 mr-3">mdi-account</v-icon>
                <v-text-field
                  label="名前"
                  v-model="name"
                  dense
                  class="mb-6"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
              </v-col>
            </validation-provider>

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

            <!-- パスワード確認 -->
            <validation-provider v-slot="ProviderProps" rules="required|min:6|confirmed:パスワード" name="パスワード確認">
              <v-col class="pa-0 d-flex">
                <v-icon class="pb-8 mr-3">mdi-key</v-icon>
                <v-text-field
                  label="パスワード確認"
                  v-model="password_confirmation"
                  dense
                  class="mb-6"
                  :error-messages="ProviderProps.errors[0]"
                  counter="min:6"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                >
                </v-text-field>
              </v-col>
            </validation-provider>

          <v-col class="text-right">
            <v-btn color="error" @click="reset">リセット</v-btn>
            <v-btn color="error" @click="register" class="ml-6" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</v-btn>
          </v-col>
        </validation-observer>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import BackButton from '@/components/BackButton.vue'
export default {
  name: 'Register',
  components: {
    BackButton
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      show1: false,
      show2: false
    }
  },
  methods: {
    reset() {
      this.name = '',
      this.email = '',
      this.password = '',
      this.password_confirmation = '',
      this.$refs.obs.reset()
    },
    register() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          axios.post('/api/v1/register', {
            name: this.name,
            email : this.email,
            password: this.password,
            role_id: 3,
            uid: user.user.uid
          })
          this.$router.push('/thanks')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  }
}
</script>

<style>

</style>