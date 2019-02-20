<template>
    <div class='test'>
        <div>{{msg}}</div>
    </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      msg: '本页面为测试页面！'
    }
  },
  computed: {},
  watch: {},
  methods: {
    getHost () {
      console.log(window.location.host)
      this.$ajax.get('/m/cgi-m/sowingMap/list', {
        headers: {
          citysite: 'bj',
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wva2Ztb2JpLmh1aWdvdWZhbmcuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2tmbW9iaS5odWlnb3VmYW5nLmNvbSIsIm1vZCI6Ik0iLCJpYXQiOjE1NTA2MjU3MjIsImV4cCI6MTU1MDcxMjEyMiwiaWQiOiJna2xLIiwiYWNjb3VudCI6IjEzMjQ5MzkyMDAwIn0.pWD6HaducQNvUU3rAaRAhuQD3rmpM-5NQrvaQykKkcU'
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchGet () {
      let myHeaders = new Headers({
        citysite: 'bj',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wva2Ztb2JpLmh1aWdvdWZhbmcuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2tmbW9iaS5odWlnb3VmYW5nLmNvbSIsIm1vZCI6Ik0iLCJpYXQiOjE1NTA2MjU3MjIsImV4cCI6MTU1MDcxMjEyMiwiaWQiOiJna2xLIiwiYWNjb3VudCI6IjEzMjQ5MzkyMDAwIn0.pWD6HaducQNvUU3rAaRAhuQD3rmpM-5NQrvaQykKkcU'
      })
      console.log(myHeaders)
      fetch('https://kfmobi.huigoufang.com/api/cgi-m/sowingMap/list', {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders
        // cache: 'default',
        // credentials: 'include'
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
      }).catch(error => {
        console.error('Error', error)
      })
    },
    fatchGetHttp () {
      fetch('http://api.douban.com/v2/movie/top250?start=25&count=25', {
        method: 'GET',
        mode: 'cors'
      }).then(res => {
        return res.json()
      }).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {

  },
  mounted () {
    this.getHost()
    this.fetchGet()
    this.fatchGetHttp()
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

</style>
