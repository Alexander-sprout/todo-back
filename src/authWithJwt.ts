import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
// const passport = require('passport')
import * as passport from 'passport'
import { appDataSource } from "./dataSource"
import { User } from "./entitys/user.entity"

passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'Tolkin'
    }, async (payload: any, done: (s: number, e: any) => void) => {
        try {
            const users = appDataSource.getRepository(User)
            const user = await users.findOne({ where: { login: payload.username } })
            if (user) {
                done(null, {
                    id: user.id,
                    login: user.login
                })
            }
            else {
                done(null, false)
            }
        }
        catch (e) {
            console.log(e)
        }

    })
)



