const typeorm = require("typeorm")

var dataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Samguillen1!",
    database: "canteen", 
    synchronize: true,
    entities: ['entity/*.js']
})

module.exports = dataSource