const Recipe = require("../models/Recipe");
const Message = require("../models/Message");

exports.resolvers = {
  Query: {
   async getMessages(parent,{numberOfMessages}){
        return await Message.find().sort({createdAt:-1}).limit(numberOfMessages);
    },
    async getOneMessage(parent,{ID}){
      return await Message.findById(ID);
    },
    async recipe(_,{ID}){
          return await Recipe.findById(ID);
    },
    async getRecipes(_,{amount}){
      return await Recipe.find().sort({createdAt:-1}).limit(amount);
    }
  },
  Mutation:{
    //Message
    //How to create Message 
    async 

    //Recipe
    async createRecipe(parent,{recipeInput:{name,description}}){

      const createRecipe = new Recipe({
        name:name,
        description:description,
        createdAt:new Date().toISOString(),
        thumbsDown:0,
        thumbsUp:0
      });
      const res = await createRecipe.save();//Saving to Mongo database
      return {
        id:res.id,
        ...res._doc
      }
    },
    async deleteRecipe(_, {ID}){
      const wasDeleted = (await Recipe.deleteOne({_id:ID})).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_,{ID,editRecipeInput:{name,description}}){
      const wasEdited = (await Recipe.updateOne({_id:ID},{name:name,decription:description})).modifiedCount;
      return wasEdited;
    }
  }
};
