import db from 'loaders/mongo'
import { Db } from 'mongodb'
import User from 'modals/Users'

async function cleanUp(instance: Db){
  (await instance.listCollections().toArray()).forEach(({ name }) => {
    instance.dropCollection(name)
  })
}

async function seedData(instance: Db){
  const collection = await instance.createCollection<User>('users')
  collection.insertMany([
    {
        username:"hugo@gmail.com",
        password:"$2y$10$BB4OxvICMGud1.YmGZ8QD.PnMJVNossEIJaL08owXI622t3nu73dq"
    }
  ])
  console.log('Seeded data:\n', await collection.find({}).toArray())
}

db.then(async res => {
  const [instance, mongo] = res
  await cleanUp(instance)
  await seedData(instance)
  setImmediate(() => mongo.close())
}).catch(e => {
  console.log(e)
})
