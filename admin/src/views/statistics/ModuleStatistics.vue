<template>
  <div class="module-stats">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>模块统计</span>
          <el-button type="primary" @click="handleExport">导出数据</el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, key) in stats" :key="key">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-title">{{ moduleNames[key] }}</div>
            <div class="stat-content">
              <div class="stat-item">
                <span class="label">总数</span>
                <span class="value">{{ item.total }}</span>
              </div>
              <div class="stat-item">
                <span class="label">今日新增</span>
                <span class="value highlight">{{ item.today }}</span>
              </div>
              <div class="stat-item">
                <span class="label">{{ extraLabel[key] }}</span>
                <span class="value">{{ item[extraKey[key]] }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { statisticsApi } from '@/api'

const stats = ref({})
const moduleNames = { post: '帖子', vote: '投票', errand: '跑腿', idle: '闲置', love: '交友', auction: '拍卖' }
const extraLabel = { post: '待审核', vote: '进行中', errand: '待接单', idle: '在售', love: '待审核', auction: '竞拍中' }
const extraKey = { post: 'pending', vote: 'active', errand: 'pending', idle: 'onSale', love: 'pending', auction: 'bidding' }

const fetchData = async () => {
  const res = await statisticsApi.getModuleStats()
  if (res.code === 200) stats.value = res.data
}

const handleExport = async () => {
  const res = await statisticsApi.exportData({ type: 'module' })
  if (res.code === 200) ElMessage.success('导出成功')
}

onMounted(fetchData)
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.stat-card { margin-bottom: 20px; }
.stat-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #303133; }
.stat-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
.stat-item:last-child { border-bottom: none; }
.label { color: #909399; }
.value { font-weight: bold; color: #303133; }
.highlight { color: #409eff; }
</style>
