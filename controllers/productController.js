const { db } = require('../dbConfig')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.any('SELECT * FROM products')

    res.status(200).render('products', { products })
  } catch (e) {
    res.status(404)
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body

    await db.one(
      'INSERT INTO products (name, price, category, description) VALUES ($1, $2, $3, $4) DESC RETURNING id',
      [name, price, category, description]
    )

    req.flash('success_msg', 'Product added.')
    res.redirect('/products')
  } catch (e) {
    res.status(404)
  }
}
