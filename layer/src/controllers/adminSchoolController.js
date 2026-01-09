const { successResponse, errorResponse } = require('../utils/response')

const mockSchools = [
  { id: 1, name: '示例大学', code: 'SLXY', status: 'active', userCount: 1200, createdAt: '2024-01-01' },
  { id: 2, name: '测试学院', code: 'CSXY', status: 'active', userCount: 800, createdAt: '2024-01-05' }
]

exports.getList = async (req, res) => {
  try { successResponse(res, { list: mockSchools, total: mockSchools.length }) }
  catch (error) { errorResponse(res, error.message) }
}

exports.add = async (req, res) => {
  try { successResponse(res, { id: Date.now() }, '添加成功') }
  catch (error) { errorResponse(res, error.message) }
}

exports.update = async (req, res) => {
  try { successResponse(res, null, '更新成功') }
  catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') }
  catch (error) { errorResponse(res, error.message) }
}
