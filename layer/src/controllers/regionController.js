const { successResponse } = require('../utils/response')

/**
 * 获取地区列表（城市+片区）
 */
exports.getList = async (req, res, next) => {
  try {
    // TODO: 从数据库获取后台配置的地区数据
    const regions = [
      { id: 0, name: '全国', type: 'all', is_fixed: true },
      { id: 10, name: '上海', type: 'city', is_fixed: false },
      { id: 11, name: '天津', type: 'city', is_fixed: false },
      { id: 99, name: '南京大学城', type: 'zone', is_fixed: false }
    ]
    successResponse(res, regions)
  } catch (error) {
    next(error)
  }
}

/**
 * 获取校区列表
 * @query regionId - 地区ID（可选，不传返回全部）
 */
exports.getSchools = async (req, res, next) => {
  try {
    const { regionId } = req.query
    // TODO: 从数据库获取校区数据
    let schools = [
      { id: 1, name: '上海交通大学', region_id: 10, region_name: '上海' },
      { id: 2, name: '复旦大学', region_id: 10, region_name: '上海' },
      { id: 3, name: '南开大学', region_id: 11, region_name: '天津' },
      { id: 4, name: '天津大学', region_id: 11, region_name: '天津' },
      { id: 5, name: '南京大学', region_id: 99, region_name: '南京大学城' }
    ]
    if (regionId && regionId !== '0') {
      schools = schools.filter(s => s.region_id === parseInt(regionId))
    }
    successResponse(res, schools)
  } catch (error) {
    next(error)
  }
}

/**
 * 获取可见范围选项
 */
exports.getVisibleOptions = async (req, res, next) => {
  try {
    // TODO: 从数据库获取后台配置的可见范围选项
    const options = [
      { id: 0, name: '全国可见', type: 'all' },
      { id: 1, name: '本城市可见', type: 'city' },
      { id: 2, name: '本校区可见', type: 'school' }
    ]
    successResponse(res, options)
  } catch (error) {
    next(error)
  }
}
