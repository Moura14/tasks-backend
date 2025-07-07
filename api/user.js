const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHas = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, has) => callback(has))
        })
    }

    const save = (req, res) => {
        obterHas(req.body.password, hash => {
                const password = hash

                app.db('users').insert({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password  
                }).then(_ => res.status(204).send()).catch(err => res.status(400).json(err))
        })
    }

    return {save}
}