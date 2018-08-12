<template>
  <div class="landing">
    <h1>{{ title }}</h1>
    <h3>{{ message }}</h3>
  <div>
    <a class="btn btn-dark btn-lg" href="#/Signup" role="button">Signup</a>
    <a class="btn btn-dark btn-lg" href="#/Login" role="button">Login</a>
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
      message: "Let's get going..."
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>