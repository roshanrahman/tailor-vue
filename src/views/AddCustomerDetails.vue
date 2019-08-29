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

        <h1 class="display-1 primary--text">Add new customer </h1>
        <h2 class="subtitle-1">Fill in the details and submit to create new customer.</h2>
        <v-divider class="my-4"></v-divider>
        <v-form ref="customerForm">
          <h1 class="title mb-4">Personal Information</h1>
          <v-text-field
            label="Name"
            filled=""
            v-model="formInputs.nameInput"
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="formInputs.phoneNumberInput"
            filled=""
          ></v-text-field>
          <v-text-field
            label="Email"
            filled=""
            v-model="formInputs.emailInput"
          ></v-text-field>
          <h1 class="title mb-4">Address</h1>
          <v-textarea
            filled
            label="Address"
            v-model="formInputs.addressLineInput"
          >

          </v-textarea>
          <v-text-field
            filled
            label="Landmark"
            v-model="formInputs.landmarkInput"
          ></v-text-field>
          <v-row justify="end">
            <v-btn
              class="ma-4"
              color="primary"
              :disabled="!isAllFieldsValidated"
              :loading="isMutationOngoing"
              @click="sendMutation()"
            >Create</v-btn>

          </v-row>
        </v-form>
      </v-col>
    </v-row>
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
  </v-content>
</template>

<script>
import { createCustomerMutation } from "../graphql/mutations";
export default {
  data () {
    return {
      errorString: '',
      isMutationOngoing: false,
      isSuccessDialogVisible: false,
      isErrorDialogVisible: false,
      formInputs: {
        nameInput: '',
        phoneNumberInput: '',
        emailInput: '',
        addressLineInput: '',
        landmarkInput: '',
      }
    }
  },
  computed: {
    isAllFieldsValidated: function () {
      if (
        !!this.formInputs.nameInput &&
        !!this.formInputs.phoneNumberInput &&
        !!this.formInputs.emailInput &&
        !!this.formInputs.addressLineInput &&
        !!this.formInputs.landmarkInput
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    async sendMutation () {
      this.isMutationOngoing = true;
      await this.$apollo.mutate(
        {
          mutation: createCustomerMutation,
          variables: {
            address: {
              name: this.formInputs.nameInput,
              addressLine: this.formInputs.addressLineInput,
              landmark: this.formInputs.landmarkInput,
              phoneNumber: this.formInputs.phoneNumberInput
            },
            email: this.formInputs.emailInput,
            name: this.formInputs.nameInput,
            phoneNumber: this.formInputs.phoneNumberInput
          },

        }
      ).then((data) => {
        console.log('Returned from mutation', data);
        this.isMutationOngoing = false;
        if (!!data.errors) {
          this.$refs.customerForm.reset();
          this.isSuccessDialogVisible = true;
        } else {
          this.isErrorDialogVisible = true;
          this.errorString = data.data.createCustomer.error.message;
        }

      });

    }
  }

}
</script>

<style>
</style>