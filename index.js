const {ApolloServer,gql} = require("apollo-server");
const {Mongoose} = require("mongoose")

const port = 4200;
const MONGODB = "mongodb+srv://mhthodol:Mhthodol2023@mongodbwithgraphqlclust.syaipjm.mongodb.net/"
const typeDefs = gql` 
type Query{
    hello:String
}`

const resolvers ={
     Query:{
        hello:()=>{
            return console.log("Byakunze ndikubibona")
        }
     }
}

const Server = new ApolloServer({
    typeDefs,
    resolvers
});

Server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
console.log();


console.log("Murakoze cyane kuko ndabona byatunganye")