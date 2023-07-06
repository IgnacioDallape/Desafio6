const express = require('express')
const { Router } = express
const authRouter = require('./auth.routes');
const users = authRouter.users;
const userLogin = authRouter.userLogin


const router = new Router()

//middleware para que no pueda entrar a profile si no esta con sesion activa
function authSession(req, res, next) {
    let body = req.body
    console.log(body, 'body')
    let finding = users.find(e => {
        return e.username == body.username && e.password == body.password
    })
    if (!finding) {
        console.log(finding)
        res.redirect('/view/login-view')
        return false
    }
    next()
}

router.get('/login-view', (req, res) => {
    res.render('login', {})
})

router.get('/profile-view',  (req, res) => {
    res.render('profile', {});
});

router.get('/register-view', (req, res) => {
    res.render('register', {})
})

module.exports = router