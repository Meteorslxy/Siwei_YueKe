// ... existing code ...
    else if (loginType === 'mobile-pwd') {
      // 手机号密码登录
      console.log('处理手机号密码登录，参数:', { phoneNumber, password });
      
      if (!phoneNumber) {
        return {
          code: -1,
          success: false,
          message: '缺少手机号参数'
        };
      }
      
      if (!password) {
        return {
          code: -1,
          success: false,
          message: '缺少密码参数'
        };
      }
      
      // 手机号格式验证
      if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
        // 将错误处理改为提示并继续尝试登录
        console.log('手机号格式不标准，但仍继续尝试登录:', phoneNumber);
        // 不在此处返回错误，继续尝试登录
      }
      
      try {
        console.log('开始查询用户，手机号:', phoneNumber);
        
        // 添加详细的检查和日志
        console.log('【重要】正在检查手机号在uni-id-users表中的存在情况:', phoneNumber);
        // 0. 首先直接用手机号作为username查询
        const uniIdUsernameResult = await db.collection('uni-id-users')
          .where({
            username: phoneNumber
          })
          .get();
        
        console.log('0.username查询结果:', JSON.stringify(uniIdUsernameResult.data));
        
        // 1. 查询uni-id-users表中mobile字段
        const uniIdMobileResult = await db.collection('uni-id-users')
          .where({
            mobile: phoneNumber
          })
          .get();
        
        console.log('1.mobile查询结果:', JSON.stringify(uniIdMobileResult.data));
        
        // 2. 如果没找到，查询phoneNumber字段
        const uniIdPhoneNumberResult = await db.collection('uni-id-users')
          .where({
            phoneNumber: phoneNumber
          })
          .get();
        
        console.log('2.phoneNumber查询结果:', JSON.stringify(uniIdPhoneNumberResult.data));
        
        // 汇总检查结果
        if (
          (uniIdUsernameResult.data && uniIdUsernameResult.data.length > 0) ||
          (uniIdMobileResult.data && uniIdMobileResult.data.length > 0) ||
          (uniIdPhoneNumberResult.data && uniIdPhoneNumberResult.data.length > 0)
        ) {
          console.log('【结论】在uni-id-users表中找到了该手机号关联的用户');
        } else {
          console.log('【结论】在uni-id-users表中没有找到该手机号关联的用户');
        }
        
        // 3. 如果还是没找到，继续原来的逻辑查询老用户表users
        if (
          (!uniIdUsernameResult.data || uniIdUsernameResult.data.length === 0) &&
          (!uniIdMobileResult.data || uniIdMobileResult.data.length === 0) &&
          (!uniIdPhoneNumberResult.data || uniIdPhoneNumberResult.data.length === 0)
        ) {
          console.log('4.所有uni-id-users表字段都未找到用户，尝试查询users表');
          const userResult = await db.collection('users')
            .where({
              phoneNumber: phoneNumber
            })
            .get();
          
          console.log('4.users查询结果:', JSON.stringify(userResult.data));
          
          if (!userResult.data || userResult.data.length === 0) {
            console.log('6.所有表都未找到用户');
            return {
              code: -1,
              success: false,
              message: '此账号未注册',
              details: {
                phoneNumber: phoneNumber,
                searchResult: {
                  uniIdUsername: uniIdUsernameResult.data ? uniIdUsernameResult.data.length : 0,
                  uniIdMobile: uniIdMobileResult.data ? uniIdMobileResult.data.length : 0,
                  uniIdPhoneNumber: uniIdPhoneNumberResult.data ? uniIdPhoneNumberResult.data.length : 0,
                  usersTable: 0
                }
              }
            };
          }
        }
      } catch (error) {
        console.error('登录查询时发生错误:', error);
        return {
          code: -1,
          success: false,
          message: '登录查询时发生错误'
        };
      }
    }
// ... existing code ...