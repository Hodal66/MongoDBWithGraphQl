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
    async createMessage(_,{messageInputFromUser:{title,date,author}}){
    const createdMessage = new Message({
      title:title,
      createdAt:new Date().toISOString(),
      author:author
    });

    const storeMessage = await createdMessage.save();

    return await {
      id:storeMessage.id,
      ...storeMessage._doc
    }
    },

    async deleteMessage(_, {ID}){
      const messageWasDeleted = ((await Message.deleteOne(ID)).deletedCount);
      return messageWasDeleted;
    },

    async updateMessage(_,{ID:ID,inputMessage:{title,createdAt,author}}){
      const updatedMessage = (await Message.updateOne({_id:ID},{title:title,author:author, createdAt:createdAt})).deletedCount;
      return updatedMessage
    },

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
