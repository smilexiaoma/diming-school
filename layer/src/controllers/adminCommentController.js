const { successResponse, errorResponse } = require('../utils/response')

const mockComments = [
  { id: 1, content: '写得很好！', author: '张三', authorId: 1, targetType: 'post', targetId: 1, targetTitle: '校园美食推荐', status: 'normal', likes: 5, createdAt: '2024-01-15 11:00:00' },
  { id: 2, content: '这个投票很有意义', author: '李四', authorId: 2, targetType: 'vote', targetId: 1, targetTitle: '最受欢迎的食堂', status: 'normal', likes: 3, createdAt: '2024-01-15 10:30:00' },
  { id: 3, content: '违规内容测试', author: '王五', authorId: 3, targetType: 'post', targetId: 2, targetTitle: '期末复习资料', status: 'hidden', likes: 0, createdAt: '2024-01-14 15:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, targetType, keyword } = req.query
    let list = [...mockComments]
    if (status) list = list.filter(item => item.status === status)
    if (targetType) list = list.filter(item => item.targetType === targetType)
    if (keyword) list = list.filter(item => item.content.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}

exports.hide = async (req, res) => {
  try { successResponse(res, null, '已隐藏') } catch (error) { errorResponse(res, error.message) }
}

exports.show = async (req, res) => {
  try { successResponse(res, null, '已显示') } catch (error) { errorResponse(res, error.message) }
}
