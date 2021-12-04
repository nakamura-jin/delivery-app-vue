<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>aaa</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SalesListDitail',
  data() {
    return {
      lists: [
        { id: 1, user_id: 1, menu_list: [{id: 1, quantity: 3}], date: '2021-11-30', time: '18:00:00' },
        { id: 2, user_id: 2, menu_list: [{id: 1, quantity: 1}, {id: 2, quantity: 1} ], date: '2021-11-30', time: '18:00:00' }
      ]
    }
  }
}
</script>

<style>

</style>