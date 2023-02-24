<template>
  <!-- <n-config-provider :theme="themeOverrides"> -->
  <n-dialog-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-dialog-provider>
  <!-- </n-config-provider> -->
</template>

<script setup>
// const themeOverrides = {
//   common: {
//     fontFamily: " 'Noto Sans TC', sans-serif,'Playfair Display', serif;",
//     fontWeight: '400',
//     fontWeightStrong: '500',
//     primaryColor: '#CCA86EFF',
//     primaryColorHover: '#D6B683FF',
//     primaryColorSuppl: '#D6B683FF',
//     primaryColorPressed: '#A68248FF',
//     infoColor: '#B8927FED',
//     infoColorHover: '#CCAA99EE',
//     infoColorSuppl: '#CCAA99EE',
//     infoColorPressed: '#B68770ED'
//   }
// }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
</style>
