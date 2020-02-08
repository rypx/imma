'use strict'

const Express = require('express')
const Lib = require('./libs')
const AuthMode = parseInt(process.env.AUTHMODE) || 0

Express()
    .use(require('helmet')())

    // Simple Auth
    .use('/api/*', (req, res, next) => {
        if ( AuthMode === 1 ) {
            let authKey = req.headers['x-auth-key']
            
            if ( authKey === process.env.AUTHKEY )
                next()
            else
                res.json({ message: 'Authentication Failed' })
            
            return
        }

        next()
    })

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