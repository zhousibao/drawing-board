<template>
    <div class="con" @click="onRotate">
      <svg-icon icon-class="icon_rotate" class="con-icon"></svg-icon>
    </div>
</template>

<script>
export default {
  name: 'ActionRotate',
  props: {
    // 当前旋转角度
    angle: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      
    }
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
    // 旋转
    onRotate(){
      this.$emit('actionRotate', this.angle + 90)
    },
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
@import "~@/style/var.less";
.con{
  margin-right: 5px;
  width: 50px;
  height: 30px;
  background: linear-gradient(-180deg, #4F505F 5%, #303138 100%);
  border: 1px solid #131315;
  box-shadow: 0 1px 0 0 rgba(255,255,255,0.16);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .con-icon{
    font-size:24px;
    color:#8a8a8a;
  }
  .con-icon:active{
    color: @icon-active;
  }
}
.con:hover{
  background: linear-gradient(-180deg, #4F505F 40%, #303138 90%);
}

</style>
