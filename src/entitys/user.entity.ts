import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Todo } from "./todo.entity";
import { CategoryTodo } from "./сategory.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'login',
        type: 'text'
    })
    login: string

    @Column({
        name: 'password',
        type: 'text'
    })
    password: string


    @OneToMany(() => Todo, (todo: Todo) => todo.user)
    user: Todo[]


    @OneToMany(() => CategoryTodo, (category: CategoryTodo) => category.id)
    category: CategoryTodo[]



}