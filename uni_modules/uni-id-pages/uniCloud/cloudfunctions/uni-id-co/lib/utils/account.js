const {
  dbCmd,
  userCollection
} = require('../../common/constants')
const {
  USER_IDENTIFIER
} = require('../../common/constants')
const {
  batchFindObjctValue,
  getType,
  isMatchUserApp
} = require('../../common/utils')

/**
 * 查询满足条件的用户
 * @param {Object} params
 * @param {Object} params.userQuery 用户唯一标识组成的查询条件
 * @param {Object} params.authorizedApp 用户允许登录的应用
 * @returns userMatched 满足条件的用户列表
 */
async function findUser (params = {}) {
  const {
    userQuery,
    authorizedApp = []
  } = params
  const condition = getUserQueryCondition(userQuery)
  if (condition.length === 0) {
    throw new Error('Invalid user query')
  }
  const authorizedAppType = getType(authorizedApp)
  if (authorizedAppType !== 'string' && authorizedAppType !== 'array') {
    throw new Error('Invalid authorized app')
  }

  let finalQuery

  if (condition.length === 1) {
    finalQuery = condition[0]
  } else {
    finalQuery = dbCmd.or(condition)
  }
  
  // 记录查询条件和结果
  const searchDetails = {
    query: userQuery,
    condition: condition,
    results: {}
  }
  
  // 执行查询
  const userQueryRes = await userCollection.where(finalQuery).get()
  console.log('查询条件:', JSON.stringify(finalQuery));
  console.log('查询结果:', JSON.stringify(userQueryRes.data));
  
  // 记录匹配结果
  searchDetails.results.total = userQueryRes.data.length;
  searchDetails.results.matched = userQueryRes.data.filter(item => {
    return isMatchUserApp(item.dcloud_appid, authorizedApp)
  }).length;
  
  // 添加额外查询 - 查询老系统users表
  try {
    const db = uniCloud.database();
    if (userQuery.mobile) {
      const usersResult = await db.collection('users')
        .where({ phoneNumber: userQuery.mobile })
        .get();
      searchDetails.results.usersTable = usersResult.data.length;
      console.log('旧users表查询结果:', JSON.stringify(usersResult.data));
    }
  } catch (err) {
    console.error('查询users表出错:', err);
    searchDetails.results.usersTableError = err.message;
  }
  
  // 结果
  const matchedUsers = userQueryRes.data.filter(item => {
    return isMatchUserApp(item.dcloud_appid, authorizedApp)
  });
  
  // 处理查询失败情况，添加详细信息
  if (matchedUsers.length === 0) {
    console.log('未找到匹配用户，详细信息:', JSON.stringify(searchDetails));
  }
  
  return {
    total: userQueryRes.data.length,
    userMatched: matchedUsers,
    searchDetails: searchDetails
  }
}

function getUserIdentifier (userRecord = {}) {
  const keys = Object.keys(USER_IDENTIFIER)
  return batchFindObjctValue(userRecord, keys)
}

function getUserQueryCondition (userRecord = {}) {
  const userIdentifier = getUserIdentifier(userRecord)
  const condition = []
  for (const key in userIdentifier) {
    const value = userIdentifier[key]
    if (!value) {
      // 过滤所有value为假值的条件，在查询用户时没有意义
      continue
    }
    const queryItem = {
      [key]: value
    }
    // 为兼容用户老数据用户名及邮箱需要同时查小写及原始大小写数据
    if (key === 'mobile') {
      // 对于手机号，我们需要更宽松的匹配
      if (typeof value === 'string') {
        // 如果是完整11位手机号，使用精确匹配并要求已确认
        if (/^1\d{10}$/.test(value)) {
          queryItem.mobile_confirmed = 1
        } 
        // 如果是数字但不是11位，可能是其他标识符
        else if (/^\d+$/.test(value)) {
          // 已经设置了queryItem.mobile，不需要额外处理
          delete queryItem.mobile_confirmed // 不要求已确认的手机号
        }
      }
    } else if (key === 'email') {
      // 对邮箱进行更严格的验证，确保包含@符号
      if (typeof value === 'string' && value.indexOf('@') > 0) {
        queryItem.email_confirmed = 1
        const email = userIdentifier.email
        if (email.toLowerCase() !== email) {
          condition.push({
            email: email.toLowerCase(),
            email_confirmed: 1
          })
        }
      } else {
        // 如果不满足邮箱格式，跳过此条件
        continue
      }
    } else if (key === 'username') {
      const username = userIdentifier.username
      // 用户名不应该是纯数字，如果是纯数字，可能是误用
      if (typeof username === 'string') {
        if (/^\d+$/.test(username) && username.length > 6) {
          // 如果是纯数字且较长，可能是手机号的误用，跳过此条件
          console.log('跳过纯数字用户名条件，可能是手机号:', username)
          continue
        }
        
        // 检查大小写
        if (username.toLowerCase() !== username) {
          condition.push({
            username: username.toLowerCase()
          })
        }
      }
    } else if (key === 'identities') {
      queryItem.identities = dbCmd.elemMatch(value)
    }
    condition.push(queryItem)
  }
  return condition
}

module.exports = {
  findUser,
  getUserIdentifier
}
