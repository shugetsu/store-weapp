import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'

const categoryModel = createStore({
  state: {
    ProductCtegoryList: []
  },
  mutations: {
    SET_PRODUCT_CTEGORY_LIST (state, payload) { state.ProductCtegoryList = payload }
  },
  actions: {
    // 获取分类商品列表
    async GetProductCtegoryList (context) {
      const res = await request.get('/api/client/v1/category/getProductCategoryList')
      const data = util.filterResponse(res, [])
      context.commit('SET_PRODUCT_CTEGORY_LIST', data)
      return res
    }
  }
})

export default categoryModel
