import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Finance from "./views/Finance.vue";
import FinanceCreate from "./views/FinanceCreate.vue";
import FinanceEdit from "./views/FinanceEdit.vue";
import Itinerary from "./views/Itinerary.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/trips/:id",
      name: "finance",
      component: Finance
    },
    {
      path: "/expenses",
      name: FinanceCreate,
      component: FinanceCreate
    },
    {
      path: "/expenses/:id",
      name: FinanceEdit,
      component: FinanceEdit
    },
    {
      path: "/trips/:id/itinerary",
      name: Itinerary,
      component: Itinerary
    }
  ]
});
