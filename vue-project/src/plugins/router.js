import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '@/layouts/FrontLayout.vue'
import FrontHomeView from '@/views/front/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import FrontCartView from '@/views/front/CartView.vue'
import FrontFavoriteView from '@/views/front/FavoriteView.vue'
import FrontNewArrivalView from '@/views/front/NewArrivalView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: FrontHomeView,
          meta: {
            title: 'Sunday'
          }
        },
        {
          path: 'newArrival',
          name: 'newArrival',
          component: FrontNewArrivalView,
          meta: {
            title: 'Sunday | NewArrival'
          }
        },
        {
          path: 'newEarrings',
          name: 'newEarrings',
          component: () => import('@/views/front/NewEarrings.vue'),
          meta: {
            title: 'NewArrival | earrings'
          }
        },
        {
          path: 'newClipEarrings',
          name: 'newClipEarrings',
                    component: () => import('@/views/front/NewClipEarrings.vue'),
          meta: {
            title: 'NewArrival | clipEarrings'
          }
        },
                {
          path: 'newNecklace',
          name: 'newNecklace',
                    component: () => import('@/views/front/NewNecklace.vue'),
          meta: {
            title: 'NewArrival | clipEarrings'
          }
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: FrontFavoriteView,
          meta: {
            title: 'Favorite'
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/front/CartView.vue'),
          meta: {
            title: 'Cart',
            login: true,
            admin: false
          }
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/front/OrdersView.vue'),
          meta: {
            title: 'orders',
            login: true,
            admin: false
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/front/RegisterView.vue'),
          meta: {
            title: 'Sunday | 註冊'
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/front/LoginView.vue'),
          meta: {
            title: 'Sunday | 登入'
          }
        },
        {
          path: 'products/:id',
          name: 'product',
          component: () => import('@/views/front/ProductView.vue'),
          meta: {
            title: 'Sunday | NewArrival',
            login: false,
            admin: false
          }
        },
        {
          path: 'customizedGift/:id',
          name: 'customizedGift',
          component: () => import('@/views/front/CustomizedGiftView.vue'),
          meta: {
            title: 'customizedGift',
            login: false,
            admin: false
          }
        },
        {
          path: 'customizedInfo',
          name: 'customizedInfo',
          component: () => import('@/views/front/CustomizedInfoView.vue'),
          meta: {
            title: 'customizedInfo',
            login: false,
            admin: false
          }
        },
        {
          path: 'MarketInfo',
          name: 'MarketInfo',
          component: () => import('@/views/front/MarketInfoView.vue'),
          meta: {
            title: 'MarketInfo',
            login: false,
            admin: false
          }
        },
        {
          path: 'CourseInfo',
          name: 'CourseInfo',
          component: () => import('@/views/front/CourseInfoView.vue'),
          meta: {
            title: 'CourseInfo',
            login: false,
            admin: false
          }
        },
        {
          path: 'adminHome',
          name: 'adminHome',
          component: () => import('@/views/admin/HomeView.vue'),
          meta: {
            title: '購物網 | 管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'adminMember',
          name: 'adminMember',
          component: () => import('@/views/admin/MemberView.vue'),
          meta: {
            title: '購物網 | 會員管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'adminProducts',
          name: 'adminProducts',
          component: () => import('@/views/admin/ProductsView.vue'),
          meta: {
            title: '購物網 | 商品管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'adminOrders',
          name: 'adminOrders',
          component: () => import('@/views/admin/OrdersView.vue'),
          meta: {
            title: '購物網 | 訂單管理',
            login: true,
            admin: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'Sunday | 404',
        login: false,
        admin: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'all',
      redirect: '/404'
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  if (user.isLogin && (to.path === '/register' || to.path === '/login')) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})
export default router
