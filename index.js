const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const Mongostore =  require('connect-mongo')
const handlebars = require('express-handlebars')
const PORT = 8080
const ViewRoutes = require('./routes/view.routes')
const Auth = require('./routes/auth.routes')
const AuthRoutes = Auth.router

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))





app.use(session({
    store: Mongostore.create({
        mongoUrl: 'mongodb+srv://nachodallape2:nachodallape2@nachodallape.devstyj.mongodb.net/nachodallape' 
    }),
    secret:'secret',
    resave: true,
    saveUninitialized: true,
}))

app.get('/sessionSet', (req,res) => {
    req.session.user = 'ignacio'
    req.session.age = 25
    res.send('sesion creada')
})

app.get('/sessionGet', (req,res) => {
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
//routes

app.use('/view', ViewRoutes)
app.use('/auth', AuthRoutes)