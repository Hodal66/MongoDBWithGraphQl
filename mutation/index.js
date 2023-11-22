const { gql } = require("apollo-server");
exports.typeDefs = gql`
  type Query {
    getOneMessage(ID:ID!):Message!
    getMessages(numberOfMessages:Int): [Message]
  }
  type Message {
    id: String
    title: String
    createdAt: String
    author:String
  }
  input MessageInput {
    id: String
    title: String
    createdAt: String
    author:String
  }
  input UpdateMessage{
    title: String
    createdAt: String
    author:String
  }

  type Recipe{
    name:String
    description:String
    thumbsUp:Int
    thumbsDown:Int
  }

  input RecipeInput{
    name:String
    description:String
  }
  input EditRecipeInput{
    name:String
  }
  type Query{
    recipe(ID:ID!):Recipe
    getRecipes(amount:Int):[Recipe]
  }

  type Mutation{
    createRecipe(recipeInput:RecipeInput):Recipe!
    deleteRecipe(ID:ID!):Boolean
    editRecipe(ID:ID!, editRecipeInput:EditRecipeInput):Boolean

    createMessage(messageInputFromUser:MessageInput):Message!
    deleteMessage(ID:ID!):Boolean
    updateMessage(ID:ID, inputMessage:UpdateMessage):Message!
    
  }
`;
