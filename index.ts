import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    email: String!
  }
  type Query {
    hello: String!
    randomNumber: Int!
    queryUsers: [User]!
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!): User!
  }
`;

const users = [
  {
    firstName: "GraphQL",
    lastName: "isCool",
    email: "GraphQL@isCool.com",
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    randomNumber: () => 5,
    queryUsers: () => users,
  },
  Mutation: {
    addUser: (parent: any, args: any) => {
      users.push(args);
      return args;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`server running on ${url}`);
});
