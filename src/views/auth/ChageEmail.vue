<template>
  <v-container>
    <v-row>
      <v-col v-if="!sendMail" class="display_center">
        <h3 class="text-md-h4 text-center">メールアドレス変更</h3>
        <v-col class="mt-8">
          <p class="text-caption text-md-h6 text-center">変更するメールアドレスを入力してください</p>
          <validation-provider v-slot="ProviderProps" rules="required|email" name="メールアドレス">
            <v-col class="pa-0 mx-auto mt-6" md="6">
              <v-text-field
                label="新しいメールアドレス"
                v-model="email"
                dense
                class="mb-6"
                :error-messages="ProviderProps.errors[0]"
              >
              </v-text-field>
            </v-col>
          </validation-provider>
        </v-col>
        <v-col class="text-right mx-auto" md="6">
          <v-btn color="error" @click="backPage">戻る</v-btn>
          <v-btn color="primary" @click="sendChangeEmail" class="ml-6">送信</v-btn>
        </v-col>
      </v-col>

      <v-col v-else>
        <div class="send_mail text-center display_center">
          <p class="text-md-h6 text-subtitle-2 font-weight-bold">メールを送信しました</p>
          <v-btn text color="primary" @click="back">ログインへ</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'ChangeEmail',
  data() {
    return {
      email: '',
      sendMail: false
    }
  },
  methods: {
    sendChangeEmail() {
      const user = firebase.auth().currentUser;

      user.updateEmail(this.email).then(() => {
        this.sendMail = true
        user.sendEmailVerification(() => {
        })
      })
    },

    backPage() {
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

</style>