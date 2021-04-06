import mongo from "loaders/mongo";
import { ObjectId } from "mongodb";

const userService = {
  getUser: async function(username: string) {
    return (
      await (await mongo)[0]
        .collection("users")
        .find({
          username: username
        })
        .toArray()
    )[0];
  },
  createUser: async function(username: string, hashedPassword: string) {
    return (
      await (await mongo)[0].collection("users").insertOne({
        username,
        password: hashedPassword
      })
    ).ops[0];
  },
  deleteUser: async function(id: number) {
    return (await (await mongo)[0].collection("users").deleteOne({
      _id: id
    })).deletedCount;
  },
  updateUser: async function(id: number, username: string, password: string) {
    const result = (
      await (await mongo)[0].collection("users").findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: {
            username: username,
            password: password
          }
        }
      )
    ).value;

    return result;
  },
  updateUsername: async function(id: number, username: string) {
    // return (await knex('users')
    // .where('id', id)
    // .update())
  },
  updatePassword: async function(id: number, password: string) {
    // return (await knex('users')
    // .where('id', 'id'))
  }
};

export default userService;
