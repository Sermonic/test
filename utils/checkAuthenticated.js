function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/products')
  }

  next()
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/users/login')
}

module.exports = { checkAuthenticated, checkNotAuthenticated }
