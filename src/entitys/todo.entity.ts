import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"

import { CategoryTodo } from "./сategory.entity"
import { User } from "./user.entity"

@Entity('todos')

export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'name',
        type: 'text'
    })

    name: string

    @Column({
        name: 'userId',
        type: 'int'
    })
    userId: number

    @Column({
        name: 'categoryId',
        type: 'int'
    })
    categoryId: number

    @Column({
        name: 'createdDate',
        type: 'timestamp'
    })
    createdDate: Date

    @ManyToOne(() => CategoryTodo, (category: CategoryTodo) => category.todo
        // , { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: "categoryId" })
    category: CategoryTodo



    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: "userId" })
    user: User


}
