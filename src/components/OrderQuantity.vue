<template>
  <div class="container pa-0">
    <ul v-for="item in list" :key="item.id" class="pa-0">
      <div class="pa-0">
        <li v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="px-0 py-2" style="list-style: none; font-size: 12px">{{ item.quantity }} 個</li>
        <li v-else class="px-0 py-2" style="list-style: none;">{{ item.quantity }} 個</li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Order: Array
  },
  data() {
    return {
      order_menu: this.Order
    }
  },
  computed: {
    list() {
      return this.order_menu
    }
  }
}
</script>

<style>

</style>