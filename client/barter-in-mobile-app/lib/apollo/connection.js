import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://barterin-orchestartor.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
