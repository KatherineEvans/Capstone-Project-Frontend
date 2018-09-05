<template>
  <div class="container">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    <h1 class="top-margin">Add Itinerary Item</h1>
    </div>
    <div class="expenseCreate">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Description:</label> 
          <input type="text" class="form-control" v-model="description">
        </div>
        <div class="form-group">
          <label>Date:</label>
          <input type="datetime-local" class="form-control" v-model="time">
        </div>
        <div class="form-group">
          <label> Trip: </label>
          <select v-model="trip_id">
            <option v-for="trip in trips" v-bind:value="trip.id">
              {{ trip.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Photo (optional):</label>
          <input type="text" class="form-control" v-model="photo">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>
 <script>
import axios from "axios";
export default {
  data: function() {
    return {
      itineraries: [],
      trips: [],
      description: "",
      time: "",
      photo: "",
      trip_id: "",
      trip: this.trip,
      errors: []
    };
  },
  mounted: function() {
    axios.get("http://localhost:3000/api/trips").then(
      function(response) {
        console.log(response);
        this.trips = response.data.trips;
      }.bind(this)
    );
  },
  methods: {
    submit: function() {
      var params = {
        description: this.description,
        time: this.time,
        photo: this.photo,
        trip_id: this.trip_id
      };
      axios
        .post("http://localhost:3000/api/itinerary", params)
        .then(response => {
          this.$router.go(-1);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
