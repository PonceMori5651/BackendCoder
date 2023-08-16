const {Router} = require('express')


const petRouter = Router()

const pets = []

petRouter.get('/',(req, res)=>{
    res.status(200).json(pets)
})

petRouter.get('/:pId',(req, res)=>{
    const petId = parseInt(req.params.pId)
    const findpetIndex = pets.findIndex(el =>el.id ===petId)
    if(findpetIndex===-1){
        return res.status(404).json({
            "error": "pet Not Found"
        })
    }
    res.status(201).json(pets[findpetIndex])
})

petRouter.post('/',(req, res)=>{
    req.body.id = pets.length+1
    const newpet = req.body
    pets.push(newpet)
    res.status(201).json(newpet)
})

petRouter.put('/:pId',(req, res)=>{
    const petId = parseInt(req.params.pId)
    const findpetIndex = pets.findIndex(el =>el.id ===petId)
    if(findpetIndex===-1){
        return res.status(404).json({
            "error": "pet Not Found"
        })
    }
    const updpet = req.body

    pets[petId-1].name = updpet.name || pets[petId-1].name
    pets[petId-1].lastname = updpet.lastname || pets[petId-1].lastname
    pets[petId-1].age = updpet.age || pets[petId-1].age
    res.status(201).json(updpet)
})

petRouter.delete('/:pId',(req, res)=>{
    const petId = parseInt(req.params.pId)
    const findpetIndex = pets.findIndex(el =>el.id ===petId)
    if(findpetIndex===-1){
        return res.status(404).json({
            "error": "pet Not Found"
        })
    }

    pets.splice(findpetIndex,1)
    res.status(204).json({})
})

module.exports = petRouter