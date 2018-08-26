<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
.landing {
  padding: 35px;
  border: 15px;
  background-color: rgba(168, 77, 62, 0.75);
  margin-top: 150px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 50px;
  box-shadow: 10px 10px 16px -10px #55433E;
}
/*7F413D FEE8B7 2F2C2F*/
/*rgba(168, 77, 62, 0.5)*/
.landing h1 {
  font-size: 8em;
  margin-bottom: -20px;
  color: #FFFAE7;
}
.landing h3 {
  font-size: 40px;
  font-style: italic;
  color: #FFFAE7;
}
.loginLable {
  color: #FFFAE7;
  font-weight: bold;

}
.signupBtn {
  margin-right: 15px;
  background-color: #55433E;
}
.loginBtn {
  background-color: #55433E;
  border-color: #55433E;
}

.signupBtn:hover {
  text-decoration: underline;
}
.loginBtn:hover {
  text-decoration: underline;
}
.card{
  margin: 10px;
}
.financeDashboardCard {
  float: left;
  width: 200px;
}
.financeDashboardCharts {
  float: right;
  margin-right: 20px;
  width: calc(100% - 320px);
}
.buttonGroupPersonal {
  margin-top: 10px;
}
.sumCard {
  width: 100%;
  background-color: rgba(255, 250, 231, 0.85);
  border-color: transparent;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 47px;
  border-color: grey;
  border-radius: 25px;
  font-size: 18px;
  padding: 10px;
}
.bold {
  font-weight: bold;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  text-decoration: underline;
}
.row {
  padding: 15px 15px 15px 15px;
}
.btn:hover {
  transform: translateY(-.3rem);
  box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
  /*first value is X axis, second is Y axis, thrid is blur, fourth is color!*/
}
.card:hover {
  box-shadow: 0 1.5rem 2.5rem rgba(0,0,0,.5);
}
#card-img-modal {
  padding: 10px;
}
.title-span {
  font-weight: bold;
}
.home-card-link-1 {
  float: center;
}
.home-card-link-2 {
  position: relative;
}
.home-card-link-3 {
  float: center;
  margin: 15px;
}
.modal-body {
  margin: 7.5px;
  padding: 7.5px;
}
.emailLink {
  font-weight: bold;
}
.travelerImage {
  width: 150px;
  padding: 7.5px;
}
.modal-traveler-name {
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
}
.modal-body:hover {
  background-color: #F0EEEF;
}
.expenseCard {
  background-color: rgba(255, 250, 231, 0.85);
}
#doughnut-chart {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
#line-chart {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
#bar-chart-grouped {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
#user-doughnut-chart {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
#user-line-chart {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
#user-bar-chart-grouped {
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: rgba(255, 250, 231, 0.85);
  border-radius: 25px;
  padding: 10px;
}
.quick-look .card {
  background-color: rgba(255, 250, 231, 0.75);
}
.bold {
  text-decoration: bold;
}
body {
  background-image: url("https://images.unsplash.com/photo-1484383707950-89c8d3276e53?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a0693ba93ada80cf1b0e2f01d12ebf4&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}
ul.timeline {
    list-style-type: none;
    position: relative;
    background-color: rgba(255, 250, 231, 0.85);
    padding: 35px;
    border-radius: 25px;
    font-size: 20px;
}
ul.timeline:before {
    content: ' ';
    background: black;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 90%;
    z-index: 400;
}
ul.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid black;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>
