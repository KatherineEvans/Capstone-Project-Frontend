<template>
  <div class="container">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
      <a href="#/profile"><img class="profile-image" src="../profile_img2.png"></a>
    <h1 class="top-margin">Add Trip</h1>
    </div>
    <div class="expenseCreate">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Start Date:</label>
          <input type="date" class="form-control" v-model="start_date">
        </div>
        <div class="form-group">
          <label>End Date:</label>
          <input type="date" class="form-control" v-model="end_date">
        </div>
        <label id="bold"> Destination </label>
        <div class="form-group">
          <label>Country:</label>
          <input type="text" class="form-control" v-model="country">
        </div>
        <div class="form-group">
          <label>State:</label>
          <input type="text" class="form-control" v-model="state">
        </div>
        <div class="form-group">
          <label>City:</label>
          <input type="text" class="form-control" v-model="city">
        </div>
        <div class="form-group">
          <label>Postal Code:</label>
          <input type="text" class="form-control" v-model="postal_code">
        </div>
        <div class="form-group">
          <label>Photo (optional):</label>
          <input type="text" class="form-control" v-model="image">
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
      trips: [],
      errors: [],
      name: "",
      country: "",
      state: "",
      city: "",
      postal_code: "",
      start_date: "",
      end_date: "",
      image: "", 
    };
  },
  mounted: function() {
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        country: this.country,
        state: this.state,
        city: this.city,
        postal_code: this.postal_code,
        start_date: this.start_date,
        end_date: this.end_date,
        image: this.image
      };
      axios
        .post("http://localhost:3000/api/trips", params)
        .then(response => {
          console.log(response);
          this.trip = response.data;
          var paramsTwo = {
            trip_id: this.trip.id
          };
          axios
            .post("http://localhost:3000/api/usertrips", paramsTwo)
            .then(response => {
              this.$router.go("/home");
            })
            .catch(error => {
              this.errors = error.response.data.errors;
            });
        }
        );
    }
  }
};
</script>
