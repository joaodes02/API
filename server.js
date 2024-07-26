import express from 'express'

const app = express()

app.use(express.json())

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// Cadastrar Users
app.post('/usuarios', async (req, res)  =>{

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)

})


// Listar Users 
app.get('/usuarios', async (req, res) =>{

    let users = []

    if(req.query){ 
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    }else{
        await prisma.user.findMany();
    }

    res.status(200).json(users)

});

// Editar Users
app.put('/usuarios/:id', async (req, res)  =>{

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res)=> {

    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(201).json({message: 'Usuario deletado com sucesso!'})
    

})




app.listen(3000)