<template>
  <div class="PDcontain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>

    <div class="PDcontent">
      <div class="PDimg">
        <img :src="product.image[0]" />
        <img :src="product.image[1]" />
        <img :src="product.image[2]" />
        <img :src="product.image[3]" />
      </div>
      <div class="PDinfo">
        <h2>{{ product.name }}</h2>
        <h3>NT.{{ product.price }}</h3>
        <hr />
        <br />
        <n-button class="colorBtn" color="#F4BBBB"></n-button>
        <n-button class="colorBtn" color="#D78562"></n-button>
        <br />
        <pre>{{ product.description }}</pre>
        <p>目前商品 {{ product.quantity - form.quantity }} 個</p>
        <br />
        <!-- <n-select :options="options" placeholder=" 耳針款式選擇" /> -->
        <div class="PDcart">
          <n-form ref="valid" :model="form" :rules="rules" @submit.prevent="submit">
            <n-form-item path="quantity">
              <n-input-number
                v-model:value="form.quantity"
                type="number"
                placeholder=" 0 "
                button-placement="both"
                class="cartBtnA"
                @keydown.enter.prevent
                :min="0"
                :max="product.quantity"></n-input-number>
            </n-form-item>
          </n-form>
          <n-button class="cartBtn" color="#A45754ED" attr-type="submit" @click="submit">加入購物車</n-button>
          <router-link :to="'/customizedGift/' + product._id"><n-button color="#CA9E" class="cartBtn2">客製化禮物</n-button></router-link>
          <!-- <n-button color="#CA9E" class="cartBtn"><router-link :to="'/customizedGift/' + _id" class="router">客製化禮物</router-link></n-button> -->
        </div>
        <!-- <n-button class="cusBtn" color="#CA9E">
          客製
          <br />
          禮物
        </n-button> -->
        <div class="PDtext">
          <h4>Sunday下單注意事項</h4>
          *基於衛生條件耳飾商品售出不予退換
          <br />
          *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
          <br />
          *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
          <br />
          *手工製作商品，皆為下單後開始製作，依不同的款式製作天數有所不同，約需3-5個工作天，願意等待的你請下標。

          <!-- <h4>Sunday 樹脂商品保養需知</h4>

          *耳針(耳夾)材質為銅鍍K金，避免泡溫泉時配戴減低褪色情況發生。
          <br />
          *樹脂(UV膠)為銅線手工塑型，未配戴時請收入盒內保持乾燥避免用力擠壓。
          <br />
          *勿用含酒精物品擦拭樹脂(UV膠)主體，請以乾淨的布沾清水(推薦使用眼鏡布)輕擦即可。
          <br />
          *勿放置在高溫處或是任何會排放出熱氣的電器旁，已防止樹脂(UV膠)產生黏性。
          <br />
          *鍍金屬長久暴露於空氣或因長久配戴配而造成的反黑為正常現象，正常的配戴下，光澤度可維持6個月~8個月左右 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import validator from 'validator'
import { NIcon } from 'naive-ui'
import { FlowerOutline as flowerIcon, HeartOutline as LoveIcon, CartOutline as CartIcon, Images } from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const message = useMessage()
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
            name: 'newArrival'
          }
        },
        { default: () => '客製禮物' }
      ),
    key: 'customizedGift'
  }
]

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editCart } = user

const valid = ref(null)

const form = reactive({
  quantity: 0
})

const rules = {
  quantity: [
    {
      required: true,
      type: 'number',
      validator: validateQuantity,
      trigger: ['blur', 'input'],
      message: '選購數量不可大於庫存'
    }
  ]
}

function validateQuantity(rule, value) {
  if (value < 0) {
    return new Error('數量需 > 0')
  }
  return product.quantity >= value
}

const product = reactive({
  _id: '',
  name: '',
  description: '',
  price: 0,
  // quantity: 0,
  image: '',
  sell: true,
  category: ''
})

const submit = () => {
  valid.value?.validate(errors => {
    if (!errors) {
      editCart({ _id: product._id, quantity: form.quantity })
      message.success(`${form.quantity}件商品已加入購物車`)
    } else {
      message.error('選購數量不得 小於 0 或 大於庫存')
    }
  })
}

;(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.description = data.result.description
    product.image = data.result.image
    product.price = data.result.price
    product.quantity = data.result.quantity
    product.sell = data.result.sell
    product.category = data.result.category

    // 使用者看到的頁面標題改變
    document.title = 'NewArrival | ' + product.name
    // document.querySelector('meta[property="og:title"]').setAttribute('content', product.name)
  } catch (error) {
    message.error(error?.response?.data?.message || '無此商品')
    // 失敗的話丟回首頁
    router.go(-1)
  }
})()
</script>

<style lang="scss">
// 	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px
.PDcontain {
  h2,
  h1 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  // h3,
  // h4,
  // h5 {
  //   font-family: 'Noto Sans TC', sans-serif;
  //   color: #523a24;
  // }
  // p {
  //   font-family: 'Noto Sans TC', sans-serif;
  // }
  width: 75vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .PDcontent {
    width: 75vw;
    display: flex;
    justify-content: space-between;
    .PDimg {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      padding: 50px;
      justify-content: space-between;
      img {
        width: 100%;
        height: 700px;
        margin-top: 5%;
        display: flex;
        margin-bottom: 0px;
        object-fit: cover;
      }
      img:nth-child(2),
      img:nth-child(3),
      img:nth-child(4) {
        width: 30%;
        height: 220px;
        object-fit: cover;
      }
    }
    .PDinfo {
      width: 50%;
      text-align: left;
      padding: 80px 50px 50px 50px;
      h4 {
        margin: 10px;
      }
      .PDtext {
        display: block;
        position: relative;
        top: 200px;
      }
      .PDcart {
        display: flex;
        width: 100%;
        .cartBtn {
          text-align: center;
          width: 30%;
          margin: 25px 10px 0 10px;
        }
        a {
          display: block;
          width: 100%;
          height: 34px;
          text-decoration: none;
          .cartBtn2 {
            width: 100%;
            margin: 25px 10px 0 10px;
          }
        }
        .n-form {
          width: 100%;
          text-align: center;
          margin-right: 10px;
        }
      }
    }
  }
  // .cusBtn {
  //   width: 80px;
  //   height: 80px;
  //   border-radius: 500px;
  //   font-size: 1rem;
  // }
  .colorBtn {
    width: 30px;
    height: 30px;
    margin: 10px;
  }
}
@media (max-width: 1600px) {
  .PDcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .PDcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      .PDimg {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        img {
          width: 100%;
          height: 600px;
          margin-top: 30px;
          display: flex;
          margin-bottom: 0px;
          object-fit: cover;
        }
        img:nth-child(2),
        img:nth-child(3),
        img:nth-child(4) {
          width: 30%;
          height: 175px;
          object-fit: cover;
        }
      }
      .PDinfo {
        width: 50%;
        height: 550px;
        text-align: left;
        padding: 50px 50px 50px 100px;
        h4 {
          margin: 10px;
        }
        .PDtext {
          display: block;
          position: relative;
          top: 80px;
        }
        .PDcart {
          display: flex;
          width: 100%;
          .cartBtn {
            text-align: center;
            width: 30%;
            margin: 25px 10px 0 10px;
          }
          .n-form {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 1400px) {
  .PDcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .PDcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      .PDimg {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        img {
          width: 100%;
          height: 500px;
          margin-top: 30px;
          display: flex;
          margin-bottom: 0px;
          object-fit: cover;
        }
        img:nth-child(2),
        img:nth-child(3),
        img:nth-child(4) {
          width: 30%;
          height: 120px;
          object-fit: cover;
        }
      }
      .PDinfo {
        width: 40%;
        height: 550px;
        text-align: left;
        padding: 50px 50px 50px 75px;
        h4 {
          margin: 10px;
        }
        .PDtext {
          display: block;
          position: relative;
          top: 80px;
        }
        .PDcart {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .cartBtn {
            text-align: center;
            width: 100%;
            margin: 0;
            margin-top: 0px;
          }
          .cartBtnA {
            text-align: center;
            width: 100%;
            margin: 0;
            margin-top: 20px;
          }
          a {
            .cartBtn2 {
              text-align: center;
              width: 100%;
              margin: 0;
              margin-top: 20px;
            }
          }
          .n-form {
            margin-right: 0px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 992px) {
  .PDcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50vh;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .PDcontent {
      width: 70vw;
      display: flex;
      flex-wrap: wrap;
      margin: auto;
      justify-content: center;
      .PDimg {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        justify-content: space-between;
        img {
          width: 100%;
          height: 650px;
          margin-top: 30px;
          display: flex;
          margin-bottom: 0px;
          object-fit: cover;
        }
        img:nth-child(2),
        img:nth-child(3),
        img:nth-child(4) {
          width: 30%;
          height: 200px;
          object-fit: cover;
        }
      }
      .PDinfo {
        width: 100%;
        text-align: left;
        padding: 20px;
        h4 {
          margin: 10px;
        }
        .PDtext {
          display: block;
          position: relative;
          top: 80px;
        }
        .PDcart {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .n-form {
            margin-right: 0px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 576px) {
  .PDcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50vh;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .PDcontent {
      width: 70vw;
      display: flex;
      flex-wrap: wrap;
      margin: auto;
      justify-content: center;
      .PDimg {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        justify-content: space-between;
        img {
          width: 100%;
          height: 360px;
          margin-top: 30px;
          display: flex;
          margin-bottom: 0px;
          object-fit: cover;
        }
        img:nth-child(2),
        img:nth-child(3),
        img:nth-child(4) {
          width: 30%;
          height: 100px;
          object-fit: cover;
        }
      }
      .PDinfo {
        width: 100%;
        text-align: left;
        padding: 20px;

        h4 {
          margin: 10px;
        }
        .PDtext {
          display: block;
          position: relative;
          top: 80px;
        }
        .PDcart {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .n-form {
            margin-right: 0px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
