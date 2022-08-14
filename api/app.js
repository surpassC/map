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
    city:City,
    info(str:String!):[Info]
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
  },
  info ({str}){
    let result = cityData.filter((item) => {
      return item.name.indexOf(str) != -1 ? item.name : ''
    })
    return result
  }
}
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true,
}));



app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));