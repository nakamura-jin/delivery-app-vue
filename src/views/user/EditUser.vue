<template>
  <v-row class="text-center">
    <v-col class="editForm" md="6">
      <p>{{ editUser.name }}</p>
      <v-col class="d-flex flex-column">
        <v-btn v-model="role" @click="changeRole(1)" height="100">admin</v-btn>
        <v-btn v-model="role" @click="changeRole(2)">staff</v-btn>
        <v-btn v-model="role" @click="changeRole(3)">user</v-btn>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      id: this.$route.query.id,
      editUser: [],
      role: ''
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
  }
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