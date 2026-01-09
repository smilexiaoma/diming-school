const { successResponse, errorResponse } = require('../utils/response')

const mockMessages = [
  { id: 1, title: '系统维护通知', content: '系统将于今晚进行维护...', type: 'system', targetType: 'all', status: 'sent', readCount: 1200, createdAt: '2024-01-15 10:00:00' },
  { id: 2, title: '新功能上线', content: '新增拍卖功能...', type: 'system', targetType: 'all', status: 'sent', readCount: 890, createdAt: '2024-01-14 14:00:00' },
  { id: 3, title: '活动通知', content: '校园活动即将开始...', type: 'activity', targetType: 'school', status: 'draft', readCount: 0, createdAt: '2024-01-13 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, type, status } = req.query
    let list = [...mockMessages]
    if (type) list = list.filter(item => item.type === type)
    if (status) list = list.filter(item => item.status === status)
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length })
  } catch (error) { errorResponse(res, error.message) }
}

exports.send = async (req, res) => {
  try {
    const { title, content, type, targetType } = req.body
    successResponse(res, { id: Date.now() }, '发送成功')
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}
