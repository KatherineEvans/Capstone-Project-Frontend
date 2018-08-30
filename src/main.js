import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Vue2Filters from "vue2-filters";

Vue.use(require("vue-moment"));

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = jwt;
}

Vue.use(Vue2Filters);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
