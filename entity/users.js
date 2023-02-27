const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "users",
    columns: {
        id: {
            primary: true,
            generated: "uuid"
        },
        name: {
            type: "varchar",
        },
        studentNo: {
            unique: true,
            type: 'varchar',
            nullable: true
        },
        password: {
            type: 'varchar'
        },
        pic: {
            type: 'text',
            nullable: true
        },
        verified: {
            type: "boolean",
            default: false
        },
        type: {
            type: "varchar"
        }
    }
})