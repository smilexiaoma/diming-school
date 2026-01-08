<template>
  <view class="dm-manage-btn" v-if="show" @click="handleClick">
    <uni-icons type="settings" size="16" color="#FFFFFF"></uni-icons>
    <text>管理</text>
  </view>
</template>

<script>
export default {
  name: 'dm-manage-btn',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.dm-manage-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 12rpx 24rpx;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  border-radius: 24rpx;
  flex-shrink: 0;

  text {
    font-size: 24rpx;
    color: #FFF;
  }
}
</style>
