const passport = require('passport')
const bcrypt = require('bcrypt')
const { pool } = require('../dbConfig')

exports.renderLogin = (req, res) => {
  res.render('login')
}

exports.renderRegister = (req, res) => {
  res.render('register')
}

exports.auth = passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/users/login',
  failureFlash: true,
})

exports.logout = (req, res) => {
  req.logOut()
  req.flash('success_msg', 'You have logged out')
  res.redirect('/users/login')
}

exports.createUser = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body

  const errors = []

  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ message: 'Please enter all fields' })
  }

  // if (password.length < 6) {
  //   errors.push({ message: 'Password should be at least 6 characters' })
  // }

  if (password != passwordConfirm) {
    errors.push({ message: 'Password do not match' })
  }

  if (errors.length > 0) {
    res.render('register', { errors })
  } else {
    // Form validation has passed
    const hashedPassword = await bcrypt.hash(password, 10)

    pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err
        }

        if (results.rows.length > 0) {
          errors.push({ message: 'Email already registered' })
          res.render('register', { errors })
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err
              }
              req.flash('success_msg', 'You are now registered. Please log in')
              res.status(200).render('products')
            }
          )
        }
      }
    )
  }
}
