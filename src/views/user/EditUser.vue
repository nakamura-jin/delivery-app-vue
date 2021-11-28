<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="editForm">
        <h1>ユーザー情報編集</h1>
        <v-simple-table>
          <tr>
            <th>user name</th>
            <td>{{ editUser.name }}</td>
          </tr>
          <tr>
            <th>user email</th>
            <td>{{ editUser.email }}</td>
          </tr>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      id: this.$route.query.id,
      editUser: [],
      role: '',
    }
  },
  name: 'EditUser',
  mounted() {
    axios.get('/api/v1/user/' + this.id)
    .then(res => {
      this.editUser = res.data.data
    })
  },
  methods: {
    changeRole() {

    }
  },
}
</script>

<style>
  .editForm {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw
  }
</style>