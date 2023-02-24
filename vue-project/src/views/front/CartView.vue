<template>
  <div class="CartContain">
    <h1 style="margin-left: 20px">My Cart</h1>

    <n-table>
      <thead>
        <tr>
          <th>分類</th>
          <th>名稱</th>
          <th>商品圖片</th>
          <th></th>
          <th>購買數量</th>
          <th></th>
          <th>價錢</th>
          <th>小計</th>
          <th>移除商品</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in cart" :key="product._id">
          <td>{{ product.p_id.category[0] }}</td>
          <td>
            <a :href="'#' + '/products/' + product.p_id._id">{{ product.p_id.name }}</a>
            <h5 v-if="product.p_id.sell === false">此款已下架</h5>
          </td>
          <td :aspect-ratio="1" :width="150">
            <n-image :src="product.p_id.image[0]" :width="100" :height="100" object-fit="cover"></n-image>
          </td>
          <td>
            <n-button text @click="updateCart(idx, -1)">
              <n-icon size="22"><removeIcon /></n-icon>
            </n-button>
          </td>
          <td>
            {{ product.quantity }}
            <h5 v-if="product.p_id.quantity === 1">最後{{ product.p_id.quantity }}件</h5>
          </td>
          <td>
            <n-button text @click="updateCart(idx, 1)">
              <n-icon size="22"><AddIcon /></n-icon>
            </n-button>
          </td>
          <td>{{ product.p_id.price }}</td>
          <td>{{ product.quantity * product.p_id.price }}</td>
          <td>
            <n-button text @click="updateCart(idx, product.quantity * -1)">
              <n-icon size="22"><TrashIcon /></n-icon>
            </n-button>
          </td>
        </tr>
        <tr v-if="cart.length === 0">
          <h5>沒有商品</h5>
        </tr>
      </tbody>
    </n-table>
    <div class="totalPrice">
      <h3>總金額　</h3>
      <h2>NT. {{ totalPrice }}</h2>
    </div>
    <div class="totalPrice">
      <n-button round @click="onCheckoutBtnClick" color="#CA9E" size="large" :disabled="!canCheckout">結帳 Order</n-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { AddCircleOutline as AddIcon, RemoveCircleOutline as removeIcon, TrashOutline as TrashIcon } from '@vicons/ionicons5'

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
  } else if (cart[idx].quantity > cart[idx].p_id.quantity) {
    message.error(`目前商品數量為 ${cart[idx].p_id.quantity} 件`)
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
.CartContain {
  margin: auto;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  // justify-content: flex-end;
  // margin-top: 5vh;
  h1 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  // h2,
  // h3,
  // h4,
  // h5 {
  //   font-family: 'Noto Sans TC', sans-serif;
  //   color: #523a24;
  // }
  .topBtn {
    margin: 20px 20px 20px 20px;
  }

  .n-table {
    width: 100%;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
    h5 {
      margin: 0;
      color: red;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
  .totalPrice {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-right: 20px;
    .n-button {
      margin-left: 20px;
      margin-bottom: 10vh;
    }
    h1,
    h3 {
      align-self: flex-end;
    }
  }
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
