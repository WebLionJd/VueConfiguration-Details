<template>
    <div class="parent">
      <h2>Parent</h2>
        <ul>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/parent">/parent</router-link></li>
          <li><router-link to="/parent/foo">/parent/foo</router-link></li>
          <li><router-link to="/parent/bar">/parent/bar</router-link></li>
        </ul>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
  .default{
    width: 400px;
    height: 300px;
    border: 1px solid black;
  }
  .foo{
    width: 600px;
    height: 500px;
    border: 1px solid green;
  }
  .bar{
    widows: 800px;
    height: 500px;
    border: 1px solid #dddddd;
  }
</style>
