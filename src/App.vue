<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list
        rounded=""
        dense
      >
        <v-list-item-group v-model="currentItem">
          <v-list-item
            class="mt-4"
            @click="routeTo('add-customer');"
            key="add-customer"
            color="primary"
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">Add Customer Details</v-list-item-title>
          </v-list-item>
          <div style="height: 8px;"></div>
          <v-list-item
            @click="routeTo('view-orders');"
            key="view-orders"
            color="primary"
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-checkbox-multiple-marked</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">View Orders</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="routeTo('add-order');"
            key="add-order"
            color="primary"
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-cart-plus</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">Add New Order</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left=""
      elevate-on-scroll=""
      color="white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Tailor Shop</span>
      </v-toolbar-title>

    </v-app-bar>

    <v-content>

      <router-view></router-view>

    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},
  mounted() {
    localStorage.setItem(
      "apollo-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjODI1ODFhLWNmZGMtNDhmZi1iYjEwLWFjYjRjODZkNWI3OCIsImlhdCI6MTU2NzA5NTQ3M30.JSfJ8jAYBT2Kj1aFSLL21cBEfnK1bbJPnUQCUGtJXHM"
    );
  },
  data: () => ({
    drawer: true,
    currentItem: "view-orders"
    //
  }),
  methods: {
    routeTo(item: string) {
      this.$router.replace(item);
      this.currentItem = item;
    }
  }
});
</script>
