const { successResponse, errorResponse } = require('../utils/response')

const mockIdles = [
  { id: 1, title: '二手教材出售', description: '高数教材，9成新', seller: '张三', sellerId: 1, price: 25, originalPrice: 50, status: 'on_sale', category: '书籍', views: 120, wants: 5, createdAt: '2024-01-15 10:00:00' },
  { id: 2, title: '电脑显示器', description: '24寸显示器，正常使用', seller: '李四', sellerId: 2, price: 300, originalPrice: 800, status: 'sold', category: '数码', views: 89, wants: 3, createdAt: '2024-01-14 14:00:00' },
  { id: 3, title: '自行车转让', description: '骑了一年，车况良好', seller: '王五', sellerId: 3, price: 150, originalPrice: 400, status: 'off_shelf', category: '出行', views: 200, wants: 8, createdAt: '2024-01-13 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, category, keyword } = req.query
    let list = [...mockIdles]
    if (status) list = list.filter(item => item.status === status)
    if (category) list = list.filter(item => item.category === category)
    if (keyword) list = list.filter(item => item.title.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const idle = mockIdles.find(i => i.id === Number(req.params.id))
    if (!idle) return errorResponse(res, '商品不存在', 404)
    successResponse(res, idle)
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}

exports.offShelf = async (req, res) => {
  try { successResponse(res, null, '已下架') } catch (error) { errorResponse(res, error.message) }
}
