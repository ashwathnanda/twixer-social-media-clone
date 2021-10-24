const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const config = require("./config");

// Constants
CONNECTION_URI = config.database.connectionString;

// GraphQL Server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
