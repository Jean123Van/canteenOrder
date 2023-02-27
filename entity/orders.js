const { EntitySchema, TreeRepositoryUtils } = require("typeorm");

module.exports = new EntitySchema({
    name: "orders",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
        },
        productId: {
            type: "varchar",
        },
        buyerId: {
            type: 'varchar'
        },
        quantity: {
            type: 'int'
        },
        status: {
            type: 'varchar',
            default: 'Pending'
        },
        createdAt: {
            createDate: true
        }
    }
})