import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./config/db";
import { UserResolver } from "./resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolvers";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "no token";
      return token;
    },
  });

  await dataSource.initialize();

  console.log(`🚀  Server ready at: ${url}`);
};

main();
