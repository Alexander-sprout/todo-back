import * as express from 'express'
import * as passport from 'passport'

import { appDataSource } from 'dataSource'
import { CategoryTodo } from '../entitys/сategory.entity'
import { Todo } from 'entitys/todo.entity'



const Repository = appDataSource.getRepository(CategoryTodo)
const categoryRouter = express.Router()
categoryRouter.use(passport.authenticate('jwt', { session: false }))

categoryRouter.get('/list', async (req: any, res) => {
    const data = await Repository.find({ where: { userId: req.user.id } })

    res.send({ data: data })
})


categoryRouter.post('/add', async (req: any, res) => {
    const entityManager = appDataSource.createEntityManager()
    const category = new CategoryTodo()
    category.name = req.body.text
    category.userId = req.user
    await entityManager.save(category)
    res.send({ message: 'категория добавлена' })
})


categoryRouter.delete('/:entryid', async (req, res) => {
    const entityManager = appDataSource.createEntityManager()
    entityManager.delete(Todo, { categoryId: req.params.entryid })
    await entityManager.delete(CategoryTodo, { id: req.params.entryid })

    res.send({ message: 'категория удалена' })
})

export { categoryRouter }