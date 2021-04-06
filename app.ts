import dotenv from 'dotenv';
dotenv.config();
import fastify, { FastifyRequest, FastifyReply, FastifyInstance, HookHandlerDoneFunction, RouteOptions } from 'fastify';

const app: FastifyInstance = fastify({
  logger: true
})

app.register(import("fastify-etag"))
app.register(import('fastify-compress'), { threshold: 1024 })
app.register(import('better-fastify-405'), {
  routes: [
    import('./routes/index'),
    import('./routes/protected')
  ]
})

export default app;
