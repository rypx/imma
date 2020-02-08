'use strict'

const Express = require('express')
const Lib = require('./libs')

Express()
    .use(require('helmet')())

    // Controller/Router
    .use('/api/thumb', require('./api/thumbnail')(Lib))
    // -----

    .get('/', (req, res) => {
        res.end('Image Manipulation API.')
    })
    
    // Simple Handlers
    .get('*', (req, res) => res.sendStatus(403))
    .post('*', (req, res) => res.sendStatus(403))

    .listen(process.env.PORT || 3000, console.log('[ # ] Server is Online.'))