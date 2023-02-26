import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class createKeyLogin1676059094942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('todos',
            new TableColumn({
                name: 'userId',
                type: 'int',
                isNullable: true
            }))
        await queryRunner.createForeignKey(
            'todos',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                name: 'TodoUserForeignKey'
            })
        )
        await queryRunner.addColumn('category_todo',
            new TableColumn({
                name: 'userId',
                type: 'int',
                isNullable: true
            }))
        await queryRunner.createForeignKey(
            'category_todo',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                name: 'CategoryUserForeignKey'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('todos', 'TodoUserForeignKey')
        await queryRunner.dropColumn('todos', 'userid')
        await queryRunner.dropForeignKey('category_todo', 'CategoryUserForeignKey')
        await queryRunner.dropColumn('category_todo', 'userId')
    }

}
