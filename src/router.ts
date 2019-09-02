import Vue from "vue";
import Router from "vue-router";
import AddOrder from "./views/AddOrder.vue";
import AddCustomerDetails from "./views/AddCustomerDetails.vue";
import ViewOrders from "./views/ViewOrders.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: AddCustomerDetails
    },
    {
      path: "/add-customer",
      name: "add-customer",
      component: AddCustomerDetails
    },
    {
      path: "/add-order",
      name: "add-order",
      component: AddOrder
    },
    {
      path: "/view-orders",
      name: "view-orders",
      component: ViewOrders
    }
  ]
});
