const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const config = require("./config");

// Constants
CONNECTION_URI = config.database.connectionString;
APP_PORT = process.env.PORT || 5000;

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
    return server.listen({ port: APP_PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
