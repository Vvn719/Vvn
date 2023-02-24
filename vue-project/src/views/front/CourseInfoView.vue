<template>
  <div class="CContain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
  </div>

  <div class="CbgImg"></div>
  <!-- <img class="bgImg" src="../../../images/image-01.jpg" alt="" /> -->

  <div class="CContain">
    <div class="topic">
      <h1 style="margin-left: 20px">Handmade Course</h1>
      <h3 style="margin-top: -20px">客製禮物 手作課程</h3>
      <p>
        SUNDAY 集水晶花與UV應用技法的飾品設計體驗課程上線，運用水晶花與UV飾品透亮輕巧的特性
        <br />
        ，透過樹脂材料打開飾品創作的無限可能!讓美好花飾成為你的日常裝飾
        <br />
        <br />
      </p>
      <hr />
    </div>
    <br />

    <div class="CContent"></div>
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
.CContain {
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
  .CContent {
    display: flex;
    flex-wrap: wrap;
  }
}
.CbgImg {
  width: 100vw;
  height: 30vh;
  background: url(../../../images/image-02.jpg) 50% 50% / cover;
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
