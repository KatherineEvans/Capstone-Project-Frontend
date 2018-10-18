<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
      <!-- <a :href="'#/profile/' + trips[0].user "><img class="profile-image" src="../profile_img2.png"></a> -->
    </div>
    <h1>{{ message }}</h1>
    <div class="finance-header container">
      <h3>{{ trip.name }}</h3>
      <h6>{{ trip.city }}, {{ trip.state }}, {{ trip.country }}</h6>
    <button type="button" class="btn btn-dark" onClick="window.location = '#/expenses';" v-model="trip.id">Add Expense</button>
    <div>
      <button type="button" class="btn btn-dark buttonGroupPersonal" v-on:click="toggleOnlyViewCurrentUserExpenses()">
        {{onlyViewCurrentUserExpenses ? "View All Expenses" : "View Your Expenses"}}
      </button>
    </div>
    </div>
      <div class="financeDashboardCard" style="width: 18rem;" v-show="!onlyViewCurrentUserExpenses">
        <h3 class="card-title">Trip Expenses</h3>
        <div class="card expenseCard" v-for="expense in trip.expenses">
          <div class="card-body">
            <p><span class="bold">{{ expense.amount | currency }}</span> - {{ expense.description }}</p>
            <p class="italics">Paid for by: {{ expense.payer }}</p>
          </div>
        </div>
      </div>
      <div class="financeDashboardCard" style="width: 18rem;" v-show="onlyViewCurrentUserExpenses">
        <h3 class="card-title">Your Trip Expenses</h3>
        <div class="card expenseCard" v-for="expense in trip.current_user_expenses">
          <div class="card-body">
            <p><span class="bold">{{ expense.amount | currency }}</span> - {{ expense.description }}</p>
            <a :href=" '#/expenses/' + expense.id " id="btn-sm" class="btn btn-link btn-sm card-link finance-card-link-1">Edit</a>
            <button type="button" id="btn-sm" class="btn btn-link btn-sm card-link finance-card-link-2" data-toggle="modal" data-target="#exampleModalCenter">
              Split Expense
            </button>
            <button id="btn-sm" class="btn btn-link btn-sm card-link finance-card-link-3" v-on:click="deleteExpense(expense);window.location.reload();">Delete</button>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLongTitle">Split Expense</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5>Select Recipient</h5>
                    <select v-model="selectedPhoneNumber">
                      <option v-for="traveler in trip.travelers" v-bind:value="traveler.phone" >
                        {{ traveler.first_name }} {{ traveler.last_name }}
                      </option>
                    </select>
                      <h5>Message:</h5>
                      <input type="text" class="form-control" v-model="textBody">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="onSubmit();">Send Text</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="financeDashboardCharts" v-show="!onlyViewCurrentUserExpenses">
      <div class="sumCard">
        <div><span class="bold">Total Spent on Trip: </span>{{ totalSum | currency }}</div>
        <div><span class="bold">Total Personal Spending: </span>{{ personalSum | currency }}</div>
        <div class="finance-list-group-item"><span class="bold">Total Group Spending: </span>{{ groupSum | currency }}</div>
      </div>
      <canvas id="doughnut-chart"></canvas>
      <canvas id="bar-chart-grouped" width="800" height="450"></canvas>
      <canvas id="line-chart" width="800" height="450"></canvas>
    </div>
    <div class="financeDashboardCharts" v-show="onlyViewCurrentUserExpenses">
      <div class="sumCard">
        <div><span class="bold">Total Spent on Trip: </span>{{ totalUserSum | currency }}</div>
        <div><span class="bold">Total Personal Spending: </span>{{ personalUserSum | currency }}</div>
        <div class="finance-list-group-item"><span class="bold">Total Group Spending: </span>{{ groupUserSum | currency }}</div>
      </div>
      <canvas id="user-doughnut-chart"></canvas>
      <canvas id="user-bar-chart-grouped" width="800" height="450"></canvas>
      <canvas id="user-line-chart" width="800" height="450"></canvas>
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
      traveler: {},
      trips: [],
      itineraries: [],
      onlyViewCurrentUserExpenses: false,
      totalSum: 0,
      personalSum: 0,
      groupSum: 0,
      totalUserSum: 0,
      personalUserSum: 0,
      groupUserSum: 0,
      phone: "",
      textBody: "",
      selectedPhoneNumber: ""
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
        console.log("expenses", response.data.expenses, response.data);
        this.trip = response.data;
        this.createChartTotalSpendingByCategory();
        this.createChartTotalSpendingGroupVsPersonal();
        this.createChartTotalSpendingPerDay();
        this.createUserChartTotalSpendingByCategory();
        this.createUserChartTotalSpendingGroupVsPersonal();
        this.createUserChartTotalSpendingPerDay();
        //add new charts before this set of puncuation marks
        this.trip.expenses.forEach(expense => {
          this.totalSum += parseFloat(expense.amount);
          if (expense.expense_type === "Personal") {
            this.personalSum += parseFloat(expense.amount);
          }
          if (expense.expense_type === "Group") {
            this.groupSum += parseFloat(expense.amount);
          }
        });
        this.trip.current_user_expenses.forEach(cuexpense => {
          this.totalUserSum += parseFloat(cuexpense.amount);
          if (cuexpense.expense_type === "Personal") {
            this.personalUserSum += parseFloat(cuexpense.amount);
          }
          if (cuexpense.expense_type === "Group") {
            this.groupUserSum += parseFloat(cuexpense.amount);
          }
        });
      });
  },
  methods: {
    createChartTotalSpendingByCategory: function() {
      new Chart(document.getElementById("doughnut-chart"), {
        type: "doughnut",
        data: {
          labels: Object.keys(this.expensesByCategory),
          datasets: [
            {
              label: "Total Spending by Category",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#69C8CC",
                "#e8c3b9",
                "#c45850",
                "#FBD479"
              ],
              data: Object.values(this.expensesByCategory)
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
    },
    createChartTotalSpendingGroupVsPersonal: function() {
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
              backgroundColor: "#9F9B9A",
              data: Object.values(this.personalExpensesByCategoryId)
              //Need to order by category ID
            },
            {
              label: "Group",
              backgroundColor: "#43B99F",
              data: Object.values(this.groupExpensesByCategoryId)
              //Need to order by category ID
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Spending by Category - Group vs. Personal"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return "$" + value;
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return (
                  "$" +
                  Number(tooltipItem.yLabel)
                    .toFixed(0)
                    .replace(/./g, function(c, i, a) {
                      return i > 0 && c !== "." && (a.length - i) % 3 === 0
                        ? "," + c
                        : c;
                    })
                );
              }
            }
          }
        }
      });
    },
    createChartTotalSpendingPerDay: function() {
      new Chart(document.getElementById("line-chart"), {
        type: "line",
        data: {
          labels: Object.keys(this.expensesByDate),
          datasets: [
            {
              data: Object.values(this.expensesByDate),
              label: "Total",
              borderColor: "#3e95cd",
              fill: false
            },
            {
              data: Object.values(this.personalExpensesByDate),
              label: "Personal",
              borderColor: "#8e5ea2",
              fill: false
            },
            {
              data: Object.values(this.groupExpensesByDate),
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
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return "$" + value;
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return (
                  "$" +
                  Number(tooltipItem.yLabel)
                    .toFixed(0)
                    .replace(/./g, function(c, i, a) {
                      return i > 0 && c !== "." && (a.length - i) % 3 === 0
                        ? "," + c
                        : c;
                    })
                );
              }
            }
          }
        }
      });
    },
    createUserChartTotalSpendingByCategory: function() {
      new Chart(document.getElementById("user-doughnut-chart"), {
        type: "doughnut",
        data: {
          labels: Object.keys(this.userExpensesByCategory),
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#69C8CC",
                "#e8c3b9",
                "#c45850",
                "#FBD479"
              ],
              data: Object.values(this.userExpensesByCategory)
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
    },
    createUserChartTotalSpendingGroupVsPersonal: function() {
      new Chart(document.getElementById("user-bar-chart-grouped"), {
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
              backgroundColor: "#9F9B9A",
              data: Object.values(this.userPersonalExpensesByCategory)
            },
            {
              label: "Group",
              backgroundColor: "#43B99F",
              data: Object.values(this.userGroupExpensesByCategory)
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Spending by Category - Group vs. Personal"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return "$" + value;
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return (
                  "$" +
                  Number(tooltipItem.yLabel)
                    .toFixed(0)
                    .replace(/./g, function(c, i, a) {
                      return i > 0 && c !== "." && (a.length - i) % 3 === 0
                        ? "," + c
                        : c;
                    })
                );
              }
            }
          }
        }
      });
    },
    createUserChartTotalSpendingPerDay: function() {
      new Chart(document.getElementById("user-line-chart"), {
        type: "line",
        data: {
          labels: Object.keys(this.userExpensesSortedByDate),
          datasets: [
            {
              data: Object.values(this.userExpensesSortedByDate),
              label: "Total",
              borderColor: "#3e95cd",
              fill: false
            },
            {
              data: Object.values(this.userPersonalExpensesSortedByDate),
              label: "Personal",
              borderColor: "#8e5ea2",
              fill: false
            },
            {
              data: Object.values(this.userGroupExpensesSortedByDate),
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
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return "$" + value;
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return (
                  "$" +
                  Number(tooltipItem.yLabel)
                    .toFixed(0)
                    .replace(/./g, function(c, i, a) {
                      return i > 0 && c !== "." && (a.length - i) % 3 === 0
                        ? "," + c
                        : c;
                    })
                );
              }
            }
          }
        }
      });
    },
    toggleOnlyViewCurrentUserExpenses: function() {
      this.onlyViewCurrentUserExpenses = !this.onlyViewCurrentUserExpenses;
    },
    onSubmit: function() {
      var params = {
        phone: this.selectedPhoneNumber,
        textBody: this.textBody
      };
      axios
        .post("http://localhost:3000/api/sendtext", params)
        .then(response => {
          console.log("Success!");
          alert("Text Sent!");
          document.getElementById("myForm").reset();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          alert("Text Sent!");
        });
    },
    deleteExpense: function(inputExpense) {
      axios
        .delete("http://localhost:3000/api/expenses/" + inputExpense.id)
        .then(
          function(response) {
            console.log(response.data);
            var index = this.trip.current_user_expenses.indexOf(inputExpense);
            this.expenses.splice(index, 1);
          }.bind(this).then(window.location.refresh())
        );
    }
  },
  computed: {
    expensesByCategory: function() {
      var expensesByCategory = {};
      this.trip.expenses.forEach(function(expense) {
        console.log(expense.amount, expense.category_name, expensesByCategory);
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
      return expensesByCategory;
    },
    userExpensesByCategory: function() {
      var userExpensesByCategory = {};
      this.trip.current_user_expenses.forEach(function(expense) {
        console.log(
          "CURRENT USER",
          expense.current_user_expense_amount,
          expense.category_name,
          userExpensesByCategory
        );
        if (!userExpensesByCategory[expense.category_name]) {
          userExpensesByCategory[expense.category_name] = parseFloat(
            expense.amount
          );
        } else {
          userExpensesByCategory[expense.category_name] += parseFloat(
            expense.amount
          );
        }
      });
      return userExpensesByCategory;
    },
    personalExpensesByCategory: function() {
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
      return personalExpensesByCategory;
    },
    personalExpensesByCategoryId: function() {
      var personalExpensesByCategoryId = {};
      this.trip.personal_expenses_category.forEach(function(expense) {
        console.log(expense);
        if (!personalExpensesByCategoryId[expense.personal_category_name]) {
          personalExpensesByCategoryId[expense.personal_category_name] = parseFloat(expense.personal_amount);
        } else {
          personalExpensesByCategoryId[expense.personal_category_name] += parseFloat(expense.personal_amount);
        }
      });
      return personalExpensesByCategoryId;
    },
    userPersonalExpensesByCategory: function() {
      var userPersonalExpensesByCategory = {};
      this.trip.current_user_personal_expenses.forEach(function(expense) {
        console.log(
          expense.amount,
          expense.category_name, //category_name doesn't exist
          expense.expense_type
        );
        if (!userPersonalExpensesByCategory[expense.category_name]) {
          userPersonalExpensesByCategory[expense.category_name] = parseFloat(
            expense.amount
          );
        } else {
          userPersonalExpensesByCategory[expense.category_name] += parseFloat(
            expense.amount
          );
        }
      });
      return userPersonalExpensesByCategory;
    },
    groupExpensesByCategory: function() {
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
      return groupExpensesByCategory;
    },
    groupExpensesByCategoryId: function() {
      var groupExpensesByCategoryId = {};
      this.trip.group_expenses_category.forEach(function(expense) {
        console.log(expense);
        if (!groupExpensesByCategoryId[expense.group_category_name]) {
          groupExpensesByCategoryId[expense.group_category_name] = parseFloat(expense.group_amount);
        } else {
          groupExpensesByCategoryId[expense.group_category_name] += parseFloat(expense.group_amount);
        }
      });
      return groupExpensesByCategoryId;
    },
    userGroupExpensesByCategory: function() {
      var userGroupExpensesByCategory = {};
      this.trip.current_user_group_expenses.forEach(function(expense) {
        console.log(
          expense,
          expense.amount,
          expense.category_name, //category name doesn't exist
          expense.expense_type
        );
        if (!userGroupExpensesByCategory[expense.category_name]) {
          userGroupExpensesByCategory[expense.category_name] = parseFloat(
            expense.amount
          );
        } else {
          userGroupExpensesByCategory[expense.category_name] += parseFloat(
            expense.amount
          );
        }
      });
      return userGroupExpensesByCategory;
    },
    expensesByDate: function() {
      var expensesByDate = {};
      this.trip.expenses.forEach(function(expense) {
        console.log(expense.date, expense.amount, expensesByDate);
        if (!expensesByDate[expense.date]) {
          expensesByDate[expense.date] = parseFloat(expense.amount);
        } else {
          expensesByDate[expense.date] += parseFloat(expense.amount);
        }
      });
      return expensesByDate;
    },
    userExpensesByDate: function() {
      var userExpensesByDate = {};
      this.trip.current_user_expenses.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userExpensesByDate[expense.date]) {
          userExpensesByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userExpensesByDate[expense.date] += parseFloat(expense.amount);
        }
      });
      return userExpensesByDate;
    },
    userExpensesSortedByDate: function() {
      var userExpensesSortedByDate = {};
      this.trip.current_user_expenses_date.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userExpensesSortedByDate[expense.date]) {
          userExpensesSortedByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userExpensesSortedByDate[expense.date] += parseFloat(expense.amount);
        }
      });
      return userExpensesSortedByDate;
    },
    groupExpensesByDate: function() {
      var groupExpensesByDate = {};
      this.trip.group_expenses.forEach(function(expense) {
        console.log("GROUP DATE", expense.group_date, expense.group_amount);
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
      return groupExpensesByDate;
    },
    userGroupExpensesByDate: function() {
      var userGroupExpensesByDate = {};
      this.trip.current_user_group_expenses.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userGroupExpensesByDate[expense.date]) {
          userGroupExpensesByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userGroupExpensesByDate[expense.date] += parseFloat(expense.amount);
        }
      });
      return userGroupExpensesByDate;
    },
    userGroupExpensesSortedByDate: function() {
      var userGroupExpensesSortedByDate = {};
      this.trip.current_user_group_expenses_date.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userGroupExpensesSortedByDate[expense.date]) {
          userGroupExpensesSortedByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userGroupExpensesSortedByDate[expense.date] += parseFloat(expense.amount);
        }
      });
      return userGroupExpensesSortedByDate;
    },
    personalExpensesByDate: function() {
      var personalExpensesByDate = {};
      this.trip.personal_expenses.forEach(function(expense) {
        console.log(
          "PERSONAL DATE",
          expense.personal_date,
          expense.personal_amount
        );
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
      return personalExpensesByDate;
    },
    userPersonalExpensesByDate: function() {
      var userPersonalExpensesByDate = {};
      this.trip.current_user_personal_expenses.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userPersonalExpensesByDate[expense.date]) {
          userPersonalExpensesByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userPersonalExpensesByDate[expense.date] += parseFloat(
            expense.amount
          );
        }
      });
      return userPersonalExpensesByDate;
    },
    userPersonalExpensesSortedByDate: function() {
      var userPersonalExpensesSortedByDate = {};
      this.trip.current_user_personal_expenses_date.forEach(function(expense) {
        console.log(expense.date, expense.amount);
        if (!userPersonalExpensesSortedByDate[expense.date]) {
          userPersonalExpensesSortedByDate[expense.date] = parseFloat(expense.amount);
        } else {
          userPersonalExpensesSortedByDate[expense.date] += parseFloat(
            expense.amount
          );
        }
      });
      return userPersonalExpensesSortedByDate;
    }
  }
};
</script>
