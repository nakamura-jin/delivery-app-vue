<template>
  <v-simple-table class="pa-0">
    <template >
      <thead>
        <tr>
          <th class="py-3 text-center text-md-subtitle-1">
            名前
          </th>
          <th class="py-3 text-center text-md-subtitle-1">
            メールアドレス
          </th>
          <th class="py-3 text-center text-md-subtitle-1">
            編集
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.id"
        >
          <td class="py-2 text-left text-md-center text-caption text-md-body-1">{{ item.name|omittedText }}</td>
          <td class="py-2 text-left text-md-center text-caption text-md-body-1">{{ item.email|omittedText_2 }}</td>
          <td class="py-2 text-center"><v-btn icon color="primary" @click="userEdit(item.id)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        users: [],
      }
    },
    mounted() {
      // this.$axios.$get('/api/user_list')
      // .then((res) => {
      //   this.users = res.data
      // })
      this.$store.dispatch('userList')
    },
    methods: {
      userEdit(id) {
        this.$router.push('/admin/user/' + id)
      }
    },
    filters: {
      omittedText(text) {
        return text.length > 2 ? text.slice(0, 2) + '...' : text;
      },
      omittedText_2(text) {
        return text.length > 4 ? text.slice(0, 4) + '...' : text;
      }
    },
  }
</script>
