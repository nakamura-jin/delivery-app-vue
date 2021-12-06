<template>
  <v-row>
    <v-col v-if="!sendMail" md="6" class="password_reset">
      <h3 style="justify-content: center" class="text-center text-md-h4 mb-md-8">パスワードをリセットします</h3>
      <p class="pa-4 px-8 ma-0 text-md-subtitle-2 text-caption">
        ご登録されているメールアドレスを入力し、
        受信メールからパスワードを再設定してください。<br><br>
        なお、迷惑メール防止の設定をしている場合、<span style="color: red">@delivery-app-69dc4.firebaseapp.com</span>からのドメイン受信設定を事前にお願いします。
        <br><br>
        メール送信後自動ログアウトされます。
      </p>
      <v-col class="px-8">
        <span class="text-caption">設定済みメールアドレス</span>
        <validation-provider v-slot="ProviderProps" rules="required|email" name="メールアドレス">
          <v-col class="pa-0 d-flex">
            <v-text-field
              label="メールアドレス"
              v-model="email"
              dense
              class="mt-4"
              :error-messages="ProviderProps.errors[0]"
            >
            </v-text-field>
          </v-col>
        </validation-provider>
      </v-col>
      <v-col class="text-right px-8">
        <v-btn color="error" @click="loginBack">戻る</v-btn>
        <v-btn class="ml-6" color="primary" @click="passwordReset">送信</v-btn>
      </v-col>
    </v-col>

    <v-col v-else>
      <div class="send_mail text-center display_center">
        <p class="text-md-h6 text-subtitle-2 font-weight-bold">メールを送信しました</p>
        <v-btn text color="primary" @click="back">ログインへ</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Password_Reset',
  data() {
    return {
      email: '',
      sendMail: false
    }
  },
  methods: {
    passwordReset() {
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => {
        // Password reset email sent!
        // ..
        this.email = '';
        this.sendMail = true
      })
    },

    loginBack() {
      this.$router.push('/setting')
    },

    back() {
      if(firebase.auth().onAuthStateChanged) {
        firebase.auth().signOut()
        .then(() => {
          this.$store.commit('LOGOUT')
          this.$router.push('/login')
        })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
  .password_reset {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>