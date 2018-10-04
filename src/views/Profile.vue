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
        <h5 class="card-title" v-for="current_user in profile">{{ current_user.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
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
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/travelers/1").then(response => {
      console.log("User Profile", response.data);
      this.profile = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
