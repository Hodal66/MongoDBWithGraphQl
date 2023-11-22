const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./mutation");
const { resolvers } = require("./resolvers");
const { connectToDb } = require("./database");

const port = 4200;

connectToDb();

const Server = new ApolloServer({
  typeDefs,
  resolvers,
});

Server.listen(port, (URL) => {
  console.log(`Server is running at http://localhost:${port}`);
});
