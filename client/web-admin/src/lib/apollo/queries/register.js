import { gql } from "@apollo/client";

export const REGISTER2 = gql`
  mutation Register($newUser: inputRegister, $token: String) {
    register(newUser: $newUser, token: $token) {
      id
    }
  }
`;
