<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-3">
          <v-card color="white" height="240"></v-card>
          <v-col class="pa-0">
            <v-card-title class="pl-0">menu-title</v-card-title>
            <v-card-text class="pl-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet odit voluptatem sapiente?</v-card-text>
            <v-col class="d-flex pa-0">
              <v-chip color="yellow" class="black--text">#tags</v-chip>
              <v-spacer></v-spacer>
              <p class="text-h6 mb-0">780円</p>
            </v-col>
            <v-col class="d-flex pt-2 mb-4">
                <div class="pt-2 ml-auto">
                <span class="mr-1">数量: </span>
                <SelectQuantity :Item = item />
              </div>

                <!-- <v-spacer></v-spacer> -->
                <!-- <CardButton
                  v-if="user != false "
                  :userId = user.id
                  :Item = item
                  class="ml-4"
                /> -->
                <v-btn @click.stop="dialog = true" color="error" class="ml-4"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
            </v-col>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectQuantity from '../components/SelectQuantity.vue'
export default {
  name: 'Top',
  components: {
    SelectQuantity
  },
  data() {
    return {
      dialog: false
    }
  },
}
</script>

<style>

</style>