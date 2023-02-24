<template>
  <n-card>
    <template #cover>
      <n-image :src="image[0]" object-fit="cover"></n-image>
    </template>

    <router-link :to="'/products/' + _id">
      <span class="productName">
        {{ name }}
      </span>
      <br />
      <span>NT.{{ price }}</span>
    </router-link>
    <br />
    <div class="NAIcon">
      <n-button text>
        <n-icon size="18"><LoveIcon /></n-icon>
      </n-button>
      <n-button text>
        <!-- 點擊的時候 執行 editCart 把卡片的商品 _id 跟 quantity:1 傳進去 function 裡面 然後再把 function 寫到 user 的 store 裡面 -->
        <!-- 因為編輯購物車 數量會更新 寫在 store 內由 store 統一管理 因為store 也有紀錄購物車數量 -->
        <n-icon size="18" @click="editCart({ _id, quantity: 1 })"><CartIcon /></n-icon>
      </n-button>
    </div>
  </n-card>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { FlowerOutline as flowerIcon, HeartOutline as LoveIcon, CartOutline as CartIcon } from '@vicons/ionicons5'
import { useUserStore } from '@/stores/user'

defineProps({
  _id: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  Sell: { type: Boolean, default: false },
  category: { type: String, default: '' }
})

// 寫在使用者這需要做的
// useUserStore 之後 把 editCart 解構出來
const user = useUserStore()
const { editCart } = user
</script>

<style lang="scss">
.n-card {
  margin: auto;
  display: flex;
  height: 480px;
  width: 90%;
  padding: 0;
  background: none;
  text-align: left;
  .n-card__content {
    width: 100%;
    display: flex;
    padding: 0;
    a {
      width: 80%;
      color: black;
      text-decoration: none;
    }
  }
  .productName {
    font-weight: 600;
  }
  .n-image {
    width: 100%;
    height: 350px;
  }
  .NAIcon {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    .n-icon {
      padding: 5px;
    }
  }
}
</style>
