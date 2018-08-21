<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
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
  color: #42b983;
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
  transform: translateY(-1rem);
  box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
  /*first value is X axis, second is Y axis, thrid is blur, fourth is color!*/
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

body {
  background-image: url("https://images.unsplash.com/photo-1484383707950-89c8d3276e53?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a0693ba93ada80cf1b0e2f01d12ebf4&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
}

</style>
