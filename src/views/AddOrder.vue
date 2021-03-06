<template>
  <v-content>
    <v-row
      justify="start"
      class="mx-12 pb-8"
    >
      <v-col
        cols="12"
        lg="8"
        sm="12"
      >

        <h1 class="display-1 primary--text">Add new order </h1>
        <h2 class="subtitle-1">Fill in the details and submit to create new order.</h2>
        <v-divider class="my-4"></v-divider>
        <v-form ref="customerForm">
          <h1 class="title mb-4">Select Customer</h1>
          <v-overflow-btn
            solo
            v-model="selectedCustomerId"
            item-text="name"
            item-value="id"
            :items="viewCustomers.customers"
          ></v-overflow-btn>
          <h1 class="title mb-4">Garment Type</h1>
          <v-overflow-btn
            solo
            v-model="selectedGarmentType"
            :items="garmentTypes"
          ></v-overflow-btn>
          <h1 class="title mb-4">Measurements</h1>
          <!-- shirt -->
          <v-row v-if="selectedGarmentType == 'Shirt'">
            <v-col cols="4">
              <v-text-field
                solo
                label="Shirt Length"
                @mouseenter="currentCarouselItem = 0;"
                v-model="formInputsForShirt.shirtLengthInput"
              ></v-text-field>
              <v-text-field
                solo
                label="Chest Width"
                @mouseenter="currentCarouselItem = 1;"
                v-model="formInputsForShirt.chestWidthInput"
              >

              </v-text-field>
              <v-text-field
                solo
                label="Sleeve Length"
                @mouseenter="currentCarouselItem = 2;"
                v-model="formInputsForShirt.sleeveLengthInput"
              >

              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-carousel
                v-model="currentCarouselItem"
                hide-delimiters=""
                :show-arrows="false"
              >
                <v-carousel-item
                  v-for="image in shirtImages"
                  :key="image"
                  transition="no-transition"
                  reverse-transition="no-transition"
                >
                  <v-img :src="image"></v-img>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
          <!-- pant -->
          <v-row v-if="selectedGarmentType == 'Pants'">
            <v-col cols="4">
              <v-text-field
                solo
                label="Leg Inseam"
                @mouseenter="currentCarouselItem = 0;"
                v-model="formInputsForPants.pantsLengthInput"
              > </v-text-field>
              <v-text-field
                solo
                label="Waist size"
                @mouseenter="currentCarouselItem = 1;"
                v-model="formInputsForPants.waistLengthInput"
              ></v-text-field>

            </v-col>
            <v-col cols="8">
              <v-carousel
                v-model="currentCarouselItem"
                hide-delimiters=""
                :show-arrows="false"
              >
                <v-carousel-item
                  v-for="image in pantsImages"
                  :key="image"
                  transition="no-transition"
                  reverse-transition="no-transition"
                >
                  <v-img :src="image"></v-img>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
          <h1 class="title mb-4">Price</h1>
          <v-text-field
            solo
            prefix="Rs."
            type="number"
            v-model.number="costInput"
          >

          </v-text-field>
          <v-row justify="end">
            <v-btn
              class="ma-4"
              color="primary"
              :disabled="!isAllFieldsValidated"
              :loading="isMutationOngoing"
              @click="sendMutation()"
            >Create</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <v-spacer class="my-6"></v-spacer>

      </v-col>
    </v-row>
    <v-dialog
      max-width="400"
      v-model="isSuccessDialogVisible"
    >
      <v-card>
        <v-card-title>Order Added Successfully</v-card-title>
        <v-card-text>
          The order details were successfully added to the database.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="isSuccessDialogVisible = false;"
          >Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isErrorDialogVisible"
    >
      <v-card>
        <v-card-title class="red--text darken-1">Something went wrong</v-card-title>
        <v-card-text>
          The following error was encountered: {{ errorString }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="isErrorDialogVisible = false;"
          >Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { createCustomerMutation, addOrderMutation } from "../graphql/mutations";
import { viewCustomers } from "../graphql/queries";
import { ShirtMeasurementType, PantsMeasurementType } from '../measurements/measurements';

export default {
  apollo: {
    viewCustomers: {
      query: viewCustomers,
    }
  },
  data () {
    return {
      viewCustomers: [],
      errorString: '',
      selectedCustomerId: 1,
      garmentTypes: ['Shirt', 'Pants'],
      selectedGarmentType: 'Shirt',
      shirtImages: [
        require("../assets/shirt-length.png"),
        require("../assets/chest-width.png"),
        require("../assets/sleeve-length.png"),

      ],
      pantsImages: [
        require("../assets/pants-length.png"),
        require("../assets/pants-waist.png"),
      ],
      currentCarouselItem: 0,
      isMutationOngoing: false,
      isSuccessDialogVisible: false,
      isErrorDialogVisible: false,
      formInputsForShirt: {
        shirtLengthInput: '',
        chestWidthInput: '',
        sleeveLengthInput: '',
      },
      formInputsForPants: {
        pantsLengthInput: '',
        waistLengthInput: '',
      },
      costInput: null,
    }
  },
  computed: {
    isAllFieldsValidated: function () {
      if (this.selectedGarmentType == 'Shirt') {
        if (!!this.formInputsForShirt.shirtLengthInput &&
          !!this.formInputsForShirt.chestWidthInput &&
          !!this.formInputsForShirt.sleeveLengthInput && !!this.costInput) return true;
        return false;
      } else {
        if (!!this.formInputsForPants.pantsLengthInput &&
          !!this.formInputsForPants.waistLengthInput && !!this.costInput) return true;
        return false;
      }
    }
  },
  methods: {
    async sendMutation () {
      this.isMutationOngoing = true;
      var measurementsString = '';
      var measurementObject = {};

      if (this.selectedGarmentType == 'Shirt') {
        measurementObject = new ShirtMeasurementType(
          this.formInputsForShirt.shirtLengthInput,
          this.formInputsForShirt.chestWidthInput,
          this.formInputsForShirt.sleeveLengthInput
        );
        measurementsString = measurementObject.encodeToString();
      } else {
        measurementObject = new PantsMeasurementType(
          this.formInputsForPants.pantsLengthInput,
          this.formInputsForPants.waistLengthInput
        );
        measurementsString = measurementObject.encodeToString();
      }
      await this.$apollo.mutate(
        {
          mutation: addOrderMutation,
          variables: {
            measurement: measurementsString,
            totalAmount: this.costInput,
            type: this.selectedGarmentType,
            customerId: this.selectedCustomerId
          },

        }
      ).then((data) => {
        console.log('Returned from mutation', data);
        this.isMutationOngoing = false;
        if (!!data.data.addOrder.error || !!data.errors) {
          this.isErrorDialogVisible = true;
          this.errorString = data.data.addOrder.error.message;
        } else {
          this.$refs.customerForm.reset();
          this.isSuccessDialogVisible = true;
        }

      });

    }
  }

}
</script>

<style>
</style>