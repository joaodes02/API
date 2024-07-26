import express from 'express'
const app = express()




app.get('/usuarios', (req, res) =>{
    res.send('Ok, aqui foi!!')
} )



app.listen(3000)