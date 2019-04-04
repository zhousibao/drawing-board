<template>
  <div class="popover-con">
    <el-popover
      v-model="popover"
      popper-class="popover-popover"
      ref="textarea"
      placement="top-start"
      :visible-arrow="false"
      width="150"
      trigger="click">
      <div class="detail" @mouseleave="mouseleave">
        <div :class="{'active' : fontSize === fontList[0]}" @click="choose(0)">
          <svg-icon icon-class="icon_text_size" style="font-size:15px;"></svg-icon>
        </div>
        <div :class="{'active' : fontSize === fontList[1]}" @click="choose(1)">
          <svg-icon icon-class="icon_text_size" style="font-size:25px;"></svg-icon>
        </div>
        <div :class="{'active' : fontSize === fontList[2]}" @click="choose(2)">
          <svg-icon icon-class="icon_text_size" style="font-size:35px;"></svg-icon>
        </div>
      </div>
    </el-popover>
    <div v-popover:textarea :class="{'active' : action === 'textarea'}" class="con"  @click="onActive">
      <svg-icon icon-class="icon_text" :class-name="action === 'textarea' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverTextarea',
  props: {
    // 字体大小集合
    fontList: {
      type: Array,
      default: function(){
        return [15,25,35]
      }
    },
    // 当前字体大小
    fontSize: {
      type: Number,
      default: 25
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
    // 选择文本绘制
    onActive(){
      this.$emit('popoverTextarea', 'textarea', this.fontSize)
    },
    // 选择字体大小
    choose(index){
      const fontSize = this.fontList[index]
      this.$emit('popoverTextarea', 'textarea', fontSize)
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
  width: 150px;
  height: 50px;
  display: flex;
  background: @default;
  
  div{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  div:hover{
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
