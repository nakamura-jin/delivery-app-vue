<template>
  <v-simple-table class="pa-0">
    <template>
      <thead>
        <tr>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1">
            料理名
          </th>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1 hidden-sm-and-down">
            内容
          </th>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1 hidden-sm-and-down">
            タグ
          </th>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1 hidden-sm-and-down">
            料金
          </th>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1">
            編集
          </th>
          <th class="py-3 pa-md-4 text-center text-md-subtitle-1">
            削除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in menus"
          :key="item.id"
        >
          <!-- 料理名 -->
          <td class="py-3 pa-md-4 text-center text-caption text-md-body-1">{{ item.name }}</td>
          <!-- 内容 -->
          <td class="py-3 pa-md-4 text-center text-caption text-md-body-1 hidden-sm-and-down">{{ item.discription }}</td>
          <!-- タグ -->
          <td class="py-3 pa-md-4 text-center text-caption text-md-body-1 hidden-sm-and-down text-center">{{ item.tag_name }}</td>
          <!-- 金額 -->
          <td class="py-3 pa-md-4 text-center text-caption text-md-body-1 hidden-sm-and-down text-center">{{ item.price }}</td>
          <!-- 編集 -->
          <td class="py-3 pa-md-4 text-center">
            <v-btn icon color="success" @click="menuEdit(item.id)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn>
          </td>
          <!-- 削除 -->
          <td class="py-3 pa-md-4 text-center">
            <v-btn icon color="error" @click="menuDelete(item.id)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import axios from 'axios'
  export default {
    computed: {
      menus() {
        return this.$store.state.menus
      }
    },
    mounted() {
      this.$store.dispatch('getMenu')
    },
    methods: {
      menuEdit(id) {
        this.$router.push({path: '/edit_menu', query: {id: id}});
      },
      menuDelete(id) {
        let deleteMenu= confirm('本当に削除してよろしいですか？')
        if(deleteMenu) {
          axios.delete('/api/v1/menu/' + id)
          this.$store.commit('DELETE_MENU', id)
        }
      }
    }
  }
</script>
