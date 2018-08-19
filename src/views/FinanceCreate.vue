<template>
  <div class="expenseCreate container">
    <div class="">
      <form v-on:submit.prevent="submit()">
        <h1>Add Expense</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Amount:</label> 
          <input type="number" class="form-control" v-model="amount">
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
            <option value="1">
              Personal Expense
            </option>
            <option value="2">
              Group Expense
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
      categories: [],
      description: "",
      amount: "",
      photo: "",
      trip_id: "",
      category_id: "",
      expense_type: "",
      date: "",
      itinerary_id: "",
      trip: this.trip,
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
      axios
        .get("http://localhost:3000/api/trips/" + this.$route.params.id)
        .then(responseTwo => {
          console.log(responseTwo);
          this.trip = responseTwo.data;
        });
    }
  },
  methods: {
    submit: function() {
      var params = {
        description: this.description,
        amount: this.amount,
        photo: this.photo,
        trip_id: this.trip_id,
        category_id: this.category_id,
        expense_type: this.expense_type,
        date: this.date,
        itinerary_id: this.itinerary_id
      };
      axios
        .post("http://localhost:3000/api/expenses", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
