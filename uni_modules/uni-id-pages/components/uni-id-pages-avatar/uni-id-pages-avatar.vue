<template>
	<button open-type="chooseAvatar" @chooseavatar="bindchooseavatar" @click="navigateToProfile" class="box" :class="{'showBorder':border}"  :style="{width,height,lineHeight:height}">
		<cloud-image v-if="avatar_file" :src="avatar_file.url" :width="width" :height="height"></cloud-image>
		<uni-icons v-else :style="{width,height,lineHeight:height}" class="chooseAvatar" type="plusempty" size="30"
			color="#dddddd"></uni-icons>
	</button>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	/**
	* uni-id-pages-avatar 
	* @description 用户头像组件
	* @property {String} width	图片的宽，默认为：50px
	* @property {String} height	图片的高，默认为：50px
	*/
	export default {
		data() {
			return {
				isPC: false
			}
		},
		props: {
			//头像图片宽
			width: {
				type: String,
				default () {
					return "50px"
				}
			},
			//头像图片高
			height: {
				type: String,
				default () {
					return "50px"
				}
			},
			border:{
				type: Boolean,
				default () {
					return false
				}
			}
		},
		async mounted() {
			// #ifdef H5
			this.isPC = !['ios', 'android'].includes(uni.getSystemInfoSync().platform);
			// #endif
		},
		computed: {
			hasLogin() {
				return store.hasLogin
			},
			userInfo() {
				return store.userInfo || {}
			},
			avatar_file() {
				// 检查用户信息和头像信息是否存在
				if (!store.userInfo) return null;
				return store.userInfo.avatar_file || null;
			}
		},
		methods: {
			setAvatarFile(avatar_file) {
				// 检查登录状态
				if (!this.hasLogin) {
					uni.showModal({
						title: '提示',
						content: '请先登录后再修改头像',
						showCancel: false,
						success: () => {
							uni.navigateTo({
								url: '/uni_modules/uni-id-pages/pages/login/login'
							});
						}
					});
					return;
				}
				
				// 使用 clientDB 提交数据
				mutations.updateUserInfo({avatar_file})
			},
			async bindchooseavatar(res){
				let avatarUrl = res.detail.avatarUrl
				let avatar_file = {
					extname: avatarUrl.split('.')[avatarUrl.split('.').length - 1],
					name:'',
					url:''
				}
				//上传到服务器
				let cloudPath = this.userInfo._id + '' + Date.now()
				avatar_file.name = cloudPath
				try{
					uni.showLoading({
						title: "更新中",
						mask: true
					});
					let {
						fileID
					} = await uniCloud.uploadFile({
						filePath:avatarUrl,
						cloudPath,
						fileType: "image"
					});
					avatar_file.url = fileID
					uni.hideLoading()
				}catch(e){
					console.error(e);
				}
				console.log('avatar_file',avatar_file);
				this.setAvatarFile(avatar_file)
			},
			// 新方法：点击头像时导航到个人资料页面
			navigateToProfile() {
				// #ifdef MP-WEIXIN
				return false // 微信小程序走 bindchooseavatar方法
				// #endif
				
				// #ifndef MP-WEIXIN
				if(!this.hasLogin){
					return uni.navigateTo({
						url:'/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
					})
				}
				
				// 导航到个人资料页面
				uni.navigateTo({
					url: '/pages/user/profile/index'
				})
				// #endif
			},
			// 保留原方法，但不再通过点击头像调用
			uploadAvatarImg(res) {
				// #ifdef MP-WEIXIN
				return false // 微信小程序走 bindchooseavatar方法
				// #endif
				
				// #ifndef MP-WEIXIN
				if(!this.hasLogin){
					return uni.navigateTo({
						url:'/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
					})
				}
				
				// 直接选择并上传图片，不再跳转到裁剪页面
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], // 使用压缩图片
					sourceType: ['album', 'camera'], // 允许从相册和相机选择
					success: async (res) => {
						let tempFile = res.tempFiles[0],
							avatar_file = {
								// #ifdef H5
								extname: tempFile.name.split('.')[tempFile.name.split('.').length - 1],
								// #endif
								// #ifndef H5
								extname: tempFile.path.split('.')[tempFile.path.split('.').length - 1]
								// #endif
							},
							filePath = res.tempFilePaths[0]
							
						// 不再进行裁剪，直接上传图片
						let cloudPath = this.userInfo._id + '' + Date.now()
						avatar_file.name = cloudPath
						
						uni.showLoading({
							title: "更新中",
							mask: true
						});
						
						try {
							let {
								fileID
							} = await uniCloud.uploadFile({
								filePath,
								cloudPath,
								fileType: "image"
							});
							
							avatar_file.url = fileID
							this.setAvatarFile(avatar_file)
							
							uni.hideLoading()
							uni.showToast({
								title: '头像更新成功',
								icon: 'success'
							});
						} catch(err) {
							console.error('上传头像失败:', err);
							uni.hideLoading();
							uni.showToast({
								title: '上传失败，请重试',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						if(err.errMsg.indexOf('cancel') !== -1) {
							console.log('用户取消选择图片');
							return;
						}
						console.error('选择图片失败:', err);
						uni.showToast({
							title: '选择图片失败',
							icon: 'none'
						});
					}
				})
				// #endif
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	.box{
		overflow: hidden;
	}
	/* #endif */
	.box{
		padding: 0;
	}
	
	.chooseAvatar {
		/* #ifndef APP-NVUE */
		display: inline-block;
		box-sizing: border-box;
		/* #endif */
		border-radius: 10px;
		text-align: center;
		padding: 1px;
	}
	.showBorder{
		border: solid 1px #ddd;
	}
</style>
