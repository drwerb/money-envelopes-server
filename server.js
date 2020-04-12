const express = require('express')
const envelopeRouter = require('./routes/envelope.js')
const envelopeHistoryRouter = require('./routes/envelope-history.js')
const app = express()
const port = 3000
const Context = require('./context')

// app.get('/', (req, res) => res.send('Hello World!'))

// app.on('mount', function (parent) {
//   console.log('App Mounted')

// })

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.locals.context = new Context({
  dbPath: './dev.db'
})

app.locals.context.initialize();

app.use('/api/envelope', envelopeRouter)
app.use('/api/envelopeHistory', envelopeHistoryRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))