'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const locationCollection = db.collection('locations');
    
    // 清空原有数据
    if (event.clear) {
      await locationCollection.remove();
      console.log('已清空locations集合');
    }
    
    // 初始化校区数据
    const locationData = [
      {
        code: 'jnwd',
        name: '江宁万达校区',
        address: '南京市江宁区万达广场XX号',
        city: '南京市',
        district: '江宁区',
        latitude: 31.953,
        longitude: 118.829,
        phone: '025-12345678',
        intro: '于2020年建设，主要面向江宁区学生，提供全面的教学服务。',
        image: '/static/images/school/jnwd.png',
        status: 1
      },
      {
        code: 'jnhjhy',
        name: '江宁黄金海岸校区',
        address: '南京市江宁区黄金海岸XX街区XX号',
        city: '南京市',
        district: '江宁区',
        latitude: 31.941,
        longitude: 118.839,
        phone: '025-87654321',
        intro: '于2019年建设，环境优雅，设施完善，是学习的理想场所。',
        image: '/static/images/school/jnhjhy.png',
        status: 1
      },
      {
        code: 'dxg',
        name: '大行宫校区',
        address: '南京市秦淮区大行宫XX路XX号',
        city: '南京市',
        district: '秦淮区',
        latitude: 32.039,
        longitude: 118.781,
        phone: '025-23456789',
        intro: '于2018年建设，位于市中心，交通便利，师资力量雄厚。',
        image: '/static/images/school/dxg.png',
        status: 1
      },
      {
        code: 'xjk',
        name: '新街口校区',
        address: '南京市玄武区新街口XX街XX号',
        city: '南京市',
        district: '玄武区',
        latitude: 32.043,
        longitude: 118.784,
        phone: '025-34567890',
        intro: '于2017年建设，我校最早成立的校区之一，拥有丰富的教学经验。',
        image: '/static/images/school/xjk.png',
        status: 1
      },
      {
        code: 'yh',
        name: '雨花校区',
        address: '南京市雨花台区XX路XX号',
        city: '南京市',
        district: '雨花台区',
        latitude: 32.006,
        longitude: 118.78,
        phone: '025-45678901',
        intro: '于2020年建设，环境幽静，适合专注学习，课程设置丰富。',
        image: '/static/images/school/yh.png',
        status: 1
      },
      {
        code: 'qb',
        name: '桥北校区',
        address: '南京市桥北区XX街XX号',
        city: '南京市',
        district: '桥北区',
        latitude: 32.126,
        longitude: 118.746,
        phone: '025-56789012',
        intro: '于2021年建设，新兴校区，设施先进，师资优良。',
        image: '/static/images/school/qb.png',
        status: 1
      },
      {
        code: 'at',
        name: '奥体校区',
        address: '南京市建邺区奥体中心附近XX路XX号',
        city: '南京市',
        district: '建邺区',
        latitude: 32.005,
        longitude: 118.732,
        phone: '025-67890123',
        intro: '于2019年建设，位于奥体中心附近，环境优美，交通便利。',
        image: '/static/images/school/at.png',
        status: 1
      },
      {
        code: 'lj',
        name: '龙江校区',
        address: '南京市鼓楼区龙江XX路XX号',
        city: '南京市',
        district: '鼓楼区',
        latitude: 32.061,
        longitude: 118.759,
        phone: '025-78901234',
        intro: '于2020年建设，位于龙江地区，社区氛围浓厚，适合学生发展。',
        image: '/static/images/school/lj.png',
        status: 1
      },
      {
        code: 'lh',
        name: '六合校区',
        address: '南京市六合区XX广场XX号',
        city: '南京市',
        district: '六合区',
        latitude: 32.359,
        longitude: 118.838,
        phone: '025-89012345',
        intro: '于2021年建设，我校最新校区之一，设施完善，师资力量强大。',
        image: '/static/images/school/lh.png',
        status: 1
      }
    ];
    
    // 批量插入数据
    const result = await locationCollection.add(locationData);
    console.log('插入校区数据结果:', result);
    
    return {
      code: 0,
      success: true,
      message: '校区数据初始化成功',
      data: result
    };
  } catch (error) {
    console.error('校区数据初始化失败:', error);
    return {
      code: -1,
      success: false,
      message: '校区数据初始化失败: ' + error.message
    };
  }
}; 