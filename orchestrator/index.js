// require("dotenv").config();

// const express = require("express");
// const { graphqlUploadExpress } = require("graphql-upload");
// const { finished } = require("stream/promises");
const { ApolloServer } = require("apollo-server");
const movieSchema = require("./schema/itemSchema");
const adminSchema = require("./schema/adminSchema");

const server = new ApolloServer({
  typeDefs: [movieSchema.typeDefs, adminSchema.typeDefs],
  resolvers: [movieSchema.resolvers, adminSchema.resolvers],
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
