<template>
  <div class="CZIContain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
  </div>

  <div class="bgImg"></div>
  <!-- <img class="bgImg" src="../../../images/image-01.jpg" alt="" /> -->

  <div class="CZIContain">
    <div class="topic">
      <h1 style="margin-left: 20px">Customized Gift</h1>
      <h3 style="margin-top: -20px">客製禮物 步驟說明</h3>
      <br />
    </div>
    <section style="margin-bottom: 1vh">
      <div>
        <n-carousel autoplay draggable class="sec4img">
          <img src="../../../images/box.jpg" />
          <img src="../../../images/2.jpg" />
          <img src="../../../images/3.jpg" />
          <img src="../../../images/card.jpg" />
        </n-carousel>
      </div>
      <div class="sec2">
        <h2>Special Gift</h2>
        <!-- <h3 style="margin-top: -20px">精美禮物</h3> -->
      </div>
      <div class="sec3" style="width: 60%; margin: auto">
        <p>
          *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
          *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
        </p>
      </div>
      <br />
      <hr />
    </section>
    <div class="CZIContent">
      <section>
        <div class="sec1">
          <img src="../../../images/Group 26.png" alt="訂製需求" />
          <img src="../../../images/Polygon 1.png" style="margin: auto" />
        </div>
        <div class="sec2">
          <h2>Step One</h2>
          <h3>訂製需求</h3>
        </div>
        <div class="sec3">
          <p>
            *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
            *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
          </p>
        </div>
      </section>
      <section>
        <div class="sec1">
          <img src="../../../images/Group 25.png" alt="訂製需求" />
          <img src="../../../images/Polygon 1.png" style="margin: auto" />
        </div>
        <div class="sec2">
          <h2>Step Two</h2>
          <h3>細節確認</h3>
        </div>
        <div class="sec3">
          <p>
            *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
            *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
          </p>
        </div>
      </section>
      <section>
        <div class="sec1">
          <img src="../../../images/Group 23.png" alt="訂製需求" />
          <img src="../../../images/Polygon 1.png" style="margin: auto" />
        </div>
        <div class="sec2">
          <h2>Step Three</h2>
          <h3>手工製作</h3>
        </div>
        <div class="sec3">
          <p>
            *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
            *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
          </p>
        </div>
      </section>
      <section>
        <div class="sec1">
          <img src="../../../images/Group 24.png" alt="訂製需求" />
          <img src="../../../images/Polygon 1.png" style="margin: auto" />
        </div>
        <div class="sec2">
          <h2>Step Four</h2>
          <h3>精美禮物</h3>
        </div>
        <div class="sec3">
          <p>
            *手工精細製作作品為極度類似款，雖為同款但會有細微的不同之處也是手工的魅力。 *樹脂(UV膠)材質製作難免有些許氣泡產生，不列入瑕疵範圍，可接受者方可下標。
            *每一付商品皆會經過強化處理，但仍屬於脆弱商品，配戴貼耳商品時，請以指腹輕推及可。
          </p>
        </div>
      </section>
    </div>
  </div>
  <br />
  <br />
  <n-button round size="large" color="#CA9E" @click="ButtonClickNewArrival" style="margin-bottom: 20vh">前往選購</n-button>
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

function ButtonClickNewArrival(e) {
  router.push({ path: 'newArrival' })
}

const message = useMessage()
const activeKey = ref(null)
const router = useRouter()

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
</script>

<style lang="scss">
.CZIContain {
  h1,
  h2 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  width: 60vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .topic {
    justify-content: center;
    width: 100%;
    margin: auto;
  }
  .CZIContent {
    display: flex;
    flex-wrap: wrap;
    section {
      display: flex;
      text-align: left;
      width: 100%;
      margin: 2%;
      justify-content: space-around;
      align-items: center;
      .sec1 {
        width: 20%;
        margin-bottom: 10px;
        display: flex;
        img {
          align-items: center;
        }
      }
      .sec2 {
        width: 20%;
        h2,
        h3 {
          margin-left: 10px;
          margin-top: -10px;
          margin-bottom: 10px;
        }
      }
      .sec3 {
        width: 60%;
      }
    }
  }
  .sec4img {
    // display: flex;
    width: 100%;
    // justify-content: space-around;
    img {
      width: 25%;
      height: 320px;
      margin-top: 5%;
      margin-bottom: 0px;
      object-fit: cover;
      border-top-left-radius: 500px;
      border-top-right-radius: 500px;
      margin: auto;
    }
  }

  // .CZIContent {
  // }
}
.bgImg {
  width: 100vw;
  height: 30vh;
  background: url(../../../images/image-01.jpg) 50% 15% / cover;
  background-attachment: fixed;
  // background-size: cover;
}
// 	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px
@media (max-width: 1600px) {
}
@media (max-width: 1200px) {
}
@media (max-width: 992px) {
}
@media (max-width: 576px) {
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
