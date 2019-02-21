
<template>
  <div class="index">
    <img src="../assets/fg2.jpg">
    <!-- <img src="../../static/fg5.jpg"> -->
    <div class="indexdiv"></div>
    <button @click="back">返回</button>
    <el-button>添加</el-button>
  </div>
</template>

<script>
// import '../../static/css/index.css'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    back () {
      this.$router.push('/')
    },
    get () {
      const _this = this
      console.log('/api')
      _this.$ajax.get('/api/v2/movie/top250?start=25&count=25').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    gets () {
      const _this = this
      _this.$ajax.get('/dl/api/wikiad/getsquirrels?lemmaId=150286&tags=&_=1550453655400').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.get()
    this.gets()
  }
}
</script>

<style scoped>
  .indexdiv{
    height: 200px;
    width: 200px;
    background-color: aqua;
  }
</style>
