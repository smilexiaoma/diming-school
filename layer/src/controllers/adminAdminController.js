const { successResponse, errorResponse } = require('../utils/response')

const mockAdmins = [
  { id: 1, username: 'admin', nickname: '超级管理员', role: 'SUPER_ADMIN', status: 'active', lastLogin: '2024-01-15 10:00:00', createdAt: '2024-01-01 00:00:00' },
  { id: 2, username: 'manager1', nickname: '平台管理员', role: 'PLATFORM_ADMIN', status: 'active', lastLogin: '2024-01-15 09:00:00', createdAt: '2024-01-05 10:00:00' }
]

exports.getList = async (req, res) => {
  try {
    successResponse(res, { list: mockAdmins, total: mockAdmins.length })
  } catch (error) { errorResponse(res, error.message) }
}

exports.add = async (req, res) => {
  try {
    successResponse(res, { id: Date.now() }, '添加成功')
  } catch (error) { errorResponse(res, error.message) }
}

exports.update = async (req, res) => {
  try {
    successResponse(res, null, '更新成功')
  } catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try {
    successResponse(res, null, '删除成功')
  } catch (error) { errorResponse(res, error.message) }
}

exports.resetPassword = async (req, res) => {
  try {
    successResponse(res, null, '密码已重置')
  } catch (error) { errorResponse(res, error.message) }
}
