<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "Trip Itinerary",
      currentTrip: {},
      trips: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/trips").then(
      function(response) {
        console.log(response);
        this.trips = response.data.trips;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>


