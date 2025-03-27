import Vue from 'vue'

// 空数据提示组件
import EmptyTip from './empty-tip/empty-tip.vue'
Vue.component('empty-tip', EmptyTip)

// 加载更多组件
import LoadMore from './load-more/load-more.vue'
Vue.component('load-more', LoadMore)

// 课程卡片组件
import CourseCard from './course-card/course-card.vue'
Vue.component('course-card', CourseCard)

// 预约项目组件
import BookingItem from './booking-item/booking-item.vue'
Vue.component('booking-item', BookingItem)

// 教师卡片组件
import TeacherCard from './teacher-card/teacher-card.vue'
Vue.component('teacher-card', TeacherCard)

// 收藏按钮组件
import FavoriteButton from './favorite-button/favorite-button.vue'
Vue.component('favorite-button', FavoriteButton) 