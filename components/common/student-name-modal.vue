<template>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog
      ref="inputDialog"
      mode="input"
      title="学员姓名设置"
      placeholder="请输入您的真实姓名"
      :value="studentName"
      @confirm="confirmName"
      @close="closeDialog"
      :focus="true"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script>
export default {
  name: 'StudentNameModal',
  data() {
    return {
      studentName: ''
    }
  },
  methods: {
    // 打开弹窗
    open() {
      console.log('student-name-modal开始打开弹窗')
      
      // 先检查用户是否已登录
      const token = uni.getStorageSync('uni_id_token')
      const userInfo = uni.getStorageSync('uni-id-pages-userInfo') || {}
      
      // 如果没有token或用户信息，说明用户未登录，不显示弹窗
      if (!token || !userInfo._id) {
        console.log('用户未登录，不显示姓名设置弹窗')
        return
      }
      
      if (this.$refs.popup) {
        console.log('student-name-modal组件找到了popup引用，正在打开')
        this.$refs.popup.open()
      } else {
        console.error('student-name-modal组件找不到popup引用')
      }
    },
    
    // 关闭弹窗
    close() {
      console.log('student-name-modal关闭弹窗')
      if (this.$refs.popup) {
        this.$refs.popup.close()
      }
    },
    
    // 确认姓名
    confirmName(name) {
      console.log('学生姓名确认:', name)
      if (!name || name.trim() === '') {
        uni.showToast({
          title: '姓名不能为空',
          icon: 'none'
        })
        return
      }
      
      // 更新用户昵称到云数据库
      this.updateUserNickname(name)
    },
    
    // 用户取消设置姓名
    closeDialog() {
      console.log('用户取消设置姓名')
      // 检查是否第一次设置姓名
      const hasSetName = uni.getStorageSync('hasSetStudentName')
      if (!hasSetName) {
        console.log('用户首次登录未设置姓名，将设置临时姓名')
        // 生成临时姓名
        const tempName = '用户' + Math.floor(Math.random() * 1000000)
        console.log('生成临时姓名:', tempName)
        // 更新临时姓名到本地存储
        this.updateUserNickname(tempName, true)
      } else {
        console.log('用户已设置过姓名，直接关闭弹窗')
        this.close()
      }
    },
    
    // 更新用户昵称到云数据库
    async updateUserNickname(name, isTemporary = false) {
      try {
        uni.showLoading({
          title: '保存中...',
          mask: true
        })
        
        console.log('准备更新用户昵称:', name, isTemporary ? '(临时姓名)' : '(正式姓名)')
        
        if (!name || name.trim() === '') {
          throw new Error('姓名不能为空')
        }
        
        // 获取token并传递给云函数
        const token = uni.getStorageSync('uni_id_token')
        if (!token) {
          throw new Error('未登录，请重新登录')
        }
        
        // 获取用户ID
        const userInfo = uni.getStorageSync('uni-id-pages-userInfo') || {}
        const userId = userInfo._id || userInfo.uid || userInfo.userId || ''
        
        console.log('传递token给云函数:', token.substring(0, 10) + '...')
        if (userId) {
          console.log('传递用户ID:', userId)
        }
        
        // 使用多种方式进行更新，如果一种失败，尝试另一种
        let success = false
        
        // 如果是临时姓名并且不需要发送到服务器，则只更新本地存储
        if (isTemporary) {
          console.log('设置临时姓名，仅更新本地存储')
          success = true
        } else {
          // 方法1: 使用自定义云函数
          try {
            console.log('方法1: 使用自定义云函数更新昵称')
            const result = await uniCloud.callFunction({
              name: 'updateUserInfo',
              data: {
                nickname: name,
                nickName: name,
                token: token,
                uni_id_token: token,
                userId: userId,
                uid: userId,
                _id: userId,
                mobile: userInfo.mobile || userInfo.phoneNumber || ''
              }
            })
            
            console.log('方法1结果:', result)
            
            if (result.result && result.result.code === 0) {
              success = true
            }
          } catch (e) {
            console.error('方法1失败:', e)
          }
          
          // 如果方法1失败，尝试方法2
          if (!success) {
            try {
              console.log('方法2: 使用uni-id-co更新昵称')
              const uniIdCo = uniCloud.importObject('uni-id-co', { customUI: true })
              const res = await uniIdCo.updateUser({ nickname: name })
              
              console.log('方法2结果:', res)
              
              if (res.errCode === 0) {
                success = true
              }
            } catch (e) {
              console.error('方法2失败:', e)
            }
          }
        }
        
        // 无论云端是否更新成功，都更新本地存储
        // 更新本地存储
        let storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {}
        storedUserInfo.nickname = name
        storedUserInfo.nickName = name 
        uni.setStorageSync('uni-id-pages-userInfo', storedUserInfo)
        
        // 同时更新自定义存储
        uni.setStorageSync('userInfo', storedUserInfo)
        
        // 触发用户信息更新事件
        uni.$emit('user:updated', storedUserInfo)
        
        if (!isTemporary) {
          uni.showToast({
            title: success ? '保存成功' : '本地保存成功',
            icon: 'success'
          })
        }
        
        // 记录已设置姓名
        uni.setStorageSync('hasSetStudentName', true)
        
        // 关闭弹窗
        this.close()
      } catch (error) {
        console.error('更新用户昵称失败:', error)
        uni.showToast({
          title: '保存失败: ' + (error.message || '未知错误'),
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style>
</style> 