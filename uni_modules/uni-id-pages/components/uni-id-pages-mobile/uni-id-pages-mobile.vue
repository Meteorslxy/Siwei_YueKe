			// 修改绑定手机号
			changeMobile() {
				// 如果已绑定手机号并且显示了编辑按钮，则跳转到修改手机号页面
				if (this.hasPhone && this.showEdit) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile'
					});
				}
			},
			
			// 绑定手机号
			bindMobile() {
				if (this.disabled) return;
				
				const uniIdCo = uniCloud.importObject("uni-id-co");
				
				// 开发环境下，可以直接绑定一个测试手机号
				if (process.env.NODE_ENV === 'development') {
					uni.showModal({
						title: '绑定手机号',
						content: '在开发环境下，是否直接绑定测试手机号？',
						confirmText: '绑定测试号',
						cancelText: '正常绑定',
						success: (res) => {
							if (res.confirm) {
								// 直接绑定测试手机号
								const testMobile = '18888888888';
								uniIdCo.updateUserInfo({
									mobile: testMobile,
									mobile_confirmed: 1
								}).then(() => {
									// 更新用户信息
									uniIdCo.getUserInfo({}).then(result => {
										if (result && result.userInfo) {
											uni.$emit('uni-id-pages-user-info-changed', result.userInfo);
										}
										uni.showToast({
											title: '测试手机号绑定成功',
											icon: 'none'
										});
									});
								}).catch(err => {
									uni.showToast({
										title: err.message || '测试手机号绑定失败',
										icon: 'none'
									});
								});
							} else {
								// 正常跳转到绑定手机号页面
								uni.navigateTo({
									url: '/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile'
								});
							}
						}
					});
				} else {
					// 生产环境下，直接跳转到绑定手机号页面
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile'
					});
				}
			} 