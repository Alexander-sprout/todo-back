import * as express from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { appDataSource } from 'dataSource'
import { User } from '../entitys/user.entity'

const generateToken = (username: string, userId: number) => {
    const payload = { username, userId };
    const secret = 'Tolkin'
    const options = { expiresIn: '10000d' };
    return jwt.sign(payload, secret, options);
}

const userRouter = express.Router()
const Repository = appDataSource.getRepository(User)



userRouter.post('/register', async (req, res) => {
    const entityManager = appDataSource.createEntityManager()
    const userIsExist = await Repository.findOne({ where: { login: req.body.login } })
    if (userIsExist) {
        res.send({ message: 'такой пользователь уже существует' })
        console.log(userIsExist)
    }
    else {
        const user = new User()
        user.login = req.body.login
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        user.password = hashedPassword
        await entityManager.save(user)
        res.send({ message: 'пользователь добавлен' })
    }
})

userRouter.post('/auth', async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await Repository.findOne({
            where: {
                login: login
            }
        })
        if (!user) {
            return res.json({ message: 'login  error', code: 2 })
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.json({ message: 'Password error', code: 2 })
        }
        const token = generateToken(user.login, user.id);
        return res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Login error' })
    }
})




export { userRouter }
