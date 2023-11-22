const { gql } = require("apollo-server");
exports.typeDefs = gql`
  type Message {
    id: String
    title: String
    createdAt: String
    author: String
  }
  input MessageInput {
    id: String
    title: String
    createdAt: String
    author: String
  }
  input UpdateMessage {
    title: String
    createdAt: String
    author: String
  }

  type Recipe {
    name: String
    description: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input RecipeInput {
    name: String
    description: String
  }
  input EditRecipeInput {
    name: String
  }

  type User {
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String
    sex: String
    ages: Int
    createdAt:String
  }

  input UserInput{
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String
    sex: String
    ages: Int
  }
  input UpdateUserInput{
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String
    sex: String
    ages: Int
  }

  type Query {
    recipe(ID: ID!): Recipe
    getRecipes(amount: Int): [Recipe]
    getOneMessage(ID: ID!): Message!
    getMessages(numberOfMessages: Int): [Message]
    getAllUsers(numberOfUsers: Int): [User!]!
    getOneUser(ID:ID):User!
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, editRecipeInput: EditRecipeInput): Boolean
    createMessage(messageInputFromUser: MessageInput): Message!
    deleteMessage(ID: ID!): Boolean
    updateMessage(ID: ID, inputMessage: UpdateMessage): Message!
    createNewUser(userInput:UserInput):User!
    deleteUser(ID:ID):Boolean!
    updateUser(ID:ID, UserInput:UpdateUserInput):Boolean!
  }
`;
