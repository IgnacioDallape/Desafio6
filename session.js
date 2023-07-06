const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const PORT = 8080


app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true,
    store: new FileStore({path:'./session'})
}))

app.get('/sessionSet', (req,res) => {
    req.session.user = 'ignacio'
    req.session.age = 25

    res.send('sesion creada')
})

app.get('/sessionget', (req,res) => {
    res.send(req.session)
})

app.get('/sessionLogOut', (req,res) => {
    req.session.destroy(err =>{
        if(err) res.send('failed LogOut')
    })
    res.send('session destroyed')
})

app.listen(PORT, () => {
    console.log(`servidor corriendo en ${PORT}`)
})