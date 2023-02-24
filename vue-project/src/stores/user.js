import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from '../plugins/axios'
import router from '../plugins/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const email = ref('')
    const cart = ref(0)
    const role = ref(0)

    const isLogin = computed(() => {
      return token.value.length > 0
    })
    const isAdmin = computed(() => {
      return role.value === 1
    })
    const avatar = computed(() => {
      // 登入後的頭像
      return `https://source.boringavatars.com/beam/80/ZoraNeale%20${account.value}colors=ED7B83,EC8A90,EBA2A4,E6D1CA,EEE9C7`
    })

    const login = async form => {
      // 用 setup 的語法去寫 pinia 的 store
      try {
        const { data } = await api.post('/users/login', form)
        token.value = data.result.token
        account.value = data.result.account
        email.value = data.result.email
        cart.value = data.result.cart
        role.value = data.result.role
        router.go(0)
        router.push('/')
      } catch (error) {
        return error?.response?.data?.message || '發生錯誤'
      }
    }

    const logout = async () => {
      try {
        await apiAuth.delete('/users/logout')
        token.value = ''
        account.value = ''
        role.value = 0
        cart.value = 0
        router.go(0)
      } catch (error) {
        return error?.response?.data?.message || '發生錯誤'
      }
    }

    // 用 JWT 去換使用者的資料
    const getUser = async () => {
      if (token.value.length === 0) return
      try {
        // 呼叫 apiAuth.get 會進到請求的攔截器 ( 呼叫 axios 的攔截器 )
        const { data } = await apiAuth.get('/users/me')
        account.value = data.result.account
        email.value = data.result.email
        cart.value = data.result.cart
        role.value = data.result.role
      } catch (error) {
        logout()
      }
    }

    const editCart = async ({ _id, quantity }) => {
      // 先確定有登入
      if (token.value.length === 0) {
        router.push('/login')
        return
      }
      try {
        // 更新購物車 不用驗證數量直接把東西傳進去就好了
        const { data } = await apiAuth.post('/users/cart', { p_id: _id, quantity: parseInt(quantity) })
        // 後端 controller 回傳的是商品的數量 以下是直接把商品換掉 換成 data 的 result: req.user.cart.reduce((total, current) => total + current.quantity, 0) }
        cart.value = data.result
      } catch (error) {
        return error?.response?.data?.message || '發生錯誤'
      }
    }

    const checkout = async () => {
      try {
        await apiAuth.post('/orders')
        cart.value = 0
      } catch (error) {
        return error?.response?.data?.message || '發生錯誤'
      }
    }

    return {
      token,
      account,
      email,
      cart,
      role,
      login,
      logout,
      getUser,
      isLogin,
      isAdmin,
      avatar,
      editCart,
      checkout
    }
  },
  {
    persist: {
      key: 'Sunday',
      paths: ['token']
    }
  }
)
