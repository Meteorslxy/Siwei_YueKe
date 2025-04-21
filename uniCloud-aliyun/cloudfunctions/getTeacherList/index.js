'use strict';
const db = uniCloud.database();

/**
 * 判断筛选值是否有效（不是'all'且不为空）
 * @param {String} value - 筛选值
 * @returns {Boolean} 是否为有效的筛选值
 */
function isValidFilterValue(value) {
    return value && value !== 'all';
}

/**
 * 获取教师列表
 * 注意: 查询参数与值应该与项目根目录下的 static/data/filter-options.json 文件中定义的一致
 * 
 * @param {Object} event - 请求参数
 * @param {Number} event.page - 页码，默认1
 * @param {Number} event.pageSize - 每页数量，默认10
 * @param {String} event.keyword - 搜索关键词，可选
 * @param {String} event.subject - 科目，可选，中文表示（如"数学"、"语文"），需匹配 filter-options.json 中的 subjectOptions
 * @param {String} event.grade - 年级，可选，中文表示（如"小学"、"初中"），需匹配 filter-options.json 中的 gradeOptions
 * @param {String} event.school - 校区，可选，中文表示（如"江宁万达"、"新街口"），需匹配 filter-options.json 中的 schoolOptions
 * @param {Array} event.names - 教师名称数组，用于批量查询，可选
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
    const {
        page = 1,
            pageSize = 10,
            keyword = '',
            subject = '',
            grade = '',
            school = '',
            names = []
    } = event;

    try {
        console.log('获取教师列表，参数:', event);

        // 构建查询条件
        const query = {};

        // 通过名称数组批量查询（优先于关键词搜索）
        if (Array.isArray(names) && names.length > 0) {
            query.name = {
                $in: names // 使用 $in 操作符匹配名称数组中的任意一个
            };
            console.log('根据教师名称数组查询:', names);
        }
        // 如果没有指定名称数组，才使用关键词搜索
        else if (keyword) {
            query.name = new RegExp(keyword, 'i'); // 使用正则进行模糊搜索
            console.log('根据关键词查询:', keyword);
        }

        // 按学科筛选（直接使用中文）
        // "all" 或空字符串表示不筛选
        if (isValidFilterValue(subject)) {
            query.subject = subject;
        }

        // 按年级筛选（直接使用中文）
        // "all" 或空字符串表示不筛选
        if (isValidFilterValue(grade)) {
            query.grade = grade;
        }

        // 按校区筛选（直接使用中文）
        // "all" 或空字符串表示不筛选
        if (isValidFilterValue(school)) {
            query.school = school;
        }

        console.log('查询条件:', query);

        // 查询总数
        const countResult = await db.collection('teachers').where(query).count();
        const total = countResult.total;

        // 分页查询
        const list = await db.collection('teachers')
            .where(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .get();

        return {
            code: 0,
            data: list.data,
            total,
            page: Number(page),
            pageSize: Number(pageSize),
            totalPages: Math.ceil(total / pageSize)
        };
    } catch (err) {
        console.error('获取教师列表错误:', err);
        return {
            code: -1,
            message: '获取教师列表失败: ' + err.message
        };
    }
};