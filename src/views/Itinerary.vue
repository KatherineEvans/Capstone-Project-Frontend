<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
      <a href="#/profile"><img class="profile-image" src="../profile_img2.png"></a>
    </div>
    <div class="itineraryHeader">
      <h1>{{ trip.itineraries[0].trip_name }}</h1>
      <h3>{{ message }}</h3>
      <button type="button" class="btn btn-dark" onClick="window.location = '#/itinerary';" v-model="trip.id">Add Itinerary Item</button>
    </div>
    <div>
      <div class="container" id="itineraryList">
        <div class="row rowBackground">
          <div>
            <ul class="timeline">
              <li v-for=" itinerary in trip.itineraries" v-on:click="toggleShowImage(itinerary)">
                <p class="bold">{{ itinerary.description }}</p>
                <p class="italics small">{{ itinerary.time | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>
                <img class="itineraryPhoto" v-bind:src="itinerary.photo" height="200" v-if="itinerary.show_image">
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
      trip: {itineraries: [{trip_name: "Loading..."}]},
      ininerary: {},
      itineraries: []
    };
  },
  created: function() {
    axios
      .get(
        "http://localhost:3000/api/trips/" +
          this.$route.params.id +
          "/itinerary"
      )
      .then(response => {
        console.log("itineraries", response.data.itineraries);
        this.trip = response.data;
      });
  },
  methods: {
    toggleShowImage: function(itinerary) {
      itinerary.show_image = !itinerary.show_image;
    }
  },
  computed: {}
};
</script>
