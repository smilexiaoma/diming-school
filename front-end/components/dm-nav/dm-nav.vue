<template>
  <view class="dm-nav">
    <view class="nav-wrapper" :class="{ expanded: isExpanded }">
      <!-- 第一行前5个导航项 -->
      <view
        v-for="(item, index) in firstRowList"
        :key="index"
        class="nav-item"
        @click="handleClick(item, index)"
      >
        <view class="nav-icon-box">
          <image v-if="item.icon" class="nav-icon" :src="item.icon" mode="aspectFit"></image>
          <text v-else class="nav-icon-text">{{ (item.name || '').substring(0, 2) }}</text>
        </view>
        <text class="nav-text">{{ item.name || item }}</text>
      </view>

      <!-- 展开/收起按钮（固定在第一行第6个位置） -->
      <view class="nav-item nav-toggle" @click="toggleExpand">
        <view class="nav-icon-box">
          <uni-icons :type="isExpanded ? 'up' : 'down'" size="24" color="#666666"></uni-icons>
        </view>
        <text class="nav-text">{{ isExpanded ? '收起' : '更多' }}</text>
      </view>

      <!-- 展开后显示的剩余导航项（始终渲染，通过CSS控制显示） -->
      <view
        v-for="(item, index) in remainingList"
        :key="index + 100"
        class="nav-item nav-item-expandable"
        :class="{
          'nav-item-empty': item.isEmpty,
          'is-visible': isExpanded && !item.isEmpty
        }"
        @click="item.isEmpty ? null : handleClick(item, index + 5)"
      >
        <template v-if="!item.isEmpty">
          <view class="nav-icon-box">
            <image v-if="item.icon" class="nav-icon" :src="item.icon" mode="aspectFit"></image>
            <text v-else class="nav-icon-text">{{ (item.name || '').substring(0, 2) }}</text>
          </view>
          <text class="nav-text">{{ item.name || item }}</text>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'dm-nav',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    firstRowList() {
      // 第一行显示前5个导航项
      return this.list.slice(0, 5)
    },
    remainingList() {
      // 剩余的导航项，最多12个（第二行6个 + 第三行6个）
      const remaining = this.list.slice(5, 17)
      // 填充空占位符，确保始终有12个位置（2行×6列）
      const placeholderCount = 12 - remaining.length
      const placeholders = Array(placeholderCount).fill({ isEmpty: true })
      return [...remaining, ...placeholders]
    }
  },
  methods: {
    handleClick(item, index) {
      this.$emit('click', { item, index })
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.dm-nav {
  padding: 20rpx 0;
  background-color: #FFFFFF;
  overflow: hidden;

  .nav-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0 12rpx;
    max-height: 160rpx;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.expanded {
      max-height: 480rpx;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100% / 6);
      padding: 0 8rpx;
      margin-bottom: 20rpx;
      box-sizing: border-box;

      &.nav-item-expandable {
        opacity: 0;
        transform: translateY(-10rpx);
        pointer-events: none;
        transition: opacity 0.25s ease-in, transform 0.25s ease-in;

        &.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition: opacity 0.3s ease-out 0.05s, transform 0.3s ease-out 0.05s;
        }

        &.nav-item-empty {
          visibility: hidden;
        }
      }

      .nav-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 88rpx;
        height: 88rpx;
        margin-bottom: 8rpx;
        background-color: #F5F5F5;
        border-radius: 16rpx;
        transition: background-color 0.2s ease;

        .nav-icon {
          width: 48rpx;
          height: 48rpx;
        }

        .nav-icon-text {
          font-size: 24rpx;
          color: #666666;
        }
      }

      .nav-text {
        width: 100%;
        font-size: 20rpx;
        color: #333333;
        text-align: center;
        line-height: 1.4;
        word-break: break-all;
      }

      &.nav-toggle {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;

        .nav-icon-box {
          background-color: #F0F0F0;
        }
      }
    }
  }
}
</style>
