<template>
  <div id="Login">
    <n-card hoverable>
      <div class="right-cover">
        <img src="../../../images/image-01.jpg" />
      </div>
      <div class="left-form">
        <n-form ref="valid" :model="form" :rules="rules" size="medium" @submit.prevent="login">
          <span class="title">
            <h3>
              Register
              <br />
              會員登入
            </h3>
          </span>
          <n-form-item-row label="帳號" path="account">
            <n-input v-model:value="form.account" placeholder="輸入帳號" @keydown.enter.prevent />
          </n-form-item-row>
          <n-form-item-row label="密碼" path="password">
            <n-input v-model:value="form.password" type="password" @keydown.enter.prevent show-password-on="mousedown" />
          </n-form-item-row>
          <!-- 登入按鈕 -->
          <div>
            <n-button round size="large" color="#CA9E" type="submit" :loading="false" @click="login">登 入</n-button>
            <br />
            <n-space />
            <n-button text size="large" color="#CA9E" :loading="false" @click="ButtonClickLogin"><h5>沒有帳號，點我註冊</h5></n-button>
          </div>
        </n-form>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

// import suffix from 'naive-ui/es/_internal/suffix'

const router = useRouter()
const user = useUserStore()

const message = useMessage()
const dialog = useDialog()

const loading = ref(false)

const form = reactive({
  account: '5555@yahoo.com',
  password: '1234'
})

const login = async () => {
  loading.value = true
  const result = await user.login(form)
  if (result.length > 0) {
    await dialog.error({
      title: '登入失敗',
      content: result,
      positiveText: '再試一次'
    })
  } else {
    await dialog.success({
      title: '登入成功',
      content: '點擊回到首頁',
      positiveText: '回到首頁'
    })
    router.push('/')
  }
  loading.value = false
}

function ButtonClickLogin(e) {
  router.push({ path: 'register' })
}
</script>

<style lang="scss">
#Login {
  h3 {
    font-family: 'Playfair Display', 'Noto Sans TC', sans-serif;
    color: #ccaa99ee;
  }
  .n-card {
    width: 70vw;
    height: 75vh;
    margin: auto;
    margin-top: calc(18vh - 60px);
    background: #fff;
    .n-card__content,
    .n-card__content:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      .title {
        display: flex;
        color: #ccaa99ee;
        h3 {
          margin-top: 0px;
          margin-bottom: 15px;
        }
      }
      .right-cover img {
        width: 35vw;
        height: 75vh;
        object-fit: cover;
        overflow: hidden;
      }
      .left-form {
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        .n-form {
          width: 65%;
        }
        .n-button {
          margin-top: 10px;
        }
        h5 {
          margin: 0;
        }
      }
    }
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
