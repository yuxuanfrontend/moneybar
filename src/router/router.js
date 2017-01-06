import home from '../pages/home'
import mainTab from '../pages/main-tab'

import dynamiTab from '../pages/dynamic/dynamic-tab'
import topicTab from '../pages/topic/topic-tab'
import topiclist from '../pages/topic/topic-list'
import topicdetails from '../pages/topic/topic-details'
import teamTab from '../pages/team/team-tab'
import teamdetails from '../pages/team/team-details'
import teamintro from '../pages/team/team-intro'
import dynamicdetails from '../pages/common/dynamic-details'
import report from '../pages/common/report'

import personal from '../pages/personal/personal'
import mypublish from '../pages/personal/my-publish'
import personalinfo from '../pages/personal/personal-info'
import myheard from '../pages/personal/my-heard'

import publish from '../pages/publish/publish'

module.exports = [
  {
    path: '/',
    component: home
  },

  {
    path: '/main-tab',
    component: mainTab,
    children: [
      {
        path: 'dynamic',
        name: '动态',
        component: dynamiTab
      },

      {
        path: 'topic',
        name: '话题',
        component: topicTab
      },

      {
        path: 'team',
        name: '小组',
        component: teamTab
      }
    ]
  },
  {
    path:'/dynamicdetails',
    name:'动态详情',
    component:dynamicdetails
  },
  {
    path:'/report',
    name:'举报',
    component:report
  },
  {
    path:'/topiclist',
    name:'话题列表',
    component:topiclist
  },

  {
    path:'/topicdetails',
    name:'话题详情',
    component:topicdetails
  },

  {
    path:'/teamdetails/:id',
    name:'小组详情',
    component:teamdetails
  },

  {
    path:'/teamintro',
    name:'小组介绍',
    component:teamintro
  },

  {
    path: '/personal',
    name: '个人中心',
    component: personal
  },

  {
    path:'/mypublish',
    name:'我的发表',
    component:mypublish
  },

  {
    path:'/personalinfo',
    name:'个人设置',
    component:personalinfo
  },

  {
    path:'/myheard',
    name:'我的消息',
    component:myheard
  },

  {
    path: '/publish',
    name: '发表',
    component: publish
  }

];
