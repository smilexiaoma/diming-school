const { successResponse, errorResponse } = require('../utils/response')

const mockChats = [
  { id: 1, user1: '张三', user1Id: 1, user2: '李四', user2Id: 2, lastMessage: '好的，明天见', messageCount: 15, createdAt: '2024-01-15 16:00:00' },
  { id: 2, user1: '王五', user1Id: 3, user2: '赵六', user2Id: 4, lastMessage: '收到，谢谢', messageCount: 8, createdAt: '2024-01-15 14:30:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query
    let list = [...mockChats]
    if (keyword) list = list.filter(item => item.user1.includes(keyword) || item.user2.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const messages = [
      { id: 1, sender: '张三', content: '你好', time: '2024-01-15 15:00:00' },
      { id: 2, sender: '李四', content: '你好，有什么事吗', time: '2024-01-15 15:01:00' }
    ]
    successResponse(res, { messages })
  } catch (error) { errorResponse(res, error.message) }
}
