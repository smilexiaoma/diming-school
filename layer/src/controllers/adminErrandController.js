const { successResponse, errorResponse } = require('../utils/response')

// 模拟跑腿数据
const mockErrands = [
  { id: 1, title: '帮取快递', description: '菜鸟驿站取快递送到宿舍', publisher: '张三', publisherId: 1, runner: '李四', runnerId: 2, status: 'completed', fee: 5, address: '1号宿舍楼302', createdAt: '2024-01-15 14:00:00' },
  { id: 2, title: '代买午餐', description: '帮忙带一份食堂的饭', publisher: '王五', publisherId: 3, runner: null, runnerId: null, status: 'pending', fee: 3, address: '图书馆门口', createdAt: '2024-01-15 11:30:00' },
  { id: 3, title: '打印资料', description: '帮忙打印20页资料', publisher: '赵六', publisherId: 4, runner: '张三', runnerId: 1, status: 'in_progress', fee: 8, address: '教学楼A201', createdAt: '2024-01-15 09:00:00' }
]

exports.getList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, status, keyword } = req.query
    let list = [...mockErrands]
    if (status) list = list.filter(item => item.status === status)
    if (keyword) list = list.filter(item => item.title.includes(keyword))
    successResponse(res, { list: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page: Number(page), pageSize: Number(pageSize) })
  } catch (error) { errorResponse(res, error.message) }
}

exports.getDetail = async (req, res) => {
  try {
    const errand = mockErrands.find(e => e.id === Number(req.params.id))
    if (!errand) return errorResponse(res, '跑腿任务不存在', 404)
    successResponse(res, errand)
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') } catch (error) { errorResponse(res, error.message) }
}

exports.cancel = async (req, res) => {
  try { successResponse(res, null, '任务已取消') } catch (error) { errorResponse(res, error.message) }
}
