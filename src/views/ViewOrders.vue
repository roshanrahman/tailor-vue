<template>
  <v-content>
    <v-row
      justify="start"
      class="mx-12 pb-8"
    >
      <v-col
        cols="12"
        lg="10"
        sm="12"
      >
        <v-row class="mb-8">

          <h1 class="display-1 primary--text">View Orders </h1>
          <v-spacer></v-spacer>
          <v-btn
            @click="routeToAddOrder()"
            color="primary"
            elevation="0"
          >New Order</v-btn>
        </v-row>
        <v-data-table
          :items="viewOrders.orders"
          :headers="headers"
        >

          <template v-slot:item.totalAmount="{ item }">
            Rs. {{ item.totalAmount }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.measurement="{ item }">
            <v-btn
              outlined
              rounded
              @click="showOrderDetails(item);"
              small=""
              text=""
              color="primary"
            >View Measurement</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isEditDialogVisible"
      fullscreen=""
    >
      <v-card class="pa-8">
        <v-row>
          <v-btn
            icon=""
            color="primary"
            @click="isEditDialogVisible = false;"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-row>
        <h1 class="headline text-center primary--text">Edit Order</h1>
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
              outlined
              text
              @click="isEditDialogVisible = false;"
            >Cancel</v-btn>
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

      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOrderDetailsDialogVisible"
      max-width="600"
    >
      <v-card class="pa-8">
        <v-row>
          <v-btn
            icon=""
            color="primary"
            @click="isOrderDetailsDialogVisible = false;"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-row>
        <OrderDetails :orderData="currentOrder"></OrderDetails>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isSuccessDialogVisible"
    >
      <v-card>
        <v-card-title>Customer Added Successfully</v-card-title>
        <v-card-text>
          The customer details were successfully added to the database.
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
    <v-dialog
      max-width="400"
      v-model="isDeleteDialogVisible"
    >
      <v-card>
        <v-card-title class="red--text darken-1">Are you sure you want to delete this order?</v-card-title>
        <v-card-text>
          You cannot undo this operation.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="isDeleteDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            color="red darken-1"
            text
            outlined=""
            @click="performDeleteMutation();"
          >Delete</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-content>
</template>

<script>
import { ShirtMeasurementType } from "../measurements/measurements";
import { viewOrders } from "../graphql/queries";
import { deleteOrderMutation } from '../graphql/mutations';
import OrderDetails from "../components/OrderDetails";
export default {
  mounted () {
  },
  components: {
    OrderDetails
  },
  methods: {
    routeToAddOrder () {
      this.$router.replace("add-order");
      this.$emit('routeChangedFromExternal', 'add-order');
    },
    editItem (item) {
      this.isEditDialogVisible = true;
    },
    deleteItem (item) {
      this.orderIdForDeletion = item.id;
      this.isDeleteDialogVisible = true;
    },
    performDeleteMutation () {
      this.$apollo.mutate({
        mutation: deleteOrderMutation,
        variables: {
          orderId: this.orderIdForDeletion
        }
      });
      this.isDeleteDialogVisible = false;
      this.$apollo.queries.viewOrders.refetch();
    },
    showOrderDetails (item) {
      this.currentOrder = item;
      this.isOrderDetailsDialogVisible = true;
    }
  },
  data () {
    return {
      viewCustomers: [],
      errorString: '',
      selectedCustomerId: 1,
      orderIdForDeletion: '',
      currentOrder: {},
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
      isSuccessDialogVisible: false,
      isErrorDialogVisible: false,
      isEditDialogVisible: false,
      isDeleteDialogVisible: false,
      isOrderDetailsDialogVisible: false,
      headers: [
        {
          text: 'Order No.',
          value: 'orderNo'
        },
        {
          text: 'Customer Name',
          value: 'customer.name'
        },
        {
          text: 'Total Amount (in Rs.)',
          value: 'totalAmount'
        },
        {
          text: 'Measurement',
          value: 'measurement'
        },
        {
          text: 'Actions',
          value: 'action'
        }
      ],
      viewOrders: {},
    }
  },
  apollo: {
    viewOrders: {
      query: viewOrders,
      pollInterval: 5
    }
  }
}
</script>

<style>
</style>