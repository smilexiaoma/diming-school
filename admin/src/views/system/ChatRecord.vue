<template>
  <div class="chat-list">
    <el-card>
      <template #header><span>聊天记录</span></template>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="用户">
          <el-input v-model="queryParams.keyword" placeholder="搜索用户" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="user1" label="用户1" width="100" />
        <el-table-column prop="user2" label="用户2" width="100" />
        <el-table-column prop="lastMessage" label="最后消息" min-width="200" />
        <el-table-column prop="messageCount" label="消息数" width="80" />
        <el-table-column prop="createdAt" label="时间" width="160" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button size="small" @click="handleDetail(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="聊天详情" width="600px">
      <div class="chat-messages">
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
import { chatApi } from '@/api'

const loading = ref(false), tableData = ref([]), dialogVisible = ref(false), messages = ref([])
const queryParams = ref({ page: 1, keyword: '' })

const fetchData = async () => {
  loading.value = true
  try { const res = await chatApi.getList(queryParams.value); tableData.value = res.data.list } finally { loading.value = false }
}
const handleSearch = () => fetchData()
const handleDetail = async (row) => {
  const res = await chatApi.getDetail(row.id)
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
