import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
      path: '/',
      name: 'welcome',
      component: resolve => require(['../components/welcome'], resolve),
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['../../views/home'], resolve),
        },
         {
          path: '/videosCourse',
          name: 'videosCourse',
          component: resolve => require(['../../views/videoCourse'], resolve),
        },
        {
          path: '/message',
          name: 'message',
          component: resolve => require(['../../views/message'], resolve),
        },
        {
          path: '/diary',
          name: 'diary',
          component: resolve => require(['../../views/diary'], resolve),
        },
        {
          path: '/video',
          name: 'video',
          component: resolve => require(['../../views/lifeVideo'], resolve),
        },
        {
          path: '/album',
          name: '相册',
          component: resolve => require(['../../views/album'], resolve),
        },
        {
          path: '/pIntroduction',
          name: '个人简介',
          component: resolve => require(['../../views/pIntroduction'], resolve),
        },
        {
          path: '/myCenter',
          name: '个人中心',
          component: resolve => require(['../../views/myCenter'], resolve),
        },
        {
          path: '/person',
          name: '编辑',
          component: resolve => require(['../../views/person'], resolve),
        },
        {
          path: '/editBlog/:blogId/edit',
          name: 'editBlog',
          component: resolve => require(['../../views/editBlog'], resolve),
        },
        {
          path: '/blogList',
          name: 'blogList',
          component: resolve => require(['../../views/blogs'], resolve)
        },
        {
          path: '/blogDetail/:blogId',
          name: 'blogDetail',
          component: resolve => require(['../../views/blogDetail'], resolve)
        },
        {
          path: '/blog/add',
          name: 'addBlog',
          component: resolve => require(['../../views/editBlog'], resolve)
        },
        {
          path: '/video/:videoId',
          name: 'videoDetail',
          component: resolve => require(['../../views/videoDetail'], resolve)
        },

        {
          path: '/MyResume',
          name: 'MyResume',
          component: resolve => require(['../../views/MyResume'], resolve),
        }, 
        {
          path: '/qqlogincalback',
          name: 'qq登录回调',
          component: resolve => require(['../../views/QqLoginCallback'], resolve),
        },
      ]
    },

  {
      path: '/send',
      name: 'send',
      component: resolve => require(['../../views/myInput'], resolve),
  },

  {
      path: '/login',
      name: 'login',
      component: resolve => require(['../../views/login'], resolve),
  },

  {
      path: '/register',
      name: 'register',
      component: resolve => require(['../../views/register'], resolve),
  }
]

const router =  new Router({
  mode:'history',
  routes
})



export default router
