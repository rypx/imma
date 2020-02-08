'use strict'

const Express = require('express')
const Router = Express.Router()

module.exports = (lib) => {
    return Router
        .get('/', (req, res) => {
           let url = req.query.url
           res.json({ url: url || '' })
       })
}