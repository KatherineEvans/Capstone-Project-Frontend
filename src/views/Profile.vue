<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <div class="profileHeader">
      <h1>{{ message }}</h1>
    </div>
    <div id="profile-card" class="card">
      <div class="card-body">
        <h3 class="card-title">{{ profile.name }}</h3>
        <img id="profile_photo" class="card-img-top" v-bind:src="profile.photo" alt="Card image cap">
        <p class="card-text"><strong>Bio:</strong> {{ profile.bio }}</p>
        <h6 class="card-text"><strong>Email:</strong> {{ profile.email }}</h6>
        <h6 class="card-text"><strong>Phone:</strong> {{ profile.phone }}</h6>
        <a href="#" class="card-link">Edit</a>
      </div>
    </div>
    <div id="profile-card" class="card">
      <div class="card-body">
        <h3 class="card-title">Upcoming Trips:</h3>
        <a href="#/home" class="card-link">Home</a>
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
      user: this.current_user,
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/profile/" + this.$route.params.id).then(response => {
      this.profile = response.data;
      console.log("User Profile", this.profile);
    });
  },
  methods: {},
  computed: {}
};
</script>
