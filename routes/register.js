const express = require('express');
const dataSource = require('../dataSource/dataSource')
const usersRepository = dataSource.getRepository('users')


const router = express.Router()

router.post('/', async (req,res) => {
    try {
            await usersRepository.save(req.body)
                                function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    await sleep(2000)
    res.send(true)
    } catch {
        res.send(false)
    }

})

module.exports = router