<template>
  <div class="popover-con">
    <el-popover
      ref="textarea"
      v-model="popover"
      popper-class="popover-popover"
      placement="top-start"
      :visible-arrow="false"
      width="250"
      trigger="click"
    >
      <div class="detail" @mouseleave="mouseleave">
        <div class="detail-top">
          <div v-for="font in fontList" :key="font.value" :class="{'active' : fontSize === font.value}" @click="choose('fontSize', font.value)">
            <svg-icon icon-class="icon_text_size" :style="{ fontSize:font.key + 'px'}"></svg-icon>
          </div>
        </div>
        <div class="detail-bottom">
          <div v-for="color in colorList" :key="color" :class="{'active' : fontColor === color}" @click="choose('fontColor', color)">
            <div class="cricle-color" :style="{background:color}"></div>
          </div>
        </div>
      </div>
    </el-popover>
    <div v-popover:textarea :class="{'active' : action === 'textarea'}" class="con" @click="onActive">
      <svg-icon icon-class="icon_text" :class-name="action === 'textarea' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverTextarea',
  props: {
    // 当前字体大小
    fontSize: {
      type: Number,
      default: 27,
    },
    fontColor: {
      type: String,
      default: '#EF4C4F',
    },
    // 当前的绘图方式
    action: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      popover: false,
      // 字体大小集合
      fontList: [
        { key: 15, value: 15 },
        { key: 21, value: 21 },
        { key: 27, value: 27 },
        { key: 33, value: 33 },
        { key: 40, value: 40 },
      ],
      // lineColor种类
      colorList: ['#EF4C4F', '#f90', '#f4ea2a', '#1afa29', '#1296db', '#13227a', '#d4237a', '#8a8a8a', '#515151', '#000'],
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
    // 选择文本绘制
    onActive() {
      this.$emit('popoverTextarea', 'textarea', this.fontSize, this.fontColor);
    },
    // 选择字体大小和颜色
    choose(type, value) {
      if (type === 'fontSize') {
        this.$emit('popoverTextarea', 'textarea', value, this.fontColor);
      } else {
        this.$emit('popoverTextarea', 'textarea', this.fontSize, value);
      }
    },
    // 关闭popover
    mouseleave() {
      this.popover = false;
    },
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
