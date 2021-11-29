<template>
  <v-row class="ma-0">
    <v-col>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center py-3">
              料理名
            </th>
            <th class="text-center">
              個数
            </th>
          </tr>
        </thead>
        <tbody v-for="item in mobileFoodDitail" :key="item.id">
          <td v-if="item.cooked == 0" style="color: #555" class="text-caption pl-4 py-1">
            {{ item.name }}
          </td>
          <td v-else class="text-caption pl-4 py-1">
            {{ item.name }}
          </td>

          <td v-if="item.cooked == 0" style="color: #555" class="text-center text-caption py-1">
            {{ item.quantity }}
          </td>
          <td v-else class="text-center text-caption py-1">
            {{ item.quantity }}
          </td>
        </tbody>
      </v-simple-table>
        <v-btn class="mt-4" small color="error" @click="closeDitail" width="100%">閉じる</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MobileFoodDitail',
  computed:  {
    mobileFoodDitail() {
      return this.$store.state.mobileFoodDitail
    }
  },
  methods: {
    closeDitail() {
      this.$emit('closeDitail');
      this.$store.commit('DELETE_MOBILE_FOOD_DITAIL')
    }
  }
}
</script>

<style>

</style>