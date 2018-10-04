<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <div class="profileHeader">
      <h3>{{ message }}</h3>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ profile.name }}</h5>
        <img id="card-img-modal" class="card-img-top" v-bind:src="profile.photo" alt="Card image cap">
        <h5 class="card-text">{{ profile.email }}</h5>
        <a href="#" class="card-link">Edit</a>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "Your Profile",
      users: [],
      trips: [],
      profile: this.profile,
      name: ""
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/travelers/1").then(response => {
      this.profile = response.data;
      console.log("User Profile", this.profile);
    });
  },
  methods: {},
  computed: {}
};
</script>
