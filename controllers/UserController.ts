import { FastifyRequest, FastifyReply }from 'fastify';
import userService from 'services/UserService'
import jwtSimple from 'jwt-simple'
import jwt from 'loaders/jwt'
import { hashPassword, checkPassword } from 'hash'
import { UserWithId as User } from 'modals/Users'

type RequestWithCredential = FastifyRequest<{
  Body: {
    username: string,
    password: string
  }
}>

const login = async (request: RequestWithCredential, reply: FastifyReply) => {

  if(!request.body?.username || !request.body?.password){
    reply.code(400).send({
      message: "Missing username or password"
    })
    return
  }

  const { username, password } = request.body

  const user: User = await userService.getUser(username);

  if(!user || !(await checkPassword(password,user.password))){
      reply.code(401).send({message:"Wrong username or password"});
      return;
  }
  const payload = {
      id: user._id,
      username: user.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply.send({
      token: token
  });
}

const register = async (request: RequestWithCredential, reply: FastifyReply) => {
  if(!request.body?.username || !request.body?.password){
    reply.code(400).send({
      message: "Missing username or password"
    })
    return
  }

  const { username, password } = request.body

  const existingUser = await userService.getUser(username);

  if(existingUser){
    reply.code(409).send({
      message: 'Username has been used.'
    })
    return
  }

  const user = (await userService.createUser(username, await hashPassword(password)))

  const payload = {
      id: user._id,
      username: user.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply
  .code(201)
  .header('Location', 'location of that resource')
  .send({
    username,
    token
  })
}

const deleteUser = async(request, reply: FastifyReply) => {

  console.log('check values', request.params.id, request.user._id, typeof request.params.id, typeof request.user._id)

  const deletedCount = await userService.deleteUser(request.user._id)
  if(deletedCount === 0){
    reply.code(404)
  } else {
    reply.code(204)
  }
}

const updateUser = async(request, reply: FastifyReply) => {
  if(!request.body?.username || !request.body?.password){
    reply.code(400).send({
      message: "Missing username or password"
    })
    return
  }

  const { username, password } = request.body

  const updatedUser = await userService.updateUser(request.user._id, username, await hashPassword(password))

  const payload = {
      id: updatedUser._id,
      username: updatedUser.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply
  .code(200)
  .send({
    username: updatedUser.username,
    token: token
  })
}

const userController = {
  login,
  register,
  deleteUser,
  updateUser
}

export default userController
