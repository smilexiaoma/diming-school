const { successResponse, errorResponse } = require('../utils/response')

// 模拟帖子数据
const mockPosts = [
  { id: 1, title: '校园美食推荐', content: '分享一下食堂的美食...', author: '张三', authorId: 1, category: '生活', status: 'published', views: 1234, likes: 56, comments: 12, createdAt: '2024-01-15 10:30:00' },
  { id: 2, title: '期末复习资料分享', content: '整理了一些复习资料...', author: '李四', authorId: 2, category: '学习', status: 'pending', views: 890, likes: 45, comments: 8, createdAt: '2024-01-14 15:20:00' },
  { id: 3, title: '社团招新啦', content: '我们社团正在招新...', author: '王五', authorId: 3, category: '活动', status: 'rejected', views: 456, likes: 23, comments: 5, createdAt: '2024-01-13 09:15:00' }
]

// 获取帖子列表
exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, category, keyword } = req.query
    let list = [...mockPosts]

    if (status) list = list.filter(item => item.status === status)
    if (category) list = list.filter(item => item.category === category)
    if (keyword) list = list.filter(item => item.title.includes(keyword) || item.content.includes(keyword))

    successResponse(res, {
      list: list.slice((page - 1) * pageSize, page * pageSize),
      total: list.length,
      page: Number(page),
      pageSize: Number(pageSize)
    })
  } catch (error) {
    errorResponse(res, error.message)
  }
}

// 获取帖子详情
exports.getDetail = async (req, res) => {
  try {
    const { id } = req.params
    const post = mockPosts.find(p => p.id === Number(id))
    if (!post) return errorResponse(res, '帖子不存在', 404)
    successResponse(res, post)
  } catch (error) {
    errorResponse(res, error.message)
  }
}

// 删除帖子
exports.delete = async (req, res) => {
  try {
    const { id } = req.params
    successResponse(res, null, '删除成功')
  } catch (error) {
    errorResponse(res, error.message)
  }
}

// 置顶/取消置顶
exports.setTop = async (req, res) => {
  try {
    const { id } = req.params
    const { isTop } = req.body
    successResponse(res, null, isTop ? '置顶成功' : '取消置顶成功')
  } catch (error) {
    errorResponse(res, error.message)
  }
}

// 设为精华/取消精华
exports.setFeatured = async (req, res) => {
  try {
    const { id } = req.params
    const { isFeatured } = req.body
    successResponse(res, null, isFeatured ? '设为精华成功' : '取消精华成功')
  } catch (error) {
    errorResponse(res, error.message)
  }
}
