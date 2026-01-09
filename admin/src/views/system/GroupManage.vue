<template>
  <div class="group-list">
    <el-card>
      <template #header><span>群管理</span></template>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="群名称" width="150" />
        <el-table-column prop="memberCount" label="成员数" width="100" />
        <el-table-column prop="messageCount" label="消息数" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag type="success">{{ row.status === 'active' ? '正常' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="160" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button size="small" @click="handleMessages(row)">消息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="群消息" width="600px">
      <div class="group-messages">
        <div v-for="msg in messages" :key="msg.id" class="message-item">
          <span class="sender">{{ msg.sender }}:</span>
          <span class="content">{{ msg.content }}</span>
          <span class="time">{{ msg.time }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { groupApi } from '@/api'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const messages = ref([])

const fetchData = async () => {
  loading.value = true
  try {
    const res = await groupApi.getList({})
    tableData.value = res.data.list
  } finally {
    loading.value = false
  }
}

const handleMessages = async (row) => {
  const res = await groupApi.getMessages(row.id)
  messages.value = res.data.messages
  dialogVisible.value = true
}

onMounted(fetchData)
</script>

<style scoped>
.message-item { padding: 8px; border-bottom: 1px solid #eee; }
.sender { font-weight: bold; margin-right: 8px; }
.time { color: #999; font-size: 12px; margin-left: 8px; }
</style>
