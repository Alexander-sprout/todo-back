import * as express from 'express'
import * as passport from 'passport'
import 'passport-jwt'

import { appDataSource } from 'dataSource'
import { Todo } from '../entitys/todo.entity'

const todoRouter = express.Router()
todoRouter.use(passport.authenticate('jwt', { session: false }))

todoRouter.post('/list', async (req: any, res) => {
    const Repository = appDataSource.getRepository(Todo)
    const data = await Repository.find(
        {
            where: {
                categoryId: req.body.selectedCategoryId
            }
        }
    )
    res.send({ data })
})

todoRouter.post('/add', async (req: any, res) => {
    const entityManager = appDataSource.createEntityManager()
    const todoTask = new Todo()
    todoTask.name = req.body.text
    todoTask.categoryId = req.body.cat_id
    todoTask.userId = req.user.id
    await entityManager.save(todoTask)
    res.send({ message: 'text is writing' })

})
todoRouter.delete('/:id/:name', async (req, res) => {
    const entityManager = appDataSource.createEntityManager()
    await entityManager.delete(Todo, { id: req.params.id, name: req.params.name })

    res.send({ message: 'запись удалена' })
})

export { todoRouter }




