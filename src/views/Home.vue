<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="card" style="width: 18rem;" v-for="trip in trips">
      <img class="card-img-top" v-bind:src="trip.image" width="300" alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title">{{ trip.name }}</h2>
        <p class="card-text">{{ trip.city }}, {{ trip.state }}, {{ trip.country }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Planner: {{ trip.planner }}</li>
        <li class="list-group-item">Start: {{ trip.start_date }}</li>
        <li class="list-group-item">End: {{ trip.end_date }}</li>
      </ul>
      <div class="card-body">
        <button type="button" class="btn btn-primary card-link" data-toggle="modal" data-target="#exampleModal" v-on:click="currentTrip = trip">Travelers
        </button>
        <button type="button" class="btn btn-secondary card-link">Financial Dashboard</button>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLabel">Travelers - {{ currentTrip.name }}</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-for="traveler in currentTrip.travelers">
                <p>{{ traveler.first_name }} {{ traveler.last_name}}</p>
                <a class="emailLink" :href="'mailto:' + traveler.email">{{ traveler.email }}</a>
                <img class="travelerImage" v-bind:src="traveler.user_photo" width="150">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
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
      message: "Your Travel Dashboard",
      trips: [],
      itineraries: [],
      expenses: [],
      currentTrip: {}
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
