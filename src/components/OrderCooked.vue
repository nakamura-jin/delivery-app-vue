<template>
  <v-row>
    <v-col class="text-center pa-0">
      <div v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" style="width: 60px">
        <v-btn v-if="cooked" fab width="10" height="10" color="error" @click="changeCook(orderItem)"></v-btn>
        <v-btn v-else fab width="10" height="10" color="success" @click="changeCook(orderItem)"></v-btn>
      </div>

      <div v-else>
        <v-btn v-if="cooked" fab width="20" height="20" color="error" @click="changeCook(orderItem)"></v-btn>
        <v-btn v-else fab width="20" height="20" color="success" @click="changeCook(orderItem)"></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {order: Object},
  data() {
    return {
      orderItem: this.order
    }
  },
  methods: {
    changeCook(item) {
      if(item.cooked == 1) {
        let chenge = confirm('調理済みにしますか？')
        if(chenge) {
          this.$store.dispatch('cooked', {id: item.id, cooked: 0})
        }
      } else {
        let chenge = confirm('未調理に戻しますか？')
        if(chenge) {
          this.$store.dispatch('cooked', {id: item.id, cooked: 1})
        }
      }
    }
  },
  computed: {
    cooked() {
      if(this.orderItem.cooked == 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>

</style>