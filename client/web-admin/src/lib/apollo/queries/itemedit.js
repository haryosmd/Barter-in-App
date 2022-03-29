import { gql } from "@apollo/client";

export const ITEM_EDIT = gql`
  mutation PatchItem($token: String, $status: String, $itemId: ID) {
    patchItem(token: $token, status: $status, itemId: $itemId) {
      message
    }
  }
`;
