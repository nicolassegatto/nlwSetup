import Fastify from "fastify";
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors /*, {
  limitar origens para consumir nossa api, similar a firewall
  origin: ['http://localhost:3000']
}*/)

app.listen({
  port: 3333,
}).then(() => {
  console.log('Servidor HTTP em execução')
})

//
app.get('/habits', async () => {
  const habits = await prisma.habit.findMany()
  return habits
})

