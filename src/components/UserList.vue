<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4" class="ml-auto mr-4 mb-4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
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
            <th class="py-3 text-center text-md-subtitle-1 hidden-sm-and-down">
              ロール
            </th>
            <th class="py-3 text-center text-md-subtitle-1">
              編集
            </th>
            <th class="py-3 text-center text-md-subtitle-1">
              削除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item) in filteredUsers"
            :key="item.id"
          >
            <td class="py-2 text-left text-md-center text-caption text-md-body-1">{{ item.name|omittedText }}</td>
            <td class="py-2 text-left text-md-center text-caption text-md-body-1">{{ item.email|omittedText_2 }}</td>
            <!-- <td class="py-2 text-left text-md-center text-caption text-md-body-1">{{ item.role_name }}</td> -->
            <td class="py-2 text-left text-md-center text-caption text-md-body-1 hidden-sm-and-down">
              <v-btn text>{{ item.role_name }}</v-btn>
            </td>
            <td class="py-2 text-center"><v-btn icon color="primary" @click="userEdit(item.id)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
            <td class="py-2 text-center"><v-btn icon color="error" @click="userDelete(item.id)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog>

    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'UserList',
    data() {
      return {
        search: '',
        users: []
      }
    },
    computed: {
      filteredUsers() {
        let userList = [];
        if (this.users !== "" ) {
          for (const i in this.users) {
            const list = this.users[i];
            if (
              list.name.indexOf(this.search) !== -1
              ||
              list.email.indexOf(this.search) !== -1) {
            userList.push(list);
            }
          }
          return userList;
        }
        return this.users;
      }
    },
    async mounted() {
      await axios.get('/api/v1/user')
      .then(res => {
        this.users = res.data.data
      })

    },
    methods: {
      userEdit(id) {
        this.$router.push({path: '/edit_user', query: {id: id}})
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
