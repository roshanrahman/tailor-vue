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
