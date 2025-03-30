# 更新课程教师ID云函数

这个云函数用于更新课程表(`courses`)中的`teacherId`字段，将其关联到教师表(`teachers`)中的`_id`字段。

## 功能说明

该云函数提供三种更新模式：

1. **单课程直接更新**：提供课程ID和教师ID，直接更新指定课程的教师ID
2. **单课程按名称更新**：提供课程ID和教师名称，查找对应的教师ID并更新
3. **批量更新**：不提供任何参数，自动查找所有有`teacherName`但没有`teacherId`的课程，尝试匹配并更新

## 使用方法

### 1. 单课程直接更新

```javascript
// 示例：直接更新课程的教师ID
const result = await uniCloud.callFunction({
  name: 'updateCourseTeacher',
  data: {
    courseId: '课程ID',
    teacherId: '教师ID'
  }
});
```

### 2. 单课程按名称更新

```javascript
// 示例：根据教师名称更新课程的教师ID
const result = await uniCloud.callFunction({
  name: 'updateCourseTeacher',
  data: {
    courseId: '课程ID',
    teacherName: '张老师'
  }
});
```

### 3. 批量更新

```javascript
// 示例：批量更新所有未设置teacherId但有teacherName的课程
const result = await uniCloud.callFunction({
  name: 'updateCourseTeacher',
  data: {}
});
```

## 返回结果

成功时返回：

```json
{
  "code": 0,
  "success": true,
  "data": {
    // 具体更新结果
  },
  "message": "更新课程教师ID成功"
}
```

失败时返回：

```json
{
  "code": -1,
  "success": false,
  "message": "错误信息"
}
```

## 批量更新结果示例

批量更新时，会返回详细的更新结果：

```json
{
  "code": 0,
  "success": true,
  "data": {
    "total": 5,       // 总共需要更新的课程数
    "success": 3,     // 成功更新的课程数
    "failed": 2,      // 更新失败的课程数
    "results": [      // 详细的更新结果
      {
        "courseId": "课程ID",
        "title": "课程标题",
        "teacherName": "张老师",
        "teacherId": "教师ID",
        "success": true
      },
      // ...更多结果
    ]
  },
  "message": "成功更新 3 个课程的教师ID"
}
``` 