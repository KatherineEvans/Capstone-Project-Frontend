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
        <button data-toggle="modal" data-target="#exampleModal" type="button" id="btn-sm" class="btn btn-primary card-link home-card-link-1">Edit</button>
      </div>
      <div class="profile modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLabel">Edit Profile</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
             <div class="form-group traveler_modal-form">
                <label>First Name:</label> 
                <input type="text" placeholder="profile.first_name" class="form-control" v-model="first_name">
                <label>Last Name:</label> 
                <input type="text" placeholder="Last Name" class="form-control" v-model="last_name">
                <label>Email Address:</label> 
                <input type="text" placeholder="Email" class="form-control traveler_modal-form" v-model="email">
                <label>Phone:</label> 
                <input type="text" placeholder="Phone" class="form-control traveler_modal-form" v-model="phone">
                <label>Bio:</label> 
                <input type="text" placeholder="Bio" class="form-control traveler_modal-form" v-model="bio">
                <label>Password:</label> 
                <input type="text" placeholder="Password" class="form-control traveler_modal-form" v-model="password_digest">
                <label>Confirm Password:</label> 
                <input type="text" placeholder="Bio" class="form-control traveler_modal-form" v-model="password_confirmation">
              </div>
            </div>
            <div class="modal-footer traveler_modal-form">
              <input type="submit" class="btn btn-primary" value="Send" v-on:submit.prevent="submit()">
            </div>
          </div>
        </div>
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
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password_digest: "",
      password_confirmation: "",
      bio: ""
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/profile/" + this.$route.params.id)
      .then(response => {
        this.profile = response.data;
        console.log("User Profile", this.profile);
      });
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        email: this.email,
        password_digest: this.password_digest,
        password_confirmation: this.password_confirmation,
        bio: this.bio
      };
      axios
        .patch(
          "http://localhost:3000/api/profile/" + this.$route.params.id,
          params
        )
        .then(response => {
          this.$router.go(
            "http://localhost:3000/api/profile/" + this.$route.params.id
          );
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  computed: {}
};
</script>
