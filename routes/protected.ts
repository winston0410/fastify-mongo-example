import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  isLoggedIn
} from 'guards'
import userController from 'controllers/UserController'

async function routes (fastify: FastifyInstance, options : FastifyPluginOptions) {
  fastify.decorateRequest('user', {})

  fastify.addHook('preHandler', isLoggedIn)

  fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.compress({ protected: 'this is the protected content' })
  })

  fastify.delete('/users/:id', userController.deleteUser)
  fastify.put('/users/:id', userController.updateUser)
}

export default routes
