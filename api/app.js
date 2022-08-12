const express = require('express');
const {
  graphqlHTTP
} = require('express-graphql');

const cityData = require('./data/city.json')
const {
  buildSchema
} = require('graphql');
const app = express();
const axios = require('axios');


const schema = buildSchema(`
  type Info{
    id:Int,
    name: String,
    code: String
  }
  type Query {
    city:City
  }
  type City{
    name:String,
    all: [Info]
  }
`);

const rootValue = {
  city() {
    return {
      all: cityData
    }
  }
}
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true,
}));



app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));