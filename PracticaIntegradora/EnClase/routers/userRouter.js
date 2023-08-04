const {Router} = require('express')


const userRouter = Router()

const users = [
    {
        id: 1,
        name: "Aaron",
        lastname: "Ponce",
        age: 22
    },
    {
        id: 2,
        name: "Leonel",
        lastname: "Fernandez",
        age: 12
    },
    {
        id: 3,
        name: "Danna",
        lastname: "Fernandez",
        age: 9
    }
]

userRouter.get('/users',(req, res)=>{
    res.status(200).json(users)
})

userRouter.get('/users/:uId',(req, res)=>{
    const userId = parseInt(req.params.uId)
    const findUserIndex = users.findIndex(el =>el.id ===userId)
    if(findUserIndex===-1){
        return res.status(404).json({
            "error": "User Not Found"
        })
    }
    res.status(201).json(users[findUserIndex])
})

userRouter.post('/users',(req, res)=>{
    req.body.id = users.length+1
    const newUser = req.body
    users.push(newUser)
    res.status(201).json(newUser)
})

userRouter.put('/users/:uId',(req, res)=>{
    const userId = parseInt(req.params.uId)
    const findUserIndex = users.findIndex(el =>el.id ===userId)
    if(findUserIndex===-1){
        return res.status(404).json({
            "error": "User Not Found"
        })
    }
    const updUser = req.body

    users[userId-1].name = updUser.name || users[userId-1].name
    users[userId-1].lastname = updUser.lastname || users[userId-1].lastname
    users[userId-1].age = updUser.age || users[userId-1].age
    res.status(201).json(updUser)
})

userRouter.delete('/users/:uId',(req, res)=>{
    const userId = parseInt(req.params.uId)
    const findUserIndex = users.findIndex(el =>el.id ===userId)
    if(findUserIndex===-1){
        return res.status(404).json({
            "error": "User Not Found"
        })
    }

    users.splice(findUserIndex,1)
    res.status(204).json({})
})

module.exports = userRouter