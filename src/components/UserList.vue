<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <v-alert :value="alert" dense type="success" width="300" class="text-center ml-auto">変更しました</v-alert>
      </v-col>
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
            <th v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="py-3 text-center text-md-subtitle-1">
              メール<br>アドレス
            </th>
            <th v-else class="py-3 text-center text-md-subtitle-1">
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
            <td class="py-2 text-left text-md-center text-caption text-md-body-1 hidden-sm-and-down"><v-btn text>{{ item.role_name }}</v-btn></td>
            <td class="py-2 text-center"><v-btn icon color="primary" @click="userEdit(item)" width="30"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
            <td class="py-2 text-center"><v-btn icon color="error" @click="userDelete(item.id)" width="30"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="roleModal" class="pa-0">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <v-card width="500">
            <v-card-text class="text-h5 text-center font-weight-bold">役割変更</v-card-text>
            <v-col class="pt-0">
              <v-col class="text-center">
                <v-card-text class="text-center text-subtitle-1 text-md-h6 pa-0">{{ roleUser.name }} 様</v-card-text>
                <span>役割： ({{ roleUser.role_name }})</span>
              </v-col>
              <v-col class="d-flex pa-0 mb-xs-5 mb-6 mt-md-6 " style="justify-content: center">
                <v-checkbox
                  label="admin"
                  v-model="role_id"
                  class="mt-0"
                  value=1
                  color="error"
                  hide-details="false"
                ></v-checkbox>

                <v-checkbox
                  label="staff"
                  v-model="role_id"
                  class="mt-0 ml-2 ml-md-6"
                  value=2
                  color="error"
                  hide-details="false"
                ></v-checkbox>

                <v-checkbox
                  label="user"
                  v-model="role_id"
                  class="mt-0 ml-2 ml-md-6"
                  value=3
                  color="error"
                  hide-details="false"
                ></v-checkbox>
              </v-col>
            </v-col>

            <v-col class="text-right">
              <v-btn color="error" @click="roleModal = false, role_id = '' ">戻る</v-btn>
              <v-btn color="primary" @click="changeRole(role_id)" class="ml-6">決定</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
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
        roleModal: false,
        alert: false,
        roleUser: [],
        role_id: '',
        users: [],
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
      userEdit(item) {
        this.roleModal = true,
        this.roleUser = item
      },

      async changeRole(role) {
        await axios.put('/api/v1/user/' + this.roleUser.id, {
          name: this.roleUser.name,
          email: this.roleUser.email,
          role_id: Number(role),
          uid: this.roleUser.uid
        })
        .then(() => {
          axios.get('/api/v1/user')
          .then(res => {
            this.users = res.data.data
          })
        })
        this.roleModal = false;
        this.alert = true

        setTimeout(() => {
          this.alert = false
        }, 2000)
      },
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
