import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { routes } from "./routes/routes";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pokemon Crud Battle API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(fastifyCors, { origin: '*' })

app.register(routes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running...')
})