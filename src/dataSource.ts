import { DataSource } from "typeorm"

import { User } from "./entitys/user.entity"
import { Todo } from "./entitys/todo.entity"
import { CategoryTodo } from "./entitys/сategory.entity"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "todos",
    entities: [Todo, CategoryTodo, User],
    migrations: ['./dist/migrations/*{.ts,.js}'],
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

