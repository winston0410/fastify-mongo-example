import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, Db } from 'mongodb';

// const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@0.0.0.0:27017`;
const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongo:27017`;
const dbName = 'fastify';

const mongo = new MongoClient(url,  { useUnifiedTopology: true })

const db = new Promise<[Db, MongoClient]>((resolve, reject) => {
  mongo.connect(function(err) {
    if(err){
      return reject(err)
    }
    resolve([mongo.db(dbName), mongo])
  });
})

export default db
