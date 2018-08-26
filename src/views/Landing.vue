<template>
  <div class="landing">
    <h1>{{ title }}</h1>
    <h3>{{ message }}</h3>
  <div>
    <a class="signupBtn btn btn-dark btn-lg" href="#/Signup" role="button">Signup</a>
    <a class="loginBtn btn btn-dark btn-lg" href="#/Login" role="button">Login</a>
  </div>
</div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      title: "Roam", 
      message: "Travel Wallet"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>