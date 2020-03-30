<template>
  <transition name="fade">
    <div v-if="open" class="message-box">
      <div class="con-con">
        <div class="con">
          <p class="message">
            {{ message }}
          </p>
          <div class="btn" @click="close">
            确定
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Message',
  components: {
  },
  props: {
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    close() {
      this.open = false;
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.message-box{
  height: 100vh;
  width: 100vw;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;

  .con-con{
    height: 100vh;
    width: 100vw;
    background:rgba(0,0,0,.7);
    position: relative;
  }

  .con{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 101;
    width: 400px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;


    .message{
      padding: 35px;
      text-align: center;
      font-weight:500;
      font-size: 20px;
      line-height: 35px;
      color: #333333;
      letter-spacing: -0.82px;
    }
    .btn{
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      font-weight:400;
      color: #EF4C4F;
      letter-spacing: 0;
      border-top:1px solid #eee;
      cursor: pointer;
    }
  }

}


/*动画*/
.fade-enter-active{
  animation: animate_in 0.5s;
}
.fade-leave-active{
  animation: animate_out 0.5s;
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
