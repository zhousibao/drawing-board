<template>
  <div class="popover-con">
    <el-popover
      v-model="popover"
      popper-class="popover-popover"
      ref="eraser"
      placement="top-start"
      :visible-arrow="false"
      width="250"
      trigger="click">
      <div class="detail" @mouseleave="mouseleave">
        
        <div v-for="cricle in cricleList" :key="cricle.value" :class="{'active' : eraserRadius === cricle.value}" @click="choose(cricle.value)">
          <div class="cricle" :style="{width:cricle.key + 'px',height:cricle.key + 'px'}"></div>
        </div>
       
      </div>
    </el-popover>
    <div v-popover:eraser :class="{'active' : action === 'eraser'}" class="con"  @click="onActive">
      <svg-icon icon-class="icon_eraser" :class-name="action === 'eraser' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverEraser',
  props: {
    // 当前橡皮檫的直径大小
    eraserRadius: {
      type: Number,
      default: 32
    },
    // 当前的绘图方式
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      popover:false,
      // eraserRadius大小
      cricleList: [
        {key:12, value:18},
        {key:16, value:24},
        {key:20, value:32},
        {key:25, value:40},
        {key:30, value:50}
      ],

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
    // 选择pen绘制
    onActive(){
      this.$emit('popoverEraser', 'eraser', this.eraserRadius)
    },
    // 选择字体粗细和颜色
    choose(eraserRadius){
      this.$emit('popoverEraser', 'eraser', eraserRadius)
    },
    // 关闭popover
    mouseleave(){
      this.popover = false
    }
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
@import "~@/style/var.less";

.popover-con{
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.detail{
  width: 250px;
  height: 50px;
  background: @default;
  display: flex;
    
  &>div{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .cricle{
      background: #fff;
      border-radius: 50%;
    }
  }

  &>div:hover{
    background: @hover;
  }
  
}

.con{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active{
  background: @active;
}

</style>
