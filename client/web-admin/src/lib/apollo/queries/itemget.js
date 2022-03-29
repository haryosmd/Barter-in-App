import { gql } from "@apollo/client";

export const ITEM_GET = gql`
  query GetItemsAdmin($token: String) {
    getItemsAdmin(token: $token) {
      id
      title
      category
      brand
      yearOfPurchase
      description
      statusPost
      statusBarter
      Images {
        id
        imageUrl
      }
      User {
        id
        username
        email
      }
    }
  }
`;
