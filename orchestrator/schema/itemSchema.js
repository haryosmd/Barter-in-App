const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const url = "https://barterin-server.herokuapp.com/users";
const redis = new Redis({
  port: 10199,
  host: "redis-10199.c98.us-east-1-4.ec2.cloud.redislabs.com",
  password: "8e7Ny2t28Zl9oYbsDXCpjwAmhFzuguxq",
});
// const {
//   GraphQLUpload,
//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require("graphql-upload");
// const { finished } = require("stream/promises");
// const FormData = require("form-data");
// const formData = new FormData();
const typeDefs = gql`
  type Item {
    id: ID
    title: String
    category: String
    description: String
    brand: String
    yearOfPurchase: String
    statusPost: String
    statusBarter: String
    userId: ID
    createdAt: String
    updatedAt: String
    Images: [Image]
    User: UserType
  }

  type Image {
    id: ID
    imageUrl: String
    tag: String
  }

  type UserType {
    id: ID
    username: String
    email: String
    role: String
    address: String
    photoUrl: String
  }

  type status {
    message: String
  }

  type RoomBarter {
    id: ID
    user1: ID
    user2: ID
    item1: ID
    Item1: Item
    item2: ID
    Item2: Item
    status1: Boolean
    status2: Boolean
  }

  type tokenGoogle {
    access_token: String
    id: ID
    username: String
    email: String
    photoUrl: String
  }

  input inputItem {
    title: String
    description: String
    brand: String
    yearOfPurchase: String
    category: String
    imageFields: [image]
  }

  input inputUser {
    email: String
    id: String
    name: String
    photoUrl: String
    givenName: String
    familyName: String
  }

  input image {
    imageUrl: String
    tag: String
  }

  input inputSearch {
    filterByTitle: String
    filterByCategory: String
  }

  type Query {
    getItems(search: inputSearch, id: ID): [Item]
    getItemsHome(id: ID): [Item]
    getItem(itemId: ID): Item
    getMyAds(access_token: String): [Item]
    getDataForBarter(access_token: String): [Item]
    getRoomBarter(access_token: String): [RoomBarter]
  }

  type Mutation {
    deleteItem(itemId: ID, access_token: String): status
    postRoomBarter(
      access_token: String
      user2: ID
      item1: ID
      item2: ID
    ): RoomBarter
    patchRoomBarter(access_token: String, roomId: ID): status
    postItem(newItem: inputItem, access_token: String): status
    loginGoogle(newUser: inputUser, newToken: String): tokenGoogle
  }
`;

const resolvers = {
  Query: {
    getItems: async (_, args) => {
      try {
        const { search, id } = args;
        const { filterByTitle, filterByCategory } = search;

        const { data } = await axios.get(
          `${url}/items?filterByTitle=${filterByTitle}&filterByCategory=${filterByCategory}&id=${id}`
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getItemsHome: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios(`${url}/items/homes?id=${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getItem: async (_, args) => {
      try {
        const { data } = await axios(`${url}/items/${args.itemId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getMyAds: async (_, args) => {
      try {
        const { data } = await axios(`${url}/myads`, {
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getRoomBarter: async (_, args) => {
      try {
        const { data } = await axios(`${url}/roomBarter`, {
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getDataForBarter: async (_, args) => {
      try {
        const { data } = await axios(`${url}/items-barters`, {
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    postItem: async (_, args) => {
      try {
        const { access_token, newItem } = args;
        const {
          title,
          description,
          category,
          yearOfPurchase,
          brand,
          imageFields,
        } = newItem;
        let { data } = await axios.post(
          `${url}/addItem`,
           { title, description, category, yearOfPurchase, brand, imageFields },
          {
            headers: {
              access_token: access_token,
            },
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    loginGoogle: async (_, args) => {
      try {
        const { newUser, newToken } = args;

        let input = {
          email: newUser.email,
          givenName: newUser.givenName,
          photoUrl: newUser.photoUrl,
          token: newToken,
        };
        const { data } = await axios.post(`${url}/googleLogin`, input);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/items/${args.itemId}`,
          method: "delete",
          headers: {
            access_token: args.access_token,
          },
        });
        await redis.del("items");
        return { status: "success" };
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to delete",
          message: error.response.data.message,
        };
      }
    },
    postRoomBarter: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/roomBarter`,
          method: "post",
          headers: {
            access_token: args.access_token,
          },
          data: { user2: args.user2, item1: args.item1, item2: args.item2 },
        });
        return data;
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to create",
          message: error.response.data.message,
        };
      }
    },
    patchRoomBarter: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/roomBarter/${args.roomId}`,
          method: "patch",
          headers: {
            access_token: args.access_token,
          },
        });
        return { status: "success" };
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to patch",
          message: error.response.data.message,
        };
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
