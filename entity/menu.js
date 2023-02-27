const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "menu",
    columns: {
        id: {
            primary: true,
            generated: "uuid"
        },
        name: {
            type: "varchar",
        },
        description: {
            type: 'varchar',
            nullable: true
        },
        price: {
            type: 'varchar'
        },
        pic: {
            type: 'text',
            nullable: true
        },
        active: {
            default: true,
            type: "bool"
        },
        userId: {
            type: 'varchar'
        }
    }
})