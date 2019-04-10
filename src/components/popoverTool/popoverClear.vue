<template>
  <div :class="{'active' : action === 'clear'}" class="con" @click="onActive">
    <svg-icon icon-class="icon_clear" :class-name="action === 'clear' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'PopoverClear',
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
      this.$emit('popoverClear', 'clear');
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
