import * as express from 'express'
import * as bodyParser from 'body-parser'
import "./authWithJwt"

import { todoRouter } from './controllers/todo.controller'
import { categoryRouter } from './controllers/category.controller'
import { userRouter } from './controllers/user.controller'

const app = express()
const HOST = 'localhost'
const PORT = 3000

app.use(bodyParser.json())



app.use('/api/todo', todoRouter)
app.use('/api/category', categoryRouter)
app.use('/api/user', userRouter)




app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен : http://${HOST}:${PORT}`);
});