<template>
  <div class="popover-con">
    <el-popover
      v-model="popover"
      popper-class="popover-popover"
      ref="pen"
      placement="top-start"
      :visible-arrow="false"
      width="250"
      trigger="click">
      <div class="detail" @mouseleave="mouseleave">
        <div class="detail-top">
          <div v-for="cricle in cricleList" :key="cricle.value" :class="{'active' : lineWidth === cricle.value}" @click="choose('lineWidth', cricle.value)">
            <div class="cricle" :style="{width:cricle.key + 'px',height:cricle.key + 'px'}"></div>
          </div>
        </div>
        <div class="detail-bottom">
          <div v-for="color in colorList" :key="color" :class="{'active' : lineColor === color}" @click="choose('lineColor', color)">
            <div class="cricle-color" :style="{background:color}"></div>
          </div>
        </div>
      </div>
    </el-popover>
    <div v-popover:pen :class="{'active' : action === 'pen'}" class="con"  @click="onActive">
      <svg-icon icon-class="icon_pen" :class-name="action === 'pen' ? 'icon-active': 'icon-default'" style="font-size:25px;"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverPen',
  props: {
    // 当前字体大小
    lineWidth: {
      type: Number,
      default: 1
    },
    lineColor: {
      type: String,
      default: '#EF4C4F'
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
      // lineWidth大小
      cricleList: [
        {key:3, value:1},
        {key:8, value:3},
        {key:12, value:6},
        {key:17, value:9},
        {key:22, value:12}
      ],
      // lineColor种类
      colorList: ['#EF4C4F',"#f90","#f4ea2a","#1afa29","#1296db","#13227a","#d4237a","#8a8a8a","#515151","#000"], 

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
      this.$emit('popoverPen', 'pen', this.lineWidth, this.lineColor)
    },
    // 选择字体粗细和颜色
    choose(type,value){
      if(type === 'lineWidth'){
        this.$emit('popoverPen', 'pen', value, this.lineColor)
      } else {
        this.$emit('popoverPen', 'pen', this.lineWidth, value)
      }
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
  background: @default;

  .detail-top{
    height: 50px;
    border-bottom: 1px solid rgb(109, 116, 138);
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

  .detail-bottom{
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    
    &>div{
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .cricle-color{
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
    &>div:hover{
      background: @hover;
    }
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
