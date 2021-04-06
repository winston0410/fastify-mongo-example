import mongo from 'loaders/mongo'
import userService from 'services/UserService'
//Should you access database for test?
beforeAll(async ()=>{
    // await knex.seed.run();
})

describe('getUser', function (){
  describe('when a username is provided as an argument', function (){

    it('should return user info from database', async function (){
      const user = (await userService.getUser('hugo@gmail.com'))[0]
      expect(typeof user).toBe('object')
      expect(user.username).toBe('hugo@gmail.com')
    })
  })
})

afterAll(async () => {
  // await knex.destroy()
})
