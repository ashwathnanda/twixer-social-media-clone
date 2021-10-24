const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const config = require("./config");

// Constants
CONNECTION_URI = config.database.connectionString;

//PubSub Class Instantiate
const pubSub = new PubSub();

// GraphQL Server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

// DB Connection + Server start
mongoose
  .connect(CONNECTION_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully.");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
