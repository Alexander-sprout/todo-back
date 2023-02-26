import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, JoinTable } from "typeorm"

import { Todo } from "./todo.entity"
import { User } from "./user.entity"



@Entity('category_todo')
export class CategoryTodo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'name',
        type: 'text'
    })
    name: string
    @OneToMany(() => Todo, (todo: Todo) => todo.category,
    )
    @JoinColumn({ name: 'userId' })
    todo: Todo[]

    @Column({
        name: 'userId',
        type: 'text'
    })
    @ManyToOne(() => User, (user: User) => user.category)
    @JoinColumn({ name: "userId" })
    userId: User
}
