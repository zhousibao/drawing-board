<template>
  <div v-if="visible" class="wrapLoading">
    <img src="../../assets/icon/loading.gif" class="loading">
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.wrapLoading{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background: rgba(100,100,100,0.5)
}
.loading{
  width: 40px;
  height: 40px;
}

</style>
