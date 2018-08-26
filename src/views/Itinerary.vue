<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <div class="itineraryHeader">
      <h1>{{ trip.itineraries[0].trip_name }}</h1>
      <h3>{{ message }}</h3>
    </div>
    <div>
      <div class="container mt-5 mb-5">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <ul class="timeline">
              <li v-for=" itinerary in trip.itineraries">
                <p>{{ itinerary.description }}</p>
                <p>{{ itinerary.time }}</p>
              </li>
            </ul>
          </div>
        </div>
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
      message: "Trip Itinerary",
      trips: [],
      trip: {},
      ininerary: {},
      itineraries: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/trips/" + this.$route.params.id + "/itinerary")
      .then(response => {
        console.log("itineraries", response.data.itineraries);
        this.trip = response.data;
      });
  },
  methods: {},
  computed: {}
};
</script>


