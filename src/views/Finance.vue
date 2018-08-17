<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="finance-header container">
      <h3>{{ trip.name }}</h3>
      <h6>{{ trip.city }}, {{ trip.state }}, {{ trip.country }}</h6>
    </div>
      <div class="card" style="width: 18rem;">
        <h3 class="card-title">Expenses</h3>
        <div class="card" v-for="expense in trip.expenses">
          <div class="card-body">
            <p>${{ expense.amount }} - {{ expense.description }}</p>
           <!--  <p>{{ expense.category }}</p> -->
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
      message: "Financial Dashboard",
      trip: {},
      itineraries: [],
      expenses: [],
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/expenses").then(
      function(response) {
        console.log(response);
        this.expenses = response.data.expenses;
      }.bind(this)
    );
    {
      axios.get("http://localhost:3000/api/trips/" + this.$route.params.id).then(responseTwo => {
        console.log(responseTwo);
        this.trip = responseTwo.data;
      });
    }
  },
  methods: {},
  computed: {}
};
</script>
