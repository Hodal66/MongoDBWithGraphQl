const Recipe = require("../models/Recipe");
const Message = require("../models/Message");
const UserRegister = require("../models/UserRegister");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ApolloError } = require("apollo-server-errors");
const Post = require("../models/Post");

exports.resolvers = {
  Query: {
    //Query on Message
    async getMessages(parent, { numberOfMessages }) {
      return await Message.find()
        .sort({ createdAt: -1 })
        .limit(numberOfMessages);
    },
    async getOneMessage(parent, { ID }) {
      return await Message.findById(ID);
    },
    //Query in Recipe
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
    //Query on Users
    //Registered User

    async getAllUsers(_, { args }) {
      const result = await UserRegister.find({

      });
      return result;
    },
    async getOneUser(_,{ID}) {
      const oneUser= await UserRegister.findById(ID);
      return oneUser;
    },
    //posts
    async getAllPosts() {
      const posts = await Post.find({});
      return posts;
    },
    //Get one post
    async getOnePost(_,{ID}){
      const myPost = await Post.findById(ID);
      return myPost;
    }
  },
  Mutation: {
    //Message
    //How to create Message
    async createMessage(_, { messageInputFromUser: { title, author } }) {
      const createdMessage = new Message({
        title: title,
        createdAt: new Date().toISOString(),
        author: author,
      });

      const storeMessage = await createdMessage.save();

      return await {
        id: storeMessage.id,
        ...storeMessage._doc,
      };
    },

    async deleteMessage(_, { ID }) {
      const messageWasDeleted = (await Message.deleteOne(ID)).deletedCount;
      return messageWasDeleted;
    },

    async updateMessage(
      _,
      { ID: ID, inputMessage: { title, createdAt, author } }
    ) {
      const updatedMessage = (
        await Message.updateOne(
          { _id: ID },
          { title: title, author: author, createdAt: createdAt }
        )
      ).deletedCount;
      return updatedMessage;
    },

    //Recipe
    async createRecipe(parent, { recipeInput: { name, description } }) {
      const createRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsDown: 0,
        thumbsUp: 0,
      });
      const res = await createRecipe.save(); //Saving to Mongo database
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { ID, editRecipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, decription: description }
        )
      ).modifiedCount;
      return wasEdited;
    },
    //create User
    //Register user into the database
    async createNewUser(
      _,
      { userInput: { fullName, email, password, confirmPassword, sex, ages } }
    ) {
      //check if user is already exist in the database

      const checkUser = await UserRegister.findOne({ email });

      if (checkUser) {
        throw new ApolloError(
          "Uaer is Already Exist in the database : " + email,
          "USER_ALREADY_EXIST"
        );
      }
      //Create hashed pasword
      if (password !== confirmPassword) {
        throw new ApolloError(
          "User confirmation Password Doesn't Much Please Verify well"
        );
      }
      let hashedPassword = await bcrypt.hash(password, 10);
      let hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

      // create Token
      let newTocken = jwt.sign(
        {
          user_id: UserRegister._id,
          email,
        },
        "UNSAFE_STRING",
        { expiresIn: "2h" }
      );

      const newCreatedUser = new UserRegister({
        fullName: fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        sex: sex,
        ages: ages,
        createdAt: new Date().toISOString(),
        token: newTocken,
      });

      const savedRegisteredUser = await newCreatedUser.save();
      console.log("This is the database :", savedRegisteredUser);

      return {
        id: savedRegisteredUser.id,
        ...savedRegisteredUser._doc,
      };
    },

    async deleteUser(_, { ID }) {
      const isUserDeleted = (await UserRegister.deleteOne({ _id: ID }))
        .deletedCount;
      return isUserDeleted;
    },

    async updateUser(
      _,
      {
        ID: ID,
        UserInput: { fullName, email, password, confirmPassword, sex, ages },
      }
    ) {
      const isUserUpdated = (
        await UserRegister.updateOne(
          { _id: ID },
          {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            sex: sex,
            ages: ages,
          }
        )
      ).modifiedCount;
      return isUserUpdated;
    },
    async userLogin(_, { userInput: { email, password } }) {
      //check if user is already exist in the database
      const checkIfUserExist = await UserRegister.findOne({ email });
      console.log(checkIfUserExist);
      console.log("Entered Password is:", password);
      if (
        checkIfUserExist &&
        (await bcrypt.compare(password, checkIfUserExist.password))
      ) {
        // create new token
        let newTocken = jwt.sign(
          {
            user_id: checkIfUserExist._id,
            email,
          },
          "UNSAFE_STRING",
          { expiresIn: "2h" }
        );

        checkIfUserExist.token = newTocken;

        return {
          id: checkIfUserExist.id,
          ...checkIfUserExist._doc,
        };
      } else {
        return new ApolloError(
          "Wrong Username or Password!!",
          "INNCORRECT_PASSWORD"
        );
      }
    },
    async createPost(_, { inputPost }) {
      const { title, content, author, createdAt } = inputPost;
      const newPost = new Post({
        title:title,
        content:content,
        createdAt:createdAt,
        author:author
      })

      const createdPost = await newPost.save();

      return {
        id:createdPost._id,
      ...createdPost._doc}
    },
  },
};
