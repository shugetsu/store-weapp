import { createStore } from '@mpxjs/core'
import util from '@/utils/util'

const cart = createStore({
  state: {
    CartProductList: wx.getStorageSync('CartProductList') || [],
    OrderProductList: []
  },
  mutations: {
    // 添加商品到购物车
    ADD_PRODUCT_TO_CART_PRODUCT (state, payload) {
      let index = state.CartProductList.findIndex(item => item.product.id === payload.product.id)
      if (index >= 0) {
        state.CartProductList = state.CartProductList.map((item, i) => {
          if (i === index) {
            item.count += payload.count
          }
          return item
        })
      } else {
        state.CartProductList = state.CartProductList.concat([payload])
      }
      wx.setStorageSync('CartProductList', state.CartProductList)
    },
    // 删除购物车里的商品
    DELETE_CART_PRODUCT (state, payload) {
      if (Array.isArray(payload)) {
        payload.forEach(id => {
          state.CartProductList = state.CartProductList.filter(item => item.product.id !== id)
        })
      } else {
        state.CartProductList = state.CartProductList.filter(item => item.product.id !== payload)
      }
      wx.setStorageSync('CartProductList', state.CartProductList)
    },
    // 设置商品的数量
    SET_CART_PRODUCT_COUNT (state, payload) {
      const { index, count } = payload
      state.CartProductList = state.CartProductList.map((item, i) => {
        if (i === index) {
          item.count = count
        }
        return item
      })
      wx.setStorageSync('CartProductList', state.CartProductList)
    },
    // 设置某商品是否选中
    SET_CART_PRODUCT_SELECTED (state, payload) {
      const { index, isSelected } = payload
      state.CartProductList = state.CartProductList.map((item, i) => {
        if (i === index) {
          item.isSelected = isSelected
        }
        return item
      })
      wx.setStorageSync('CartProductList', state.CartProductList)
    },
    // 设置所有商品是否选中
    SET_CART_PRODUCT_ALL_SELECTED (state, payload) {
      state.CartProductList = state.CartProductList.map((item, i) => {
        item.isSelected = payload
        return item
      })
      wx.setStorageSync('CartProductList', state.CartProductList)
    },
    // 设置订单列表
    SET_ORDER_PRODUCT_LIST (state, payload) {
      state.OrderProductList = payload.map(item => item)
    }
  }
})

export default cart
