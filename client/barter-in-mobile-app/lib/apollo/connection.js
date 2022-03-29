import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://orchestrator-barterin.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
