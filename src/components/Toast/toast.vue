<template>
  <div v-if="showWrap" :class="showContent ?'fadein':'fadeout'" class="wrap">
    <div class="wrap-con">
      {{ message }}
    </div>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
.wrap{
  position: fixed;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.wrap-con{
  background: rgba(0,0,0,.7);
  color:#fff;
  font-weight:400;
  font-size: 20px;
  line-height: 30px;
  max-width:600px;
  min-width:360px;
  box-sizing: border-box;
  padding: 18px;
  border-radius: 16px;
  letter-spacing: 0;
  text-align: center;
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>
