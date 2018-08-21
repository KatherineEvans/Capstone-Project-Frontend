<template>
  <div class="home">
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
      trip: {},
      itinerary: {},
      itineraries: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/itinerary").then(
        function(response) {
          console.log(response);
          this.itineraries = response.data.itineraries;
        }.bind(this)
      );
  },
  methods: {},
  computed: {}
};
</script>
