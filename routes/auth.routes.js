const express = require('express')
const { Router } = express

const router = new Router()



let users = []
let userLogin 

router.post('/register', (req, res) => {
    let userNew = req.body
    userNew.id = Math.random()
    users.push(userNew)
    res.redirect('/view/login-view')
})

router.post('/login', (req, res) => {
    userLogin = req.body;
    let finding = users.find(e => {
        return e.username == userLogin.username && e.password == userLogin.password;
    });

    if (finding) {
        try {
            req.session.username = finding.username;
            req.session.password = finding.password;
            userLogin.id = Math.random();
            users.push(userLogin);
            res.redirect('/view/profile-view');
        } catch (err) {
            console.log(err)
            res.send(err)
            console.log(users)
        }
        return userLogin
    } else {

        console.log('No existe usuario con ese nombre de usuario o contraseña', 222);
        res.send('usuario no registrado')
        return false;
    }
});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.log(err)
                res.status(500).send('fallo en salir de la session')
                return false
            }
            res.redirect('/view/login-view')
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }

})

router.get('/users', (req, res) => {
    res.send(users)
})

module.exports = {
    users: users,
    router: router,
    userLogin: userLogin
};