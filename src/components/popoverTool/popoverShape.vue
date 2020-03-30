<template>
  <div class="popover-con">
    <el-popover
      ref="shape"
      v-model="popover"
      popper-class="popover-popover"
      placement="top-start"
      :visible-arrow="false"
      width="320"
      trigger="click"
    >
      <div class="detail" @mouseleave="mouseleave">
        <div class="detail-top">
          <div v-for="shape in shapeList" :key="shape" :class="{'active' : shapeType === shape}" @click="choose('shapeType', shape)">
            <svg-icon :icon-class="`${'icon_shape_' + shape}`" style="font-size:25px; color:#fff;"></svg-icon>
          </div>
        </div>
        <div class="detail-middle">
          <div :class="{'active' : !isFill}" @click="choose('isFill', false)">
            <div class="unfill"></div>
            <div class="unfill-text">
              描边
            </div>
          </div>
          <div :class="{'active' : isFill}" @click="choose('isFill', true)">
            <div class="fill"></div>
            <div class="fill-text">
              填充
            </div>
          </div>
        </div>
        <div class="detail-bottom">
          <div v-for="color in colorList" :key="color" :class="{'active' : shapeColor === color}" @click="choose('shapeColor', color)">
            <div class="shape-color" :style="{background:color}"></div>
          </div>
        </div>
      </div>
    </el-popover>
    <div v-popover:shape :class="{'active' : action === 'shape'}" class="con" @click="onActive">
      <svg-icon :icon-class="`${'icon_shape_' + shapeType}`" :class-name="action === 'shape' ? 'icon-active': 'icon-default'" style="font-size:25px;"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverShape',
  props: {
    // 填充或描边
    isFill: {
      type: Boolean,
      default: false,
    },
    // 绘制颜色
    shapeColor: {
      type: String,
      default: '#EF4C4F',
    },
    // 当前的shape类型
    shapeType: {
      type: String,
      default: 'line',
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
      // shapeList
      shapeList: ['line', 'dashed', 'arc', 'ellipse', 'triangle', 'rect', 'hexagon', 'stars'],
      // shapeList
      colorList: ['#EF4C4F', '#f90', '#1afa29', '#1296db', '#d4237a', '#000'],


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
    // 选择pen绘制
    onActive() {
      this.$emit('popoverShape', 'shape', this.shapeType, this.shapeColor, this.isFill);
    },
    // 选择字体粗细和颜色
    choose(type, value) {
      if (type === 'shapeType') {
        this.$emit('popoverShape', 'shape', value, this.shapeColor, this.isFill);
      } else if (type === 'shapeColor') {
        this.$emit('popoverShape', 'shape', this.shapeType, value, this.isFill);
      } else {
        this.$emit('popoverShape', 'shape', this.shapeType, this.shapeColor, value);
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
  width: 320px;
  background: @default;

  .detail-top{
    height: 40px;
    border-bottom: 1px solid rgb(109, 116, 138);
    display: flex;

    &>div{
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &>div:hover{
      background: @hover;
    }
  }

  .detail-middle{
    height: 40px;
    border-bottom: 1px solid rgb(109, 116, 138);
    display: flex;

    &>div{
      flex-grow: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .unfill{
      width: 18px;
      height: 18px;
      border: 1px solid #EF4C4F;
    }
    .unfill-text{
      padding-left: 10px;
      color: #EF4C4F;
    }
    .fill{
      width: 20px;
      height: 20px;
      background: #1296db;
    }
    .fill-text{
      padding-left: 10px;
      color: #1296db;
    }
  }

  .detail-bottom{
    height: 40px;
    display: flex;

    &>div{
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .shape-color{
        width: 20px;
        height: 20px;
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
