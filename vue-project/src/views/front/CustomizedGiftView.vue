<template>
  <div class="CZcontain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
    <div class="CZcontent">
      <div class="CZimg">
        <div class="img">
          <img :src="product.image[0]" />
        </div>
        <div class="info">
          <br />
          <h2>
            【{{ product.category[0] }}】
            <br />
            {{ product.name }}
          </h2>
          <p style="font-size: 21px; margin-top: 5px; font-weight: 550">NT.{{ product.price }}</p>
        </div>
      </div>
      <div class="CZform">
        <h1>Customized Gift</h1>
        <h3 style="margin-top: -20px">客製禮物</h3>
        <n-form ref="valid" :model="form" :rule="rules" show-require-mark>
          <n-form-item label="商品名稱">
            <n-input v-model:value="product.name" disabled="true" />
          </n-form-item>
          <!-- <n-form-item label="款式類別">
            <n-input v-model:value="product.category" disabled="true" />
          </n-form-item> -->
          <div class="color">
            <n-form-item label="訂製色系" path="color">
              <n-color-picker
                v-model:value="form.color"
                :show-alpha="false"
                :modes="['hex']"
                :actions="['clear']"
                show-preview
                placement="right-start"
                :swatches="['#B3DFEC', '#B9C0EA', '#E8A5CC', '#F282A7', '#F0725C', '#F6AC5A']" />
            </n-form-item>
            <n-form-item path="color2">
              <n-color-picker
                v-model:value="form.color2"
                :show-alpha="false"
                :modes="['hex']"
                :actions="['clear']"
                placement="right-start"
                show-preview
                :swatches="['#E3F1F8', '#E6E3F8', '#F8E3E3', '#F8ECE3', '#F4F8E3', '#C999BB']" />
            </n-form-item>
          </div>
          <n-form-item class="colorPicWord" path="colorAll">
            <n-input v-model:value="form.color" placeholder="由 Sunday 協助配色"><template #prefix>主色</template></n-input>
            <n-input v-model:value="form.color2" placeholder="由 Sunday 協助配色"><template #prefix>配色</template></n-input>
          </n-form-item>
          <n-form-item label="耳環款式" path="form.earringType">
            <n-tabs default-value="耳針" type="segment" animated style="width: 100%" v-model:value="form.activeTab">
              <n-tab-pane name="耳針" tab="耳針" style="display: flex" value="耳針" :class="activeTab === '耳針' ? 'active' : ''" @click="activeTab = '耳針'">
                <n-radio :checked="checkedValue === '經典金銀-耳針'" value="經典金銀-耳針" name="經典金銀-耳針" @change="handleChange" for="質感U字-珠型耳夾">
                  <p>經典款式-耳針</p>
                  <n-image src="../../../images/C-1.png" width="90" />
                </n-radio>
                <br />
                <n-radio :checked="checkedValue === '特殊款式-耳勾'" value="特殊款式-耳勾" name="特殊款式-耳勾" @change="handleChange">
                  <p>特殊款式-耳勾</p>
                  <n-image src="../../../images/C-2.png" width="90" />
                </n-radio>
              </n-tab-pane>
              <n-tab-pane name="耳夾" tab="耳夾" style="display: flex" value="耳夾" :class="activeTab === '耳夾' ? 'active' : ''" @click="activeTab = '耳夾'">
                <n-radio :checked="checkedValue === '質感U字-珠型耳夾'" value="質感U字-珠型耳夾" name="質感U字-珠型耳夾" @change="handleChange">
                  <p>質感U字-珠型</p>
                  <n-image src="../../../images/C-2.png" width="90" />
                </n-radio>
                <br />
                <n-radio :checked="checkedValue === '經典金屬-彈簧耳夾'" value="經典金屬-彈簧耳夾" name="經典金屬-彈簧耳夾" @change="handleChange">
                  <p>經典金屬-彈簧</p>
                  <n-image src="../../../images/C-1.png" width="90" />
                </n-radio>
                <br />

                <n-radio :checked="checkedValue === '質感金屬-螺旋耳夾'" value="質感金屬-螺旋耳夾" name="質感金屬-螺旋耳夾" @change="handleChange">
                  <p>質感金屬-螺旋</p>
                  <n-image src="../../../images/C-2.png" width="90" />
                </n-radio>
                <br />
              </n-tab-pane>
            </n-tabs>
          </n-form-item>
          <!-- <n-form-item>
            <n-select v-model:value="value" :options="options" />
          </n-form-item> -->
          <n-form-item label="訂製數量" path="CZNum">
            <n-input-number
              v-model:value="form.quantity"
              :style="{
                width: '100%'
              }"
              placeholder=" 0 "
              :min="0"
              :max="5"
              button-placement="both"></n-input-number>
          </n-form-item>
          <n-form-item label="加購項目" path="CZAdd">
            <n-checkbox-group v-model:value="form.addPurchases">
              <n-space item-style="display: flex;">
                <n-checkbox value="生日禮卡" label="生日禮卡" />
                <n-checkbox value="燙金抽屜盒" label="燙金抽屜盒" />
                <n-checkbox value="禮卡代寫服務" label="禮卡代寫服務" />
              </n-space>
            </n-checkbox-group>
          </n-form-item>
          <n-form-item label="說明備註">
            <n-input v-model:value="value" type="textarea" placeholder="代寫卡片內容/其他需求可以打在這裡喔!" style="width: 100%" rows="5" />
          </n-form-item>
        </n-form>
        <h2 style="color: #a94649">訂製金額 : {{ product.price * form.quantity }} 元</h2>
        <div class="CZBtn">
          <n-button color="#A45754ED" attr-type="submit" @click="showModal = true">送出訂單</n-button>
          <n-button color="#CA9E" attr-type="submit" @click="reset">重置內容</n-button>
          <n-modal
            v-model:value="form"
            v-model:show="showModal"
            preset="dialog"
            title="客製禮物"
            positive-text="確認"
            @positive-click="submitCallback"
            style="text-align: left">
            <p>　　Dear～請再次確認訂購資訊喔！</p>
            <p>　　商品名稱:　{{ product.name }}</p>
            <p>　　訂製耳環:　{{ activeTab }}+{{ checkedValue }}</p>
            <p>　　訂製數量:　{{ form.quantity }}</p>
            <p>　　訂製金額:　{{ product.price * form.quantity }}</p>
            <p>　　加購項目:　{{ form.addPurchases[0] }} {{ form.addPurchases[1] }} {{ form.addPurchases[2] }}</p>
            <!-- <n-button class="colorBtn" color=""></n-button> -->
          </n-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { api } from '@/plugins/axios'
import { useUserStore } from '@/stores/user'
import { NIcon } from 'naive-ui'
import { FlowerOutline as flowerIcon, HeartOutline as LoveIcon, CartOutline as CartIcon } from '@vicons/ionicons5'

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
            name: 'home'
          }
        },
        { default: () => 'SUNDAY　｜' }
      ),
    key: 'home',
    icon: renderIcon(flowerIcon)
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
        { default: () => '經典款式' }
      ),
    key: 'newArrival'
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
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'MarketInfo'
          }
        },
        { default: () => '實體市集' }
      ),
    key: 'MarketInfo'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'CourseInfo'
          }
        },
        { default: () => '手作課程' }
      ),
    key: 'CourseInfo'
  }
]

const form = reactive({
  color: '#A94649',
  color2: '#D69294',
  colorAll: '',
  addPurchases: '',
  quantity: 0,
  earringType: ''
})

const addPurchases = ref([])
watch(addPurchases, (newValue, oldValue) => {
  console.log('The new value is: ' + newValue)
  console.log('The old value is: ' + oldValue)
})

const activeTab = ref('耳針')
watch(activeTab, (newValue, oldValue) => {
  console.log('The new value is: ' + newValue)
  console.log('The old value is: ' + oldValue)
})

const checkedValueRef = ref(null)
function handleChange(e) {
  checkedValueRef.value = e.target.value
}

const checkedValue = checkedValueRef

const route = useRoute()
const router = useRouter()

const product = reactive({
  _id: '',
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  image: '',
  sell: true,
  category: ''
})

const valid = ref(null)

const rules = {
  earringType: [
    {
      required: true,
      trigger: ['blur', 'input']
    }
  ],
  quantity: [
    {
      required: true,
      type: 'number',
      trigger: ['blur', 'input'],
      message: '選購數量不可大於庫存'
    }
  ]
}

const showModal = ref(false)

function submitCallback() {
  message.success('商品已加入購物車')
  router.push('/cart')
}
// const value = ref(null)
// const options = [
//   {
//     label: '01.生日禮物',
//     value: '01.生日禮物'
//   },
//   {
//     label: '02.生日禮物',
//     value: '02.不知道'
//   }
// ]

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
// const user = useUserStore()
</script>

<style lang="scss">
.CZcontain {
  width: 75vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  h1,
  h2 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  // h3,
  // h4,
  // h5 {
  //   font-family: 'Noto Sans TC', sans-serif;
  // }
  // p {
  //   font-family: 'Noto Sans TC', sans-serif;
  // }
  h2 {
    // font-family: 'Noto Sans TC', sans-serif;
    color: #523a24;
    margin: 0;
    text-align: center;
  }

  .CZcontent {
    width: 75vw;
    display: flex;
    justify-content: space-between;
    .CZimg {
      width: 50%;
      padding: 50px;
      display: flex;
      flex-wrap: wrap;
      align-content: start;
      .img {
        width: 100%;
        img {
          width: 65%;
          height: 500px;
          margin-top: 5%;
          margin-bottom: 0px;
          object-fit: cover;
          border-top-left-radius: 500px;
          border-top-right-radius: 500px;
        }
      }
      .info {
        margin: auto;
        text-align: center;
        h2 {
          margin: 0;
        }
      }
    }
    .CZform {
      width: 50%;
      text-align: left;
      margin-top: 30px;
      margin-bottom: 10vh;
      padding: 30px 50px 50px 50px;
      background: rgba(219, 207, 207, 0.2);
      .n-form-item {
        height: 80%;
      }
      .n-input {
        text-align: center;
        width: 60%;
      }
      .color {
        display: flex;

        .n-input {
          width: 50%;
        }
        .n-color-picker {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          .n-color-picker-trigger__value {
            display: none;
          }
        }
      }
      .colorPicWord {
        width: 60%;
        margin-top: -35px;
      }
      .n-radio {
        margin: 0px 10px 0px 0px;
        p {
          margin: 0px 0px 10px 0px;
        }
      }
    }
    .CZBtn {
      display: flex;
      width: 100%;
      justify-content: center;
      .n-button {
        width: 20%;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 20px;
      }
    }
  }
}
// 	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px
@media (max-width: 1600px) {
  .CZcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .CZcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      .CZimg {
        width: 50%;
        padding: 50px;
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 100%;
          img {
            width: 70%;
            height: 350px;
            margin-top: 5%;
            margin-bottom: 0px;
            object-fit: cover;
            border-top-left-radius: 500px;
            border-top-right-radius: 500px;
          }
        }
        .info {
          margin: auto;
          text-align: center;
          h2 {
            margin: 0;
          }
        }
      }
      .CZform {
        width: 55%;
        text-align: left;
        padding: 30px 50px 50px 50px;
      }
      .CZBtn {
        display: flex;
        width: 100%;
        justify-content: center;
        .n-button {
          width: 30%;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 20px;
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 1200px) {
  .CZcontain {
    width: 80vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .CZcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      .CZimg {
        width: 70%;
        padding: 50px;
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 100%;
          img {
            width: 75%;
            height: 400px;
            margin-top: 5%;
            margin-bottom: 0px;
            object-fit: cover;
            border-top-left-radius: 500px;
            border-top-right-radius: 500px;
          }
        }
        .info {
          margin: auto;
          text-align: center;
          h2 {
            margin: 0;
          }
        }
      }
      .CZform {
        width: 50%;
        text-align: left;
        margin-top: 30px;
        margin-bottom: 10vh;
        padding: 30px 50px 50px 50px;
        background: rgba(219, 207, 207, 0.2);
        .n-form-item {
          height: 80%;
        }
        .n-input {
          text-align: center;
          width: 100%;
        }
        .color {
          display: flex;

          .n-input {
            width: 100%;
          }
          .n-color-picker {
            width: 70px;
            height: 70px;
            margin-right: 20px;
            .n-color-picker-trigger__value {
              display: none;
            }
          }
        }
        .colorPicWord {
          width: 100%;
          margin-top: -35px;
        }
        .n-radio {
          margin: 0px 10px 0px 0px;
          p {
            margin: 0px 0px 10px 0px;
          }
        }
        .n-tabs .n-tab-pane {
          flex-wrap: wrap;
        }
      }
      .CZBtn {
        display: flex;
        width: 100%;
        justify-content: center;
        .n-button {
          width: 40%;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 20px;
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 992px) {
  .CZcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .CZcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .CZimg {
        width: 100%;
        padding: 50px;
        display: flex;
        margin: auto;
        .img {
          width: 100%;
          img {
            width: 70%;
            height: 450px;
            margin-top: 5%;
            margin-bottom: 0px;
            object-fit: cover;
            border-top-left-radius: 500px;
            border-top-right-radius: 500px;
          }
        }
        .info {
          margin: auto;
          text-align: center;
          h2 {
            margin: 0;
          }
        }
      }
      .CZform {
        width: 100%;
        text-align: left;
      }
      .CZBtn {
        display: flex;
        width: 100%;
        justify-content: center;
        .n-button {
          width: 30%;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 20px;
        }
      }
    }
    transition-duration: 0.5s;
  }
}
@media (max-width: 576px) {
  .CZcontain {
    width: 75vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .CZcontent {
      width: 75vw;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .CZimg {
        width: 100%;
        padding: 50px;
        display: flex;
        margin: auto;
        .img {
          width: 100%;
          img {
            width: 100%;
            height: 320px;
            margin-top: 5%;
            margin-bottom: 0px;
            object-fit: cover;
            border-top-left-radius: 500px;
            border-top-right-radius: 500px;
          }
        }
        .info {
          margin: auto;
          text-align: center;
          h2 {
            margin: 0;
          }
        }
      }
      .CZform {
        width: 100%;
        text-align: left;
      }
      .CZBtn {
        display: flex;
        width: 100%;
        justify-content: center;
        .n-button {
          width: 40%;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 20px;
        }
      }
    }
    transition-duration: 0.5s;
  }
}
</style>
