import users from '../models/users.js'
import products from '../models/products.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    await users.create({
      account: req.body.account,
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json({ success: true, message: ' ' })
  } catch (error) {
    if (error.account === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.account === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ success: false, message: '帳號重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
      console.log(error)
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        // reduce 是累加器 第一個放function  reduce total目前加到的值 current現在回圈跑到的數量
        cart: req.user.cart.reduce((total, current) => total + current.quantity, 0),
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
    console.log(error)
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

// 登入後 JWT 存在 LocalStorage 進網頁則不需重複登入
export const getUser = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        email: req.user.email,
        cart: req.user.cart.reduce((total, current) => total + current.quantity, 0),
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editCart = async (req, res) => {
  try {
    // 找購物車有沒有此商品
    const idx = req.user.cart.findIndex(cart => cart.p_id.toString() === req.body.p_id)
    if (idx > -1) {
      // 如果有，檢查新數量是多少
      const quantity = req.user.cart[idx].quantity + parseInt(req.body.quantity)
      // console.log(req.body.quantity)
      if (quantity <= 0) {
        // 如果新數量小於 0，從購物車陣列移除(移除一個)
        req.user.cart.splice(idx, 1)
      } else {
        // 如果新數量大於 0，修改購物車陣列數量
        req.user.cart[idx].quantity = quantity
      }
    } else {
      // 如果購物車內沒有此商品，檢查商品是否存在
      const product = await products.findById(req.body.p_id)
      // 如果不存在，回應 404
      if (!product || !product.sell) {
        res.status(404).send({ success: false, message: '商品已下架' })
        return
      }
      // 如果存在，加入購物車陣列
      req.user.cart.push({
        p_id: req.body.p_id,
        quantity: parseInt(req.body.quantity)
      })
    }
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: req.user.cart.reduce((total, current) => total + current.quantity, 0) })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getCart = async (req, res) => {
  try {
    // findByID(搜尋的ID,只取出這個 value 的欄位) 查詢語法 才會將商品資料帶入
    // .populate 把資料帶到該帶的地方 ( models 的 p_id 是從 product 來的 )
    // .populate('cart.p_id') mongoose 就會自動去尋找 user model 裡面的 cart 裡面的 cartSchema 裡面的 p_id 裡面的 ref 的 資料帶過來
    const result = await users.findById(req.user._id, 'cart').populate('cart.p_id')
    // 把購物車資料回傳回去
    res.status(200).json({ success: true, message: '', result: result.cart })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
