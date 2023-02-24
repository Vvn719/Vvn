<template>
  <div class="LoveContain">
    <h1 style="margin-left: 20px">My Favorite</h1>
    <n-table>
      <thead>
        <tr>
          <th>商品圖片</th>
          <th>名稱</th>
          <th>價錢</th>
          <th>數量</th>
          <th>小計</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in products" :key="product._id">
          <td>{{ product.category[0] }}</td>
          <td :aspect-ratio="1" :width="150">
            <n-image :src="product.image[0]" :width="100" :height="100" object-fit="cover"></n-image>
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.sell === true ? '上架' : '下架' }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-button text></n-button>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const message = useMessage()
const router = useRouter()

const user = useUserStore()
const { editCart, checkout } = user

const cart = reactive([])

const updateCart = async (idx, quantity) => {
  await editCart({ _id: cart[idx].p_id._id, quantity })
  cart[idx].quantity += quantity
  if (cart[idx].quantity <= 0) {
    cart.splice(idx, 1)
  }
}

const onCheckoutBtnClick = async () => {
  await checkout()
  router.push('/orders')
}

const totalPrice = computed(() => {
  return cart.reduce((total, current) => {
    return total + current.p_id.price * current.quantity
  }, 0)
})

const canCheckout = computed(() => {
  return (
    cart.length > 0 &&
    !cart.some(product => {
      return !product.p_id.sell
    })
  )
})

;(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.push(...data.result)
  } catch (error) {
    message.error('取得購物車失敗')
  }
})()
</script>

<style lang="scss">
.LoveContain {
  h1,
  h2 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  margin: auto;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  // justify-content: flex-end;
  // margin-top: 5vh;

  .topBtn {
    margin: 20px 20px 20px 20px;
  }

  .n-table {
    width: 100%;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
