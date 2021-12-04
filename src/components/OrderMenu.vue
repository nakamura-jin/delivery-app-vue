<template>
  <div class="container pa-0">
    <ul v-for="item in order_menu" :key="item.id" class="text-center pa-0">
      <div class="pa-0 d-flex">
        <li v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm " class="px-0 py-2 text-center" style="list-style: none; font-size: 12px;">{{ item.name }}</li>
        <li v-else class="px-0 py-2 text-center" style="list-style: none; width: 100%">{{ item.name }}</li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Order: Array,
  },
  data() {
    return {
      order_menu: this.Order,
    }
  }
}
</script>

<style>

</style>