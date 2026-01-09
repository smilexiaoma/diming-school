const { successResponse, errorResponse } = require('../utils/response')

const mockGroups = [
  { id: 1, name: '互助群', memberCount: 256, messageCount: 1200, status: 'active', createdAt: '2024-01-01 10:00:00' },
  { id: 2, name: '跑腿交流群', memberCount: 128, messageCount: 560, status: 'active', createdAt: '2024-01-05 14:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query
    successResponse(res, { list: mockGroups, total: mockGroups.length })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = [
      { id: 1, sender: '张三', content: '有人接单吗', time: '2024-01-15 15:00:00' },
      { id: 2, sender: '李四', content: '我来', time: '2024-01-15 15:01:00' }
    ]
    successResponse(res, { messages })
  } catch (error) { errorResponse(res, error.message) }
}

exports.mute = async (req, res) => {
  try { successResponse(res, null, '已禁言') } catch (error) { errorResponse(res, error.message) }
}
