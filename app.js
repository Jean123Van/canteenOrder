const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const registerRoute = require('./routes/register')
const cors = require('cors')
const dataSource = require('./dataSource/dataSource')
const { In } = require("typeorm")
const menu = require("./entity/menu")
const orders = require("./entity/orders")
const usersRepository = dataSource.getRepository('users')
const menuRepository = dataSource.getRepository('menu')
const ordersRepository = dataSource.getRepository('orders')


app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
dataSource.initialize()


app.use('/register', registerRoute)

app.post('/login', async (req,res) => {
    const result = await usersRepository.findOne({
        where:[
            {
                name: req.body.name, 
                password:req.body.password,
                type: In(['Store', 'Admin']),
                verified: true

            },
            {
                studentNo: req.body.name, 
                password:req.body.password,
                type: "Student",
                verified: true
            }
        ]
    })

    res.send(result)
})

app.post('/applications', async (req, res) => {
    const result = await usersRepository.find({select: ['name', 'studentNo', 'pic', 'id'],where:{type: req.body.type, verified: false}})
    res.send(result)
})

app.post('/applications/reject', async (req, res) => {
    usersRepository.delete({id:req.body.id})
    res.send(true)
})

app.post('/applications/approve', async (req, res) => {
    usersRepository.update({id:req.body.id}, {verified: true})
    res.send(true)
})

app.post('/menu/submit', async (req, res) => {
   await menuRepository.save(req.body)

                       function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    await sleep(2000)

   res.send(true)
})

app.post('/menu/get/all', async (req, res) => {
    const result = await menuRepository.find({where:{userId: req.body.userId, active: true}, take:10, skip: (req.body.page-1)*10})
    res.send(result)
})


app.post('/order/submit', async (req, res) => {
    const result = await ordersRepository.save(req.body)
                    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    await sleep(2000)
    res.send(true)
})

app.post('/order/getall', async (req, res) => {
    const userId = req.body.userId
    const result = await ordersRepository.query(
        `SELECT orders."id", menu."name", menu."description", menu."price", orders."quantity", orders."status", menu."pic" FROM orders INNER JOIN menu ON "productId" = cast(menu."id" as varchar(255)) WHERE orders."buyerId" = '${userId}' ORDER BY "createdAt" DESC LIMIT 10 OFFSET ${(req.body.page-1)*10}`)
        


    res.send(result)
})

app.post('/order/get', async (req, res) => {
   const result = await ordersRepository.query(
    `SELECT orders."id", orders."status", "quantity", users."name" as studentName, users."studentNo", menu."name", menu."pic" FROM orders INNER JOIN menu ON orders."productId" = cast(menu."id" as varchar(255)) INNER JOIN users ON cast(users."id" as varchar(255)) = orders."buyerId" WHERE "userId" = '${req.body.userId}' ORDER BY "createdAt" DESC LIMIT 10 OFFSET ${(req.body.page-1)*10}`)
    
                        function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    await sleep(2000)
    
    res.send(result)
})

app.post('/order/action', async (req, res) => {
    if(req.body.action == "Accept"){
        await ordersRepository.update({id: req.body.id}, {status: "Cooking"})
    }

    if(req.body.action == "Deny"){
        await ordersRepository.update({id: req.body.id}, {status: "Denied"})
    }

    if(req.body.action == "Pick Up") {
        await ordersRepository.update({id: req.body.id}, {status: "Pick up from Store"})
    }

        if(req.body.action == "Completed") {
        await ordersRepository.update({id: req.body.id}, {status: "Completed"})
    }

    res.send(true)
    
})

app.post('/menu/remove', async (req, res) => {   
    await menuRepository.update({id: req.body.id}, {active: false})


    res.send(true)
})

app.post('/menu/get/one', async (req, res) => {
    const result = await menuRepository.findOne({where:{id:req.body.id}})
    res.send(result)
})

app.post('/menu/edit/one', async (req, res) => {
    const result = await menuRepository.update({id:req.body.id}, req.body.body)
    res.send(result)
})


app.listen(3000)