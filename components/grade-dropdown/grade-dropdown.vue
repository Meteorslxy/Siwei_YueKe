<template>
  <view class="grade-dropdown">
    <view class="dropdown-header" @click="toggleDropdown">
      <text class="dropdown-text">{{selectedLabel}}</text>
      <view class="dropdown-arrow" :class="{ 'arrow-up': isOpen }"></view>
    </view>
    
    <view class="dropdown-content" v-if="isOpen">
      <view 
        class="dropdown-item" 
        v-for="(item, index) in options" 
        :key="index"
        :class="{ active: selected === item.value }"
        @click="selectItem(item)">
        {{item.label}}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'grade-dropdown',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '全部年级'
    }
  },
  data() {
    return {
      isOpen: false,
      selected: ''
    }
  },
  computed: {
    selectedLabel() {
      const selectedItem = this.options.find(item => item.value === this.selected);
      return selectedItem ? selectedItem.label : this.placeholder;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.selected = val;
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.$emit('toggle', this.isOpen);
    },
    selectItem(item) {
      this.selected = item.value;
      this.isOpen = false;
      this.$emit('input', item.value);
      this.$emit('change', item);
    },
    closeDropdown() {
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
.grade-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80rpx;
  padding: 0 20rpx;
  border-radius: 8rpx;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.dropdown-text {
  color: #fff;
  font-size: 28rpx;
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 10rpx solid #fff;
  transition: transform 0.3s;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 90rpx;
  left: 0;
  width: 100%;
  max-height: 400rpx;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.dropdown-item {
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
}

.dropdown-item.active {
  color: #EC7A49;
  background-color: #f7f7f7;
}

.dropdown-item:last-child {
  border-bottom: none;
}
</style> 