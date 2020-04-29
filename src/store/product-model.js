import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'

const productModel = createStore({
  state: {
    NewProductList: {},
    ProductDetail: {}
  },
  mutations: {
    SET_NEW_PRODUCT_LIST (state, payload) { state.NewProductList = payload },
    SET_PRODUCT_DETAIL (state, payload) { state.ProductDetail = payload }
  },
  actions: {
    // 获取最近新品 count 数量
    async GetNewProductList (context, params) {
      const res = await request.get('/api/client/v1/product/getNewProductList', params)
      const data = util.filterResponse(res, [])
      context.commit('SET_NEW_PRODUCT_LIST', data)
      return res
    },
    // 获取最近新品 id 商品id
    async GetProductDetail (context, params) {
      const res = await request.get('/api/client/v1/product/getProductDetail', params)
      const data = util.filterResponse(res, [])
      context.commit('SET_PRODUCT_DETAIL', data)
      return res
    }
  }
})

export default productModel
