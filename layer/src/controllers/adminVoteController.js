const { successResponse, errorResponse } = require('../utils/response')

// 模拟投票数据
const mockVotes = [
  { id: 1, title: '最受欢迎的食堂', description: '投票选出你最喜欢的食堂', author: '张三', authorId: 1, status: 'active', totalVotes: 256, options: 4, endTime: '2024-02-01 23:59:59', createdAt: '2024-01-10 10:00:00' },
  { id: 2, title: '社团活动时间调查', description: '选择你方便的活动时间', author: '李四', authorId: 2, status: 'ended', totalVotes: 189, options: 3, endTime: '2024-01-20 23:59:59', createdAt: '2024-01-05 14:30:00' },
  { id: 3, title: '校园改进建议', description: '你最希望改进的方面', author: '王五', authorId: 3, status: 'pending', totalVotes: 0, options: 5, endTime: '2024-02-15 23:59:59', createdAt: '2024-01-18 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, keyword } = req.query
    let list = [...mockVotes]
    if (status) list = list.filter(item => item.status === status)
    if (keyword) list = list.filter(item => item.title.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const vote = mockVotes.find(v => v.id === Number(req.params.id))
    if (!vote) return errorResponse(res, '投票不存在', 404)
    successResponse(res, { ...vote, options: [{ id: 1, text: '选项A', votes: 100 }, { id: 2, text: '选项B', votes: 80 }] })
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}

exports.end = async (req, res) => {
  try { successResponse(res, null, '投票已结束') } catch (error) { errorResponse(res, error.message) }
}
