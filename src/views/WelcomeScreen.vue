<template>

  <v-container
    class="bg"
    fluid
    fill-height
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="3"
        md="6"
        sm="8"
        class="ma-8"
        align-self="center"
      >
        <v-row
          justify="center"
          align="center"
          class="ma-0 pa-0"
        >
          <v-img
            class="mb-6"
            max-height="100"
            max-width="400"
            contain
            src='http://pngimg.com/uploads/tesla_logo/tesla_logo_PNG12.png'
          ></v-img>
        </v-row>
        <v-col
          class="rounded-card ma-2 pa-8"
          elevation="0"
          outlined
        >
          <v-form>
            <v-text-field
              solo
              label="Username/Email address"
            ></v-text-field>
            <v-text-field
              solo
              label="Password"
              type="password"
            ></v-text-field>
            <v-checkbox label="Remember me" />
          </v-form>
          <v-row
            justify="end"
            class="mx-1"
          >

            <v-btn color="primary">Login</v-btn>
          </v-row>
        </v-col>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  methods: {
    goToRegister() {
      this.$router.push("register");
    }
  }
});
</script>

<style>
.bg {
  height: 100%;
  width: 100%;
  background-color: #f4f1f4;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23bbc3ff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.v-card.rounded-card {
  border-radius: 8px;
}
</style>