import gql from "graphql-tag";

let createCustomerMutation = gql`
  mutation(
    $address: AddressType
    $email: String
    $name: String
    $phoneNumber: String
  ) {
    createCustomer(
      address: $address
      email: $email
      name: $name
      phoneNumber: $phoneNumber
    ) {
      user {
        id
        phoneNumber
        name
      }
      error {
        message
      }
      jwtToken
    }
  }
`;

let addOrderMutation = gql`
  mutation($measurement: String, $totalAmount: Float, $type: String) {
    addOrder(
      measurement: $measurement
      totalAmount: $totalAmount
      type: $type
    ) {
      error {
        message
      }
      orders {
        id
        orderNo
        totalAmount
        measurement
      }
    }
  }
`;

export { createCustomerMutation, addOrderMutation };
