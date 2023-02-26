import { Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class createKey1676043204778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('todos',
            new TableColumn({
                name: 'categoryId',
                type: 'int',
                isNullable: true
            }))
        await queryRunner.createForeignKey(
            "todos",
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category_todo",
                onDelete: "SET NULL",
                name: "TodoCategoryForeignKey"

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("todos", "TodoCategoryForeignKey")
        await queryRunner.dropColumn('todos', 'categoryId')

    }

}
