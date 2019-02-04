import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/setPage/:id',
      name: 'set-page',
      component: require('@/components/SetPage/SetPage').default,
      children: [
        {path: "card/:cardID", component: require('@/components/SetPage/CardDetailsPanel').default}
      ]
    },
    {
      path: "/studyPage/:setID",
      name: "study-page",
      component: require('@/components/StudyPage/StudyPage').default,
    },
    {
      path: '/routeTest/:id',
      name: 'route-tester',
      component: require('@/components/RouteTester').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
