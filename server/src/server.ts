import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./routes";

const app = Fastify()

app.listen({
  port: 3333,
}).then(() => {
  console.log('Servidor HTTP em execução')
})

/*
  limitar origens para consumir nossa api, similar a firewall
  (cors, {origin: ['http://localhost:3000']})
*/
app.register(cors)
app.register(appRoutes)