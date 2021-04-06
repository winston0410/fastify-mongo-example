import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions }from 'fastify';
import userController from 'controllers/UserController'

async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.compress({ hello: 'world2' })
  })

  fastify.post('/login', userController.login)

  fastify.post('/register', userController.register)
}

export default routes
