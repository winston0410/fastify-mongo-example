import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction }from 'fastify';
import userService from "services/UserService"
import jwt from 'loaders/jwt'

const permit = new Bearer({
    query:"access_token"
})

async function isLoggedIn(request: FastifyRequest, reply:FastifyReply, done: HookHandlerDoneFunction): Promise<void> {
  try {
    const token = permit.check(request.raw)
    if(!token){
      reply.code(401).send({ message: "Authentication required" })
    }

    const { username } = jwtSimple.decode(token,jwt.jwtSecret);

    const user = await userService.getUser(username)

    if (!user) {
      reply.code(401).send({
        message: 'Authentication invalid'
      })
    }
    //@ts-ignore
    request.user = user

    done()

  } catch (e) {
    console.log(e)
    reply.code(401).send({
      message: 'Authentication invalid'
    })
    // logger.error(e.toString());
  }
}

export { isLoggedIn };
