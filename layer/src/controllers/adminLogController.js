const { successResponse, errorResponse } = require('../utils/response')

const mockLogs = [
  { id: 1, admin: 'admin', action: '登录系统', ip: '192.168.1.1', createdAt: '2024-01-15 10:00:00' },
  { id: 2, admin: 'admin', action: '封禁用户 user_5', ip: '192.168.1.1', createdAt: '2024-01-15 10:05:00' },
  { id: 3, admin: 'manager1', action: '审核通过内容 #123', ip: '192.168.1.2', createdAt: '2024-01-15 09:30:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, admin, action } = req.query
    let list = [...mockLogs]
    if (admin) list = list.filter(item => item.admin.includes(admin))
    if (action) list = list.filter(item => item.action.includes(action))
    successResponse(res, { list, total: list.length })
  } catch (error) { errorResponse(res, error.message) }
}
