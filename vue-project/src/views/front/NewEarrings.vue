<template>
  <div class="NAcontain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
    <div class="NAcontent" v-for="product in products" :key="product._id">
      <ProductCard v-bind="product" />
    </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { apiAuth } from '@/plugins/axios'
import { FlowerOutline as flowerIcon, HeartOutline as LoveIcon, CartOutline as CartIcon } from '@vicons/ionicons5'
import ProductCard from '../../components/ProductCard.vue'

const products = reactive([])

;(async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
  } catch (error) {
    message.error(error?.response?.data?.message || '發生錯誤')
  }
})()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref(null)

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'newArrival'
          }
        },
        { default: () => 'NewArrival　｜' }
      ),
    key: 'NewArrival',
    icon: renderIcon(flowerIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'newEarrings'
          }
        },
        { default: () => '耳針系列' }
      ),
    key: 'earrings'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'newArrival'
          }
        },
        { default: () => '耳夾系列' }
      ),
    key: 'clipEarrings'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'newArrival'
          }
        },
        { default: () => '口罩鍊系列' }
      ),
    key: 'necklace'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'customizedInfo'
          }
        },
        { default: () => '客製服務' }
      ),
    key: 'customizedInfo'
  }
]
</script>

<style lang="scss">
// 	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px
.NAcontain {
  width: 75vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .NAcontent {
    width: 25%;
    height: 480px;
    display: flex;
    .n-card {
      margin: auto;
      display: flex;
      height: 480px;
      width: 90%;
      padding: 0;
      background: none;
      text-align: left;
      .n-card__content {
        padding: 0;
      }
      .productName {
        font-weight: 600;
      }
      .n-image {
        width: 100%;
        height: 350px;
      }
      .NAIcon {
        display: flex;
        justify-content: end;
        .n-icon {
          padding: 5px;
        }
      }
    }
  }

  @media (max-width: 1400px) {
    .NAcontent {
      width: 30%;
      height: 380px;
      display: flex;
      margin: auto;
      .n-card {
        margin: auto;
        display: flex;
        height: 400px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .productName {
          font-weight: 600;
        }
        .n-image {
          width: 100%;
          height: 250px;
        }
        .NAIcon {
          display: flex;
          justify-content: end;
          .n-icon {
            padding: 5px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }

  @media (max-width: 992px) {
    .NAcontent {
      width: 50%;
      height: 480px;
      display: flex;
      margin: auto;
      .n-card {
        margin: auto;
        display: flex;
        height: 450px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .productName {
          font-weight: 600;
        }
        .n-image {
          width: 100%;
          height: 350px;
        }
        .NAIcon {
          display: flex;
          justify-content: end;
          .n-icon {
            padding: 5px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }

  @media (max-width: 576px) {
    .NAcontent {
      width: 100%;
      height: 520px;
      display: flex;
      margin: auto;
      .n-card {
        margin: auto;
        display: flex;
        height: 460px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .productName {
          font-weight: 600;
        }
        .n-image {
          width: 100%;
          height: 420px;
        }
        .NAIcon {
          display: flex;
          justify-content: end;
          .n-icon {
            padding: 5px;
          }
        }
      }
    }
  }
  transition-duration: 0.5s;
}
</style>
