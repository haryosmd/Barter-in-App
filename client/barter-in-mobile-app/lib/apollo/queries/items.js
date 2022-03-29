import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query GetItems($search: inputSearch, $getItemsId: ID) {
    getItems(search: $search, id: $getItemsId) {
      id
      title
      category
      brand
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

// export const GET_ITEMS_HOME = gql`
//   query GetItemsHome {
//     getItemsHome {
//       id
//       title
//       category
//       yearOfPurchase
//       Images {
//         id
//         imageUrl
//       }
//     }
//   }
// `;

export const GET_ITEMS_HOME = gql`
  query GetItemsHome($getItemsHomeId: ID) {
    getItemsHome(id: $getItemsHomeId) {
      id
      title
      category
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($itemId: ID) {
    getItem(itemId: $itemId) {
      id
      title
      category
      description
      brand
      yearOfPurchase
      Images {
        id
        imageUrl
      }
      User {
        id
        username
        email
        photoUrl
      }
    }
  }
`;

export const GET_MY_ADS = gql`
  query GetMyAds($accessToken: String) {
    getMyAds(access_token: $accessToken) {
      id
      title
      category
      brand
      statusPost
      statusBarter
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_DATA_FOR_BARTER = gql`
  query GetDataForBarter($accessToken: String) {
    getDataForBarter(access_token: $accessToken) {
      id
      title
      category
      brand
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

// export const GET_ROOM_BARTER = gql`
//   query GetRoomBarter($accessToken: String) {
//     getRoomBarter(access_token: $accessToken) {
//       id
//       user1
//       user2
//       item1
//       item2
//     }
//   }
// `;
export const GET_ROOM_BARTER = gql`
  query GetRoomBarter($accessToken: String) {
    getRoomBarter(access_token: $accessToken) {
      id
      item1
      item2
      Item1 {
        id
        title
        category
        brand
        yearOfPurchase
        Images {
          id
          imageUrl
        }
      }
      Item2 {
        id
        title
        category
        brand
        yearOfPurchase
        Images {
          id
          imageUrl
        }
      }
      user1
      user2
      status1
      status2
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID, $accessToken: String) {
    deleteItem(itemId: $itemId, access_token: $accessToken) {
      message
    }
  }
`;

export const POST_ROOM_BARTER = gql`
  mutation PostRoomBarter(
    $accessToken: String
    $user2: ID
    $item1: ID
    $item2: ID
  ) {
    postRoomBarter(
      access_token: $accessToken
      user2: $user2
      item1: $item1
      item2: $item2
    ) {
      id
      user1
      user2
      item1
      item2
    }
  }
`;

export const POST_ITEM = gql`
  mutation PostItem($newItem: inputItem, $accessToken: String) {
    postItem(newItem: $newItem, access_token: $accessToken) {
      message
    }
  }
`;

export const PATCH_ROOM_BARTER = gql`
  mutation PatchRoomBarter($accessToken: String, $roomId: ID) {
    patchRoomBarter(access_token: $accessToken, roomId: $roomId) {
      message
    }
  }
`;

export const POST_GOOGLE_LOGIN = gql`
  mutation LoginGoogle($newUser: inputUser, $newToken: String) {
    loginGoogle(newUser: $newUser, newToken: $newToken ) {
      id
      access_token
      username
      email
      photoUrl
    }
  }`
