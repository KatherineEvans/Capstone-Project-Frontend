<template>
  <div class="expenseCreate container">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <div class="">
      <form v-on:submit.prevent="submit()">
        <h1>Edit Expense</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Amount:</label> 
          <input type="text" class="form-control" v-model="amount">
        </div>
        <div class="form-group">
          <label>Expense Description:</label>
          <input type="text" class="form-control" v-model="description">
        </div>
        <div class="form-group">
          <label> Expense Category: </label>
          <select v-model="category_id">
            <option v-for="category in categories" v-bind:value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Expense Type: </label>
          <select v-model="expense_type">
            <option value="Personal">
              Personal Expense
            </option>
            <option value="Group">
              Group Expense
            </option>
          </select>

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
          <label>Expense Date:</label>
          <input type="date" class="form-control" v-model="date">
        </div>
        <div class="form-group">
          <label>Image (optional):</label>
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
      expense: {},
      categories: [],
      trips: [],
      description: "",
      amount: "",
      photo: "",
      trip_id: "",
      category_id: "",
      expense_type: "",
      date: "",
      itinerary_id: "",
      trip: "",
      errors: []
    };
  },
  mounted: function() {
    axios.get("http://localhost:3000/api/categories").then(
      function(response) {
        console.log(response);
        this.categories = response.data.categories;
      }.bind(this)
    );
    {
      axios.get("http://localhost:3000/api/trips").then(
        function(response) {
          console.log(response);
          this.trips = response.data.trips;
        }.bind(this)
      );
    }
    {
      axios
        .get("http://localhost:3000/api/expenses/" + this.$route.params.id)
        .then(responseTwo => {
          console.log(responseTwo);
          this.expense = responseTwo.data;
          this.amount = this.expense.amount;
          this.description = this.expense.description;
          this.category_id = this.expense.category_id;
          this.expense_type = this.expense.expense_type;
          this.date = this.expense.date;
          this.trip_id = this.expense.trip_id;
        });
    }
  },
  methods: {
    submit: function() {
      var params = {
        description: this.description,
        amount: this.amount,
        photo: this.photo,
        category_id: this.category_id,
        expense_type: this.expense_type,
        date: this.date,
        trip_id: this.trip_id,
        itinerary_id: this.itinerary_id
      };
      axios
        .patch(
          "http://localhost:3000/api/expenses/" + this.$route.params.id,
          params
        )
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
