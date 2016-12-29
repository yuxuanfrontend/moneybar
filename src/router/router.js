// const fooPath = components'/foo'
import mainTab from '../pages/main-tab'
import dynamiTab from '../pages/dynamic/dynamic-tab'
import topicTab from '../pages/topic/topic-tab'
import topiclist from '../pages/topic/topic-list'
import teamTab from '../pages/team/team-tab'
import teamdetails from '../pages/team/teamdetails'
// import foo from fooPath
// import bar from '../components/bar'
// import quotation from '../components/quotation'
// import applyGoods from '../components/applyGoods'
// import transfer from '../components/transfer'
// import personal from '../components/personal'

// import login from '../pages/identity/login'
// import register from '../pages/identity/register'
// import registerStep1 from '../pages/identity/register-step1'
// import registerStep2 from '../pages/identity/register-step2'
//
// import mainView from '../pages/main-view'
// import quotationList from '../pages/quotation/quotation-list'
//
// import quotation from '../pages/quotation/quotation-highstock'


module.exports = [
  {
    path: '/',
    component: mainTab,
    children: [
      {
        path: 'dynamic',
        component: dynamiTab
      },

      {
        path: '/topic',
        component: topicTab
      },

      {
        path: '/team',
        component: teamTab
      }
    ]
  },
  {
    path:'/topiclist',
    component:topiclist
  },
  {
    path:'/teamdetails',
    component:teamdetails
  }

];
