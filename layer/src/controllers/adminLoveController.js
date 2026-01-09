const { successResponse, errorResponse } = require('../utils/response')

const mockLoves = [
  { id: 1, nickname: '阳光男孩', gender: 'male', age: 22, author: '张三', authorId: 1, status: 'published', intro: '喜欢运动和音乐', likes: 45, views: 230, createdAt: '2024-01-15 10:00:00' },
  { id: 2, nickname: '温柔女生', gender: 'female', age: 21, author: '李四', authorId: 2, status: 'pending', intro: '爱好阅读和旅行', likes: 32, views: 180, createdAt: '2024-01-14 14:00:00' },
  { id: 3, nickname: '学霸一枚', gender: 'male', age: 23, author: '王五', authorId: 3, status: 'rejected', intro: '热爱学习，寻找志同道合的朋友', likes: 28, views: 150, createdAt: '2024-01-13 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, gender, keyword } = req.query
    let list = [...mockLoves]
    if (status) list = list.filter(item => item.status === status)
    if (gender) list = list.filter(item => item.gender === gender)
    if (keyword) list = list.filter(item => item.nickname.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const love = mockLoves.find(l => l.id === Number(req.params.id))
    if (!love) return errorResponse(res, '交友信息不存在', 404)
    successResponse(res, love)
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}
