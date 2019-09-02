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
  mutation(
    $measurement: String
    $totalAmount: Float
    $type: String
    $customerId: String
  ) {
    addOrder(
      measurement: $measurement
      totalAmount: $totalAmount
      type: $type
      customerId: $customerId
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

let updateOrderMutation = gql`
  mutation(
    $measurement: String
    $totalAmount: Float
    $type: String
    $orderId: String
  ) {
    updateOrder(
      orderId: $orderId
      totalAmount: $totalAmount
      type: $type
      measurement: $measurement
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

let deleteOrderMutation = gql`
  mutation($orderId: String) {
    deleteOrder(orderId: $orderId) {
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

export {
  createCustomerMutation,
  addOrderMutation,
  updateOrderMutation,
  deleteOrderMutation
};
