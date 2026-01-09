<template>
  <div class="message-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统消息</span>
          <el-button type="primary" @click="handleAdd">发送消息</el-button>
        </div>
      </template>
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="类型">
          <el-select v-model="queryParams.type" placeholder="全部" clearable>
            <el-option label="系统通知" value="system" />
            <el-option label="活动通知" value="activity" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="已发送" value="sent" />
            <el-option label="草稿" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">{{ row.type === 'system' ? '系统通知' : '活动通知' }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'sent' ? 'success' : 'info'">{{ row.status === 'sent' ? '已发送' : '草稿' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="readCount" label="已读数" width="80" />
        <el-table-column prop="createdAt" label="创建时间" width="160" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="queryParams.page" :total="total" layout="total, prev, pager, next" @change="fetchData" style="margin-top: 16px" />
    </el-card>

    <el-dialog v-model="dialogVisible" title="发送消息" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="form.content" type="textarea" rows="4" /></el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option label="系统通知" value="system" />
            <el-option label="活动通知" value="activity" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标">
          <el-select v-model="form.targetType">
            <el-option label="全部用户" value="all" />
            <el-option label="指定学校" value="school" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSend">发送</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { messageApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0), dialogVisible = ref(false)
const queryParams = ref({ page: 1, type: '', status: '' })
const form = reactive({ title: '', content: '', type: 'system', targetType: 'all' })

const fetchData = async () => {
  loading.value = true
  try { const res = await messageApi.getList(queryParams.value); tableData.value = res.data.list; total.value = res.data.total } finally { loading.value = false }
}
const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleAdd = () => { Object.assign(form, { title: '', content: '', type: 'system', targetType: 'all' }); dialogVisible.value = true }
const handleSend = async () => { await messageApi.send(form); ElMessage.success('发送成功'); dialogVisible.value = false; fetchData() }
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？'); await messageApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
