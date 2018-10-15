import Vue from 'vue'
import Router from 'vue-router'

import mlogin from '@/pages/mlogin' //登录页面
import mindex from '@/pages/mindex' //主页
import mindexBook from '@/pages/mindex_book'
import mindexBasic from '@/pages/mindex_basic' //会议室预定信息填写

import mreview from '@/pages/mreview' //评论
import morderContentBase from '@/pages/morderContent_base' //订单基础信息
import morderContentSupply from '@/pages/morderContent_supply' //订单细节信息

import mindexlistmember from '@/pages/mindex_list-member' //普通用户列表
import mindexlistapprove from '@/pages/mindex_list-approve' //主管列表
import mindexlistservice from '@/pages/mindex_list-service' //服务列表

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mlogin',
      name: 'mlogin',
      component: mlogin
    },
    {
      path: '/mindex',
      name: 'mindex',
      component: mindex,
      meta:{keepAlive:true}
    },
    {
      path: '/mindex/mindexBook',
      name: 'mindexBook',
      component: mindexBook,
      meta:{keepAlive:true},
    },
    {
      path: '/mindex/mindexBook/mindexBasic',
      name: 'mindexBasic',
      component: mindexBasic,
    },
    {
      path: '/mreview',
      name: 'mreview',
      component: mreview
    },
    {
      path: '/memberlist/morderContent/base',
      name: 'morderContentBase',
      component: morderContentBase,
      meta:{keepAlive:true},
    },
    {
      path: '/memberlist/morderContent/base/supply',
      name: 'morderContentSupply',
      component: morderContentSupply
    },{
      path: '/mindexlist/member',
      name: 'mindexlistmember',
      component: mindexlistmember,
      meta:{keepAlive:true}
    },{
      path: '/mindexlist/approve',
      name: 'mindexlistapprove',
      component: mindexlistapprove,
      meta:{keepAlive:true}
    },{
      path: '/mindexlist/service',
      name: 'mindexlistservice',
      component: mindexlistservice,
      meta:{keepAlive:true}
    }
  ]
})
