<!-- 图片裁剪页 -->
<template>
	<view class="content" >
		<limeClipper 
			:width="options.width" 
			:height="options.height" 
			:scale-ratio="2" 
			:is-lock-width="false" 
			:is-lock-height="false" 
			:image-url="path"
			:canvas-width="canvasWidth"
			:canvas-height="canvasHeight"
			@success="successFn" 
			@cancel="cancel" 
		/>
	</view>
</template>
<script>
import limeClipper from './limeClipper/limeClipper.vue';
export default {
	components: {limeClipper},
	data() {
		return {
			path: '',
			options:{"width":600,"height":600},
			canvasWidth: 750, // 默认裁剪区域宽度
			canvasHeight: 950 // 默认裁剪区域高度
		}
	},
	onLoad({path,options}) {
		this.path = path
		console.log('裁剪页面接收到的路径:', path);
		if(options){
			try {
				this.options = JSON.parse(options)
				console.log('裁剪选项:', this.options);
			} catch(e) {
				console.error('解析裁剪选项失败:', e);
			}
		}
		
		// 获取屏幕宽高
		const sysInfo = uni.getSystemInfoSync();
		const windowWidth = sysInfo.windowWidth;
		const windowHeight = sysInfo.windowHeight;
		
		// 设置裁剪区域为屏幕的3/4大小
		// 注意：这里的单位是px，小程序中750rpx = 屏幕宽度
		const scale = 750 / windowWidth;
		this.canvasWidth = windowWidth * scale * 0.9; // 宽度占90%
		this.canvasHeight = windowHeight * scale * 0.75; // 高度占75%
		
		console.log('设置裁剪区域大小:', this.canvasWidth, this.canvasHeight);
	},
	methods:{
		successFn(e){
			console.log('裁剪成功，图片路径:', e.url);
			
			// 保存裁剪结果到本地
			uni.setStorageSync('temp_avatar_path', e.url);
			
			// 发送全局事件通知
			uni.$emit('cropImage', {
				path: e.url,
				width: this.options.width,
				height: this.options.height,
				timestamp: Date.now()
			});
			
			// 通过事件通道返回数据给上一页面
			const eventChannel = this.getOpenerEventChannel();
			if (eventChannel && eventChannel.emit) {
				try {
					eventChannel.emit('success', {
						path: e.url,
						width: this.options.width,
						height: this.options.height
					});
					console.log('通过事件通道发送裁剪结果成功');
				} catch (error) {
					console.error('通过事件通道发送裁剪结果失败:', error);
				}
			} else {
				console.warn('未找到事件通道，无法返回裁剪结果');
			}
			
			// 延迟返回，确保事件已发送
			setTimeout(() => {
				uni.navigateBack({
					success: () => {
						console.log('裁剪完成，已返回上一页');
					}
				});
			}, 300);
		},
		cancel(){
			console.log('取消裁剪');
			uni.navigateBack();
		}
	}
}
</script>

<style>
.content {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #000;
}
.box{
	width: 400rpx;
}
.mt{
	margin-top: -10px;
}
</style>