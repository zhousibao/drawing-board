<template>
  <div :class="{'active' : action === 'drag'}" class="con" @click="onActive">
    <svg-icon icon-class="icon_drag" :class-name="action === 'drag' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'PopoverDrag',
  props: {
    // 当前的绘图方式
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {

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
    // 选择局部清除
    onActive() {
      this.$emit('popoverDrag', 'drag');
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
@import "~@/style/var.less";
.con{
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active{
  background: @active;
}

</style>
