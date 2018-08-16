<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="expense in expenses" where >
      
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
      message: "Finances",
      trips: [],
      itineraries: [],
      expenses: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/expenses").then(
      function(response) {
        console.log(response);
        this.expenses = response.data.expenses;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
