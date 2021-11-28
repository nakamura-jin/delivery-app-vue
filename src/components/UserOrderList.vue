<template>
  <v-row>
    <v-col>
      <ul v-for="item in orderItem" :key="item.id" style="list-style: none" class="d-flex py-1">
        <li class="mr-6" style="width: 60%">{{ item.name }}</li>
        <li class="mr-6" style="width: 20%">{{ item.price }} 円</li>
        <li style="width: 20%">{{ item.quantity }} 個</li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserOrderList',
  props: {
    OrderItem: Array
  },
  data() {
    return {
      orderItem: this.OrderItem
    }
  },
}
</script>
