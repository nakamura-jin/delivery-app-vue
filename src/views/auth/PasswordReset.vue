<template>
  <v-row>
    <v-col md="6" class="password_reset">
      <!-- <v-card> -->
        <h3 style="justify-content: center" class="text-center text-md-h4 mb-md-8">パスワードをリセットします</h3>
        <p class="pa-4 px-8 ma-0 text-md-subtitle-2 text-caption">
          ご登録されているメールアドレスを入力し、
          受信メールからパスワードを再設定してください。<br><br>
          なお、迷惑メール防止の設定をしている場合、<span style="color: red">@delivery-app-69dc4.firebaseapp.com</span>からのドメイン受信設定を事前にお願いします。
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
          <v-btn @click="back">戻る</v-btn>
          <v-btn class="ml-6" color="error" @click="passwordReset">送信</v-btn>
        </v-col>
      <!-- </v-card> -->
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Password_Reset',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    passwordReset() {
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => {
        // Password reset email sent!
        // ..
        this.email = '';
        this.$router.push('/send_mail')
      })
      // .catch((error) => {
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // ..
      // });
    },

    back() {
      this.$router.push('/login')
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