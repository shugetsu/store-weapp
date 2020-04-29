import area from './area'

export default {
  getDataSet (event, key) {
    return event.currentTarget.dataset[key]
  },
  // 设置tabbar选中
  setTabBarSelected (context, selected) {
    if (typeof context.getTabBar === 'function' && context.getTabBar()) {
      context.getTabBar().setData({ selected })
    }
  },
  // 过滤数据
  filterResponse (response, defaultVal) {
    if (response.data.code === 200) {
      return response.data.data
    }
    return defaultVal
  },
  // 根据code获取地区
  getRegionByCode(province, city, country, separator = '') {
    let region = ''
    region += area.province_list[province] + separator
    region += area.city_list[city] + separator
    region += area.county_list[country]
    return region
  },
  filterOrderStatus(val) {
    let color = ''
    let text = ''
    switch (parseInt(val)) {
      case 1: color = '#ee0a24'; text = '待支付'; break;
      case 2: color = '#07c160'; text = '已支付'; break;
      case 3: color = '#1989fa'; text = '已发货'; break;
      case 4: color = '#ff976a'; text = '已支付, 但库存不足'; break;
    }
    return { color, text }
  }
}
