<template>
  <v-container>

    <v-row justify="start">
      <v-card
        outlined
        class="ma-4"
      >
        <v-card-title class="subtitle-1">
          Order No.
        </v-card-title>
        <v-card-text class="headline primary--text">
          {{ orderData.orderNo }}
        </v-card-text>
      </v-card>
      <v-card
        outlined
        class="ma-4"
      >
        <v-card-title class="subtitle-1">
          Customer
        </v-card-title>
        <v-card-text class="headline primary--text">
          {{ orderData.customer.name }}
        </v-card-text>
      </v-card>
      <v-card
        outlined
        class="ma-4"
      >
        <v-card-title class="subtitle-1">
          Total Amount
        </v-card-title>
        <v-card-text class="headline primary--text">
          Rs. {{ orderData.totalAmount }}
        </v-card-text>
      </v-card>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-card
        outlined
        class="ma-4"
      >
        <v-card-title class="title-1">
          Measurements
          <v-card-text>
            <h1 class="subtitle-2">Garment Type: {{ measurementData.type }}</h1>
            <v-row>
              <v-card
                v-for="item in measurementData.measurements"
                :key="item.name"
                outlined
                class="ma-4"
              >
                <v-card-title class="subtitle-1">
                  {{item.name}}
                </v-card-title>
                <v-card-text class="display-1 primary--text">
                  {{item.value}}
                </v-card-text>
              </v-card>
            </v-row>
          </v-card-text>
        </v-card-title>
      </v-card>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["orderData"],
  data: () => ({}),
  computed: {
    measurementData: function() {
      console.log("Measurement Data ");
      return JSON.parse(this.orderData.measurement);
    }
  }
});
</script>
