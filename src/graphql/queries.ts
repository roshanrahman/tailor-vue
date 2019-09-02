import gql from "graphql-tag";

export var viewCustomers = gql`
  query {
    viewCustomers {
      customers {
        id
        phoneNumber
        name
        email
        address
      }
      error {
        message
      }
    }
  }
`;

export var viewOrders = gql`
  query {
    viewOrders {
      orders {
        id
        measurement
        orderNo
        totalAmount
        customer {
          id
          name
          phoneNumber
        }
      }
    }
  }
`;
