<template>
  <div :class="{'active' : action === 'default'}" class="con" @click="onActive">
    <svg-icon icon-class="icon_default" :class-name="action === 'default' ? 'icon-active': 'icon-default'" style="font-size:30px;"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'PopoverDefault',
  props: {
    // 当前的绘图方式
    action: {
      type: String,
      required: true,
    },
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
    // 选择默认
    onActive() {
      this.$emit('popoverDefault', 'default');
    },
  },
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
