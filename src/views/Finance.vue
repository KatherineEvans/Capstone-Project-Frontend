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
    <div><button type="button" class="btn btn-dark buttonGroupPersonal" onClick="">View Your Expenses</button></div>
    </div>
      <div class="financeDashboardCard" style="width: 18rem;">
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
      <div class="sumCard">
        <div><span class="bold">Total Spent on Trip: </span>$INSERT SUM</div>
        <div><span class="bold">Total Personal Spending: </span>$INSERT SUM</div>
        <div class="finance-list-group-item"><span class="bold">Total Group Spending: </span>INSERT SUM</div>
      </div>
      <canvas id="doughnut-chart"></canvas>
      <canvas id="bar-chart-grouped" width="800" height="450"></canvas>
      <canvas id="line-chart" width="800" height="450"></canvas>
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
      itineraries: [],
      totalSum: [],
      personalSum: [],
      groupSum: []
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
            "PERSONAL EXPENSES",
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
            "GROUP EXPENSES",
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

        var expensesByDate = {};

        this.trip.expenses.forEach(function(expense) {
          console.log(expense.date, expense.amount, expensesByDate);
          if (!expensesByDate[expense.date]) {
            expensesByDate[expense.date] = parseFloat(expense.amount);
          } else {
            expensesByDate[expense.date] += parseFloat(expense.amount);
          }
        });

        var groupExpensesByDate = {};

        this.trip.group_expenses.forEach(function(expense) {
          console.log("GROUP DATE", 
            expense.group_date, 
            expense.group_amount);
          if (!groupExpensesByDate[expense.group_date]) {
            groupExpensesByDate[expense.group_date] = parseFloat(
              expense.group_amount
            );
          } else {
            groupExpensesByDate[expense.group_date] += parseFloat(
              expense.group_amount
            );
          }
        });

        var personalExpensesByDate = {};

        this.trip.personal_expenses.forEach(function(expense) {
          console.log("PERSONAL DATE", 
            expense.personal_date, 
            expense.personal_amount);
          if (!personalExpensesByDate[expense.personal_date]) {
            personalExpensesByDate[expense.personal_date] = parseFloat(
              expense.personal_amount
            );
          } else {
            personalExpensesByDate[expense.personal_date] += parseFloat(
              expense.personal_amount
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
              text: "Total Spending by Category"
            }
          }
        });

        new Chart(document.getElementById("bar-chart-grouped"), {
          type: "bar",
          data: {
            labels: [
              "Travel",
              "Lodging",
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
              text: "Spending by Category - Group vs. Personal"
            }
          }
        });

        new Chart(document.getElementById("line-chart"), {
          type: "line",
          data: {
            labels: Object.keys(expensesByDate),
            datasets: [
              {
                data: Object.values(expensesByDate),
                label: "Total",
                borderColor: "#3e95cd",
                fill: false
              },
              {
                data: Object.values(personalExpensesByDate),
                label: "Personal",
                borderColor: "#8e5ea2",
                fill: false
              },
              {
                data: Object.values(groupExpensesByDate),
                label: "Group",
                borderColor: "#3cba9f",
                fill: false
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: "Spending Per Day"
            }
          }
        });
        //add new charts before this set of puncuation marks
      });
  },
  methods: {},
  computed: {}
};
</script>
