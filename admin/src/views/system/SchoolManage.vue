<template>
  <div class="school-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>学校管理</span>
          <el-button type="primary" @click="handleAdd">添加学校</el-button>
        </div>
      </template>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="学校名称" width="200" />
        <el-table-column prop="code" label="学校代码" width="120" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="120" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑学校' : '添加学校'" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="代码"><el-input v-model="form.code" /></el-form-item>
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
import { schoolApi } from '@/api'

const loading = ref(false), tableData = ref([]), dialogVisible = ref(false)
const isEdit = ref(false), currentId = ref(null)
const form = reactive({ name: '', code: '' })

const fetchData = async () => {
  loading.value = true
  try {
    const res = await schoolApi.getList({})
    tableData.value = res.data.list
  } finally { loading.value = false }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { name: '', code: '' })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  currentId.value = row.id
  Object.assign(form, { name: row.name, code: row.code })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (isEdit.value) await schoolApi.update(currentId.value, form)
  else await schoolApi.add(form)
  ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
  dialogVisible.value = false
  fetchData()
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定删除？')
  await schoolApi.delete(row.id)
  ElMessage.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
