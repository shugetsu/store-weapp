import mpx from '@mpxjs/core'

class Request {
  constructor () {
    // this.baseURL = 'http://127.0.0.1:7001' // 开发环境
    this.baseURL = 'https://yu-yin.xin:8001' // 生产环境
    this.defaultData = {}
  }

  async post (url, data = {}, options = {}) {
    const response = await mpx.xfetch.fetch({ ...options, url: this.baseURL + url, method: 'POST', data: mergeData(data, this.defaultData) })
    return response
  }

  async get (url, params = {}, options = {}) {
    const response = await mpx.xfetch.fetch({ ...options, url: this.baseURL + url, method: 'GET', params: mergeData(params, this.defaultData) })
    return response
  }
}

function mergeData (data, defaultData) { return Object.assign({}, data, defaultData) }

export default new Request()
