<template>
  <!-- <div class="CartContain">
    <h1>My Orders</h1>
    <n-table>
      <thead>
        <tr>
          <th>會員</th>
          <th>訂單單號</th>
          <th>日期</th>
          <th>商品</th>
          <th>金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.u_id.account }}</td>
          <td>{{ order._id }}</td>
          <td>
            {{ new Date(order.date).toLocaleDateString() }}
          </td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.totalPrice }}</td>
        </tr>
      </tbody>
    </n-table>
  </div> -->
  <div class="OrderAdContain">
    <h1 style="margin-left: 20px">Orders</h1>
    <n-table>
      <thead>
        <tr>
          <th>訂單日期</th>
          <th>會員帳號</th>
          <th>訂單內容</th>
          <th>訂單金額</th>
          <th>付款狀態</th>
          <th>出貨狀態</th>
          <th>取消訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>
            {{ new Date(order.date).toLocaleDateString() }}
          </td>
          <td>{{ order.u_id.account }}</td>

          <td style="width: 35%">
            <n-collapse arrow-placement="right">
              <p style="text-align: left">訂單單號: {{ order._id }}</p>
              <n-collapse-item title="Order List" style="text-align: left; border-top: none; padding: 0">
                <div v-for="product in order.products" :key="product._id">
                  <n-tbody bordered="false">
                    <tr>
                      <n-image :src="product.p_id.image[0]" :width="30" :height="30" object-fit="cover" />
                      <a :href="'#' + '/products/' + product.p_id._id">{{ product.p_id.name + ' x ' + product.quantity + '件' }}</a>
                    </tr>
                  </n-tbody>
                </div>
              </n-collapse-item>
            </n-collapse>
          </td>
          <td>{{ order.totalPrice }} 元</td>
          <td>
            <n-button text type="primary">
              <n-icon size="22"><checkIcon /></n-icon>
              <p>已付款</p>
            </n-button>
          </td>
          <td>
            <n-button text>
              <!-- <n-icon size="22"><checkIcon /></n-icon> -->
              <p>備貨中</p>
            </n-button>
          </td>
          <td>
            <n-button text>
              <n-icon size="22"><closeIcon /></n-icon>
            </n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { CheckmarkSharp as checkIcon, TrashBinOutline as closeIcon, ReaderOutline as readerIcon } from '@vicons/ionicons5'

const orders = reactive([])

;(async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.push(
      ...data.result.map(order => {
        order.totalPrice = order.products.reduce((total, current) => total + current.p_id.price * current.quantity, 0)
        return order
      })
    )
  } catch (error) {
    message.error('取得訂單失敗')
  }
})()
</script>

<style lang="scss">
.OrderAdContain {
  h1,
  h2 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  // h3,
  // h4,
  // h5 {
  //   font-family: 'Noto Sans TC', sans-serif;
  //   color: #523a24;
  // }
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
    margin-bottom: 10vh;
    .n-collapse {
      width: 100%;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
  .n-collapse .n-collapse-item .n-collapse-item__header {
    padding: 0;
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
