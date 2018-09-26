<template>
  <div class="home container">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <h1>{{ message }}</h1>
    <a :href="'#/createtrip/'" id="btn-sm" class="btn btn-primary" data-dismiss="modal">Add Trip</a>
    <div class="row">
      <div class="col-lg-4" v-for="trip in trips">
      <div class="card">
        <img id="card-img-modal" class="card-img-top" v-bind:src="trip.image" height="200" alt="Card image cap">
        <div class="card-body">
          <h2 class="card-title">{{ trip.name }}</h2>
          <h6 class="card-text">{{ trip.city }}, {{ trip.state }}, {{ trip.country }}</h6>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span class="bold">Planner: </span>{{ trip.planner }}</li>
          <li class="list-group-item"><span class="bold">Start: </span>{{ trip.start_date }}</li>
          <li class="list-group-item"><span class="bold">End: </span>{{ trip.end_date }}</li>
        </ul>
        <div class="card-body card-body-buttons">
          <button type="button" id="btn-sm" class="btn btn-primary card-link home-card-link-1" data-toggle="modal" data-target="#exampleModal" v-on:click="currentTrip = trip">Travelers
          </button>
          <a :href="'#/trips/' + trip.id + '/itinerary'" id="btn-sm" class="btn btn-secondary card-link home-card-link-2">Itinerary</a>
          <a :href=" '#/trips/' + trip.id " id="btn-sm" class="btn btn-secondary card-link home-card-link-3">Financial Dashboard</a>
        </div>
      </div>
    </div>
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
          <div>
            <div class="modal-body" v-for="traveler in currentTrip.travelers">
             <img class="travelerImage" v-bind:src="traveler.user_photo">
              <p class="modal-traveler-name">{{ traveler.first_name }} {{ traveler.last_name}}</p>
              <a class="bold" :href="'mailto:' + traveler.email">{{ traveler.email }}</a>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="left" class="btn btn-primary" data-dismiss="modal">Add Traveler</button>
            <a class="btn btn-primary" id="emailGroup" href='mailto:katherine@email.com,mallory@email.com,russell@email.com,bailey@email.com,ali@email.com'>Group Email</a>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
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
