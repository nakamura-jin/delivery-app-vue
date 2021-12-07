<template>
  <v-container>

    <v-row>
      <v-col class="pa-2 pa-0 px-md-8 d-sm-flex flex-wrap" name="fade">
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

              <CardButton
                v-if="user != false "
                :userId = user.id
                :Item = item
                class="ml-4"
              />
              <v-btn v-else @click.stop="dialog = true" color="error" class="ml-4"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
      <v-dialog v-model="dialog" max-width="500">
        <PromptLogin @closeDialog="dialog = false"/>
      </v-dialog>
  </v-container>
</template>

<script>
  import SelectQuantity from '@/components/SelectQuantity.vue'
  import CardButton from '@/components/CardButton.vue'
  import PromptLogin from '@/components/PromptLogin.vue'
  import axios from 'axios'
  export default {
    name: 'Top',
    components: {
      SelectQuantity,
      CardButton,
      PromptLogin,
    },
    data(){
      return {
        allQuantity: [1, 2, 3, 4, 5],
        selected: 1,
        dialog: false,
        alert: true,
        selectTag: '',
        show: true,
        menus: [],
        search: '',
        value: ''
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
      async getMenu(){
        await axios.get('/api/v1/menu')
        .then(res => {
          this.menus = res.data.data
        })
      }
    },
    computed: {
      user() {
        if(JSON.stringify(this.$store.state.user) == []) {
          return false
        }

        return this.$store.state.user
      }
    },
    created() {
      this.getMenu()
    }
  }

</script>

<style>

</style>