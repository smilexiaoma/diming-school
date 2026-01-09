<template>
  <div class="admin-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>管理员管理</span>
          <el-button type="primary" @click="handleAdd">添加管理员</el-button>
        </div>
      </template>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">{{ roleText(row.role) }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastLogin" label="最后登录" width="160" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑管理员' : '添加管理员'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role">
            <el-option label="平台管理员" value="PLATFORM_ADMIN" />
            <el-option label="平台副管理" value="PLATFORM_SUB_ADMIN" />
            <el-option label="论坛管理员" value="FORUM_ADMIN" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminManageApi } from '@/api'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentId = ref(null)

const form = reactive({ username: '', nickname: '', role: 'PLATFORM_ADMIN', password: '' })

const roleText = (r) => ({
  SUPER_ADMIN: '超级管理员', PLATFORM_ADMIN: '平台管理员',
  PLATFORM_SUB_ADMIN: '平台副管理', FORUM_ADMIN: '论坛管理员'
}[r] || r)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await adminManageApi.getList({})
    tableData.value = res.data.list
  } finally { loading.value = false }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { username: '', nickname: '', role: 'PLATFORM_ADMIN', password: '' })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  currentId.value = row.id
  Object.assign(form, { username: row.username, nickname: row.nickname, role: row.role })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (isEdit.value) {
    await adminManageApi.update(currentId.value, form)
  } else {
    await adminManageApi.add(form)
  }
  ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
  dialogVisible.value = false
  fetchData()
}

const handleResetPwd = async (row) => {
  await ElMessageBox.confirm('确定重置该管理员密码？')
  await adminManageApi.resetPassword(row.id)
  ElMessage.success('密码已重置为默认密码')
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定删除该管理员？', '警告', { type: 'warning' })
  await adminManageApi.delete(row.id)
  ElMessage.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
