const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const url = "https://barterin-server.herokuapp.com/admins";
const redis = new Redis({
  port: 10199,
  host: "redis-10199.c98.us-east-1-4.ec2.cloud.redislabs.com",
  password: "8e7Ny2t28Zl9oYbsDXCpjwAmhFzuguxq",
});
// deploy
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
    User: UserType
    Images: [Image]
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

  input inputRegister {
    username: String
    email: String
    password: String
    address: String
    photoUrl: String
  }

  type status {
    message: String
  }

  type token {
    access_token: String
  }

  type Query {
    getItemsAdmin(token: String): [Item]
  }

  type Mutation {
    login(email: String, password: String): token
    register(newUser: inputRegister, token: String): UserType
    patchItem(token: String, itemId: ID, status: String): status
  }
`;
const resolvers = {
  Query: {
    getItemsAdmin: async (_, args) => {
      try {
        const { token } = args;
        const cache = await redis.get("adminItems");
        if (cache) {
          return JSON.parse(cache);
        }

        const { data } = await axios.get(`${url}/items`, {
          headers: {
            access_token: token,
          },
        });
        await redis.set("adminItems", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    patchItem: async (_, args) => {
      try {
        const { token, itemId, status } = args;
        const { data } = await axios.patch(
          `${url}/items/${itemId}`,
          { status },
          {
            headers: {
              access_token: token,
            },
          }
        );
        await redis.del("adminItems");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      try {
        const { email, password } = args;
        const { data } = await axios.post(`${url}/login`, { email, password });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    register: async (_, args) => {
      try {
        const { newUser, token } = args;
        const { username, email, password, address, photoUrl } = newUser;
        const { data } = await axios.post(
          `${url}/register`,
          {
            username,
            email,
            password,
            address,
            photoUrl,
          },
          {
            headers: {
              access_token: token,
            },
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
