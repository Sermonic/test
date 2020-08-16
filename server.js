const express = require('express')
const app = express()
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const initializePassport = require('./passportConfig')

const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

app.use(logger('dev'))

initializePassport(passport)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/users', userRouter)
app.use('/products', productRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
