<template>
  <v-container>
    <v-row v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
      <v-tabs show-arrows fixed-tabs align-with-title>
        <v-tab class="text-caption" @click="selectMenu(0)">全料理</v-tab>
        <v-tab class="text-caption" @click="selectMenu(1)">肉料理</v-tab>
        <v-tab class="text-caption" @click="selectMenu(2)">揚げ物</v-tab>
        <v-tab class="text-caption" @click="selectMenu(3)">野菜料理</v-tab>
        <v-tab class="text-caption" @click="selectMenu(4)">定番<br>おつまみ</v-tab>
        <v-tab class="text-caption" @click="selectMenu(5)">ご飯もの</v-tab>
      </v-tabs>
    </v-row>

    <!-- <v-row>
      <v-col>
      <div class="fade">
        <v-img v-if="show" src="https://test-izakaya.s3.ap-northeast-1.amazonaws.com/E6Zq1OVCPVPxYtF7BoV4jU5eVpJVbnOr7v2vEr5J.jpg" width="100%" height="200%"></v-img>
        <h1 class="text-center text-md-h3">テスト 居酒屋<br>〜TAKE OUT〜</h1>
      </div>
      <div class="my-8 text-center">
        <h2 class="text-md-h4 text-h5">メニュー</h2>
      </div>
    </v-col>
    </v-row> -->

    <v-row>
      <v-col class="pa-2 pa-0 px-md-8 d-sm-flex flex-wrap">
        <v-card v-for="item in menus" :key="item.id" class="ma-3" max-width="340px">
          <v-col class="mx-auto">
            <v-img :src="item.image" height="160">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-card-title class="py-2 text-h6 font-weight-black">{{ item.name }}</v-card-title>
          <v-col class="pa-0">
            <v-card-text class="short pt-0" style="height:60px">{{ item.discription }}</v-card-text>
          </v-col>
          <v-col class="d-flex pt-0">
            <v-chip class="text-subtitle-h6" color="cyan" light># {{ item.tag_name }}</v-chip>
            <v-spacer></v-spacer>
            <!-- <v-chip class="px-4 text-subtitle-h6" label color="warning" style="color: black">¥ {{ item.price }} </v-chip> -->
            <p class="text-h6 mb-0">¥ {{ item.price }}</p>
          </v-col>
          <v-col class="d-flex pt-0 mb-4">
            <div class="pt-2 ml-auto">
              <span class="mr-1">数量: </span>
              <SelectQuantity :Item = item />
            </div>

              <!-- <v-spacer></v-spacer> -->
              <!-- <CardButton
                v-if="user != false "
                :userId = user.id
                :Item = item
                class="ml-4" -->
              <!-- /> -->
              <v-btn @click.stop="dialog = true" color="error" class="ml-4"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
      <v-dialog v-model="dialog" max-width="500">
        <!-- <PromptLogin @closeDialog="dialog = false"/> -->
      </v-dialog>
  </v-container>
</template>

<script>
  // import firebase from '@/plugins/firebase'
  import SelectQuantity from '@/components/SelectQuantity.vue'
  export default {
    name: 'Top',
    components: {
      SelectQuantity
    },
    data(){
      return {
        allQuantity: [1, 2, 3, 4, 5],
        selected: 1,
        dialog: false,
        alert: true,
        selectTag: '',
        show: true
      }
    },
    methods: {
      selectQuantity(id) {
        const data = {
          id,
          quantity: this.selected
        }
        this.$store.commit('SELECT_QUANTITY', data);
      },
      getMenu(){
        this.$store.dispatch('getMenu');
      }
      // selectMenu(tag) {
      //   if(tag != 0) {
      //     this.$store.dispatch('selectMenu', tag)
      //     // this.$store.dispatch('selectMenu', tag)
      //     console.log(tag)
      //   } else {
      //     this.$store.dispatch('getMenu');
      //   }
      // }
    },
    computed: {
      menus() {
        return this.$store.state.menus
      },
      // user() {
      //   if(JSON.stringify(this.$store.state.user) == []) {
      //     return false
      //   }

      //   return this.$store.state.user
      // }
    },
    // mounted() {
    //   this.$store.dispatch('getMenu');
    //   // if(user != false) {
    //   //   this.$store.dispatch('getCartItems', { user_id: user.id});
    //   //   console.log(user)
    //   // }
    //   // firebase.auth().onAuthStateChanged((user) => {
    //   //   if (user) {
    //   //     this.$store.dispatch('getCartItems', { user_id: user.id});
    //   //   }
    //   // })
    // },
    created() {
      this.getMenu()
    }
  }

</script>

<style>
.fade {
  position: relative;
}

.fade h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}

</style>