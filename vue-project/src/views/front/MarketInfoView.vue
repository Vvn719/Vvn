<template>
  <div class="MKContain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
  </div>

  <div class="mbgImg">
    <n-carousel :slides-per-view="5" :space-between="0" :loop="false" draggable :show-dots="false">
      <img src="../../../images/M1.jpg" />
      <img src="../../../images/M2.jpg" />
      <img src="../../../images/M3.jpg" />
      <img src="../../../images/M4.jpg" />
      <img src="../../../images/M5.jpg" />
      <img src="../../../images/M1.jpg" />
      <img src="../../../images/M2.jpg" />
      <img src="../../../images/M3.jpg" />
      <img src="../../../images/M4.jpg" />
      <img src="../../../images/M5.jpg" />
    </n-carousel>
  </div>

  <div class="MKContain">
    <div class="topic">
      <h1 style="margin-left: 20px">Fashion Market</h1>
      <h3 style="margin-top: -20px">實體市集</h3>
      <br />
    </div>
    <div class="MKContent">
      <section class="MKSection">
        <div class="msec1">
          <img src="../../../images/market.png" />
        </div>
        <div class="msec2">
          <h1>SuiSui Life</h1>
          <h3>松山文創 水水市集</h3>
          <h3>/ 2023 01.03-05.06 /</h3>
          <br />
          <p>
            228連假想好去哪裡玩了嗎?
            <br />
            水水準備好與大家一起度過美好時光 悠哉的午後逛完文創市集
            <br />
            喝杯茶，觀賞藝人的歌聲饗宴吧!
            <br />
            #手作#飾品#擺攤日常#樹脂飾品#文創市集
          </p>
          <n-button round size="large" color="#CA9E" @click="ButtonClickNewArrival" style="margin-top: 10px">更多資訊</n-button>
        </div>
        <br />
      </section>
      <section class="MKSection">
        <div style="order: 2" class="msec1">
          <!-- <img src="../../../images/market1.jpg" /> -->
          <!-- <img src="../../../images/market3.jpg" /> -->
          <div class="container-fluid p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7129275908896!2d121.5573515153789!3d25.043814544051045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb57dfbfcd5%3A0xc574a92f0de54ed4!2z5p2-6I-45rC05rC05biC6ZuG!5e0!3m2!1szh-TW!2stw!4v1677209372611!5m2!1szh-TW!2stw"
              style="border: 0; width: 32vw; height: 450px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div class="msec2" style="order: 1">
          <h1>Information</h1>
          <h3>交通資訊</h3>
          <br />
          <p>
            搭高鐵或臺鐵至臺北站
            <br />
            轉搭臺北捷運至市政府站/國父紀念館站
            <br />
            -
            <br />
            搭乘臺北市公車
            <br />
            212、232、240、270、299、600、919
            <br />
            忠孝幹線，至聯合報站
          </p>
          <n-button round size="large" color="#CA9E" @click="ButtonClickNewArrival" style="margin-top: 10px">更多資訊</n-button>
        </div>
        <br />
      </section>
      <section class="MKSection">
        <div class="msec1">
          <img src="../../../images/market3.jpg" />
        </div>
        <div class="msec2">
          <h1>SuiSui Life</h1>
          <h3>松山文創 水水市集</h3>
          <h3>/ 2023 01.03-05.06 /</h3>
          <br />
          <p>
            228連假想好去哪裡玩了嗎?
            <br />
            水水準備好與大家一起度過美好時光 悠哉的午後逛完文創市集
            <br />
            喝杯茶，觀賞藝人的歌聲饗宴吧!
            <br />
            #手作#飾品#擺攤日常#樹脂飾品#文創市集
          </p>
          <n-button round size="large" color="#CA9E" @click="ButtonClickNewArrival" style="margin-top: 10px">更多資訊</n-button>
        </div>
        <br />
      </section>
      <section class="MKSection">
        <div style="order: 2" class="msec1">
          <!-- <img src="../../../images/market1.jpg" /> -->
          <!-- <img src="../../../images/market3.jpg" /> -->
          <div class="container-fluid p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7129275908896!2d121.5573515153789!3d25.043814544051045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb57dfbfcd5%3A0xc574a92f0de54ed4!2z5p2-6I-45rC05rC05biC6ZuG!5e0!3m2!1szh-TW!2stw!4v1677209372611!5m2!1szh-TW!2stw"
              style="border: 0; width: 32vw; height: 450px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div class="msec2" style="order: 1">
          <h1>Information</h1>
          <h3>交通資訊</h3>
          <br />
          <p>
            搭高鐵或臺鐵至臺北站
            <br />
            轉搭臺北捷運至市政府站/國父紀念館站
            <br />
            -
            <br />
            搭乘臺北市公車
            <br />
            212、232、240、270、299、600、919
            <br />
            忠孝幹線，至聯合報站
          </p>
          <n-button round size="large" color="#CA9E" @click="ButtonClickNewArrival" style="margin-top: 10px">更多資訊</n-button>
        </div>
        <br />
      </section>
    </div>
  </div>

  <br />
  <br />
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
.MKContain {
  h1,
  h2 {
    font-family: 'Playfair Display', serif;
    color: #523a24;
  }
  width: 70vw;
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
  .MKContent {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    margin-bottom: 20vh;
    section {
      display: flex;
      width: 100%;
      height: 450px;
      align-items: center;
      text-align: center;
      margin: auto;
      .msec1 {
        width: 50%;
        height: 450px;
        display: flex;
        margin: 20px;
        img {
          object-fit: cover;
          width: 100%;
          align-items: center;
          overflow: hidden;
        }
      }
      .msec2 {
        width: 50%;
        h2,
        h3 {
          // margin-left: 45px;
          margin-top: -10px;
          margin-bottom: 10px;
        }
        p {
          // margin: 45px;
          margin-top: 30px;
        }
      }
    }
  }
}
.mbgImg {
  width: 100vw;
  height: 45vh;

  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
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
