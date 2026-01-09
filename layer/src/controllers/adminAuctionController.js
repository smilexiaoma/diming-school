const { successResponse, errorResponse } = require('../utils/response')

const mockAuctions = [
  { id: 1, title: '代写作业', description: '帮忙完成作业', publisher: '张三', publisherId: 1, status: 'bidding', startPrice: 10, currentPrice: 25, bids: 5, endTime: '2024-01-20 18:00:00', createdAt: '2024-01-15 10:00:00' },
  { id: 2, title: '辅导功课', description: '一对一辅导', publisher: '李四', publisherId: 2, status: 'completed', startPrice: 20, currentPrice: 50, bids: 8, endTime: '2024-01-18 18:00:00', createdAt: '2024-01-12 14:00:00' },
  { id: 3, title: '代取快递', description: '批量取快递', publisher: '王五', publisherId: 3, status: 'pending', startPrice: 5, currentPrice: 5, bids: 0, endTime: '2024-01-25 18:00:00', createdAt: '2024-01-16 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, keyword } = req.query
    let list = [...mockAuctions]
    if (status) list = list.filter(item => item.status === status)
    if (keyword) list = list.filter(item => item.title.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const auction = mockAuctions.find(a => a.id === Number(req.params.id))
    if (!auction) return errorResponse(res, '拍卖不存在', 404)
    successResponse(res, auction)
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}

exports.end = async (req, res) => {
  try { successResponse(res, null, '拍卖已结束') } catch (error) { errorResponse(res, error.message) }
}
