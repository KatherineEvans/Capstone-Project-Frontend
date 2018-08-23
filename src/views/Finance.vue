<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <h1>{{ message }}</h1>
    <div class="finance-header container">
      <h3>{{ trip.name }}</h3>
      <h6>{{ trip.city }}, {{ trip.state }}, {{ trip.country }}</h6>
    <button type="button" class="btn btn-dark" onClick="window.location = '#/expenses';" v-model="trip.id">Add Expense</button>
    <div><button type="buttonGroupPersonal" class="btn btn-dark" onClick="">View Your Expenses</button></div>
    </div>
      <div class="" style="width: 18rem;">
        <h3 class="card-title">Expenses</h3>
        <div class="card expenseCard" v-for="expense in trip.expenses">
          <div class="card-body">
            <p>${{ expense.amount }} - {{ expense.description }}</p>
            <a :href=" '#/expenses/' + expense.id " class="btn btn btn-link card-link">Edit</a>
            <a :href=" '#' + expense.id " class="btn btn btn-link card-link">Split Expense</a>
          </div>
        </div>
    </div>
    <div class="financeDashboardCharts">
      <canvas id="doughnut-chart"></canvas>
      <canvas id="bar-chart-grouped" width="800" height="450"></canvas>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");
import Chart from "chart.js";

export default {
  data: function() {
    return {
      message: "Financial Dashboard",
      trip: {},
      itineraries: []
      // expenses: []
    };
  },
  mounted: function() {
    // axios.get("http://localhost:3000/api/expenses").then(
    //   function(response) {
    //     console.log(response);
    //     this.expenses = response.data.expenses;
    //   }.bind(this)
    // );
    axios
      .get("http://localhost:3000/api/trips/" + this.$route.params.id)
      .then(response => {
        console.log("expenses", response.data.expenses);
        this.trip = response.data;

        var expensesByCategory = {};

        this.trip.expenses.forEach(function(expense) {
          console.log(
            expense.amount,
            expense.category_name,
            expensesByCategory
          );
          if (!expensesByCategory[expense.category_name]) {
            expensesByCategory[expense.category_name] = parseFloat(
              expense.amount
            );
          } else {
            expensesByCategory[expense.category_name] += parseFloat(
              expense.amount
            );
          }
        });

        var personalExpensesByCategory = {};

        this.trip.personal_expenses.forEach(function(expense) {
          console.log(
            "HEEEYYYYY",
            expense,
            expense.personal_amount,
            expense.personal_category_name,
            expense.personal_expense_type,
            expense.personal_expensesByCategory
          );
          if (!personalExpensesByCategory[expense.personal_category_name]) {
            personalExpensesByCategory[
              expense.personal_category_name
            ] = parseFloat(expense.personal_amount);
          } else {
            personalExpensesByCategory[
              expense.personal_category_name
            ] += parseFloat(expense.personal_amount);
          }
        });

        var groupExpensesByCategory = {};

        this.trip.group_expenses.forEach(function(expense) {
          console.log(
            "HELLOOOO",
            expense,
            expense.group_amount,
            expense.group_category_name,
            expense.group_expense_type,
            expense.group_expensesByCategory
          );
          if (!groupExpensesByCategory[expense.group_category_name]) {
            groupExpensesByCategory[expense.group_category_name] = parseFloat(
              expense.group_amount
            );
          } else {
            groupExpensesByCategory[expense.group_category_name] += parseFloat(
              expense.group_amount
            );
          }
        });

        new Chart(document.getElementById("doughnut-chart"), {
          type: "doughnut",
          data: {
            labels: Object.keys(expensesByCategory),
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "black"
                ],
                data: Object.values(expensesByCategory)
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: "Spending by Category"
            }
          }
        });

        new Chart(document.getElementById("bar-chart-grouped"), {
          type: "bar",
          data: {
            labels: [
              "Travel",
              "Housing",
              "Food & Bev",
              "Entertainment",
              "Shopping",
              "Misc. Expenses"
            ],
            datasets: [
              {
                label: "Personal",
                backgroundColor: "#3e95cd",
                data: Object.values(personalExpensesByCategory)
              },
              {
                label: "Group",
                backgroundColor: "#8e5ea2",
                data: Object.values(groupExpensesByCategory)
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: "Population growth (millions)"
            }
          }
        });
        //   //add new charts before this set of puncuation marks
      });
  },
  methods: {},
  computed: {}
};
</script>
