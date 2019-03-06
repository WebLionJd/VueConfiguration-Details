<template>
  <div class="hello">
    <h5>{{msg}}</h5>
    <el-button type="success">跳转</el-button>
    <router-link to="index">跳转index</router-link>
    <router-link to="home">跳转Home</router-link>
    <router-link to="test">跳转Test</router-link>
    <router-link to="parent/asdf">跳转parent</router-link>
    <router-link to="user-12">跳转User-all</router-link>
    <router-link to="user-aa">跳转User-aa</router-link>
    <router-link to="user-aa12">跳转User-aa12</router-link>
    <el-button type="success" @click="getAll">+</el-button>
    <input type="text" name="" id="" v-model="message" @input="updateVal">
    {{count}}
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: ''
    }
  },
  computed: {
    ...mapState({// 这里的...不是省略号了,是对象扩展符
      count: 'num',
      upmodel: 'vmodel'
    }),
    ...mapGetters([
      'getTwos'
    ])
  },
  methods: {
    getAll () {
      this.$store.commit('getSum')
      console.log(this.$store.state.num)
    },
    ...mapActions(
      {
        getSum: 'getSum',
        getModel: 'getModel'
      }
    ),
    updateVal (e) {
      // console.log(e.target.value)
      this.getModel(e.target.value)
      console.log(this.upmodel)
    },
    insertionSort (arr) {
      // [5, 6, 7, 9, 8, 4, 3]
      var len = arr.length
      var preIndex, current
      for (var i = 1; i < len; i++) {
        preIndex = i - 1 // 0 1 2 3 4
        current = arr[i] // 6 7 9 8 4
        while (preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex + 1] = arr[preIndex] // 9 huan 8 [5,6,7,8,9,4,3] // 8 huan 4[5,6,7,4,9,8,3] 9 huan 4 [5,6,7,4,8,9,3] [5,6,4,7,8,9,3] [5,4,6,7,8,9,3] [4,5,6,7,8,9,3]
          preIndex-- // 2 3 2 1
        }
        arr[preIndex + 1] = current // 6 7 9 8 7 6 //换数
        // [5,6,7,9,8,4,3]
        // [5,6,7,8,9,4,3]
        console.log(arr)
      }
      return arr
    }
  },
  mounted () {
    // this.$store.dispatch('getSum')
    this.getSum(1)
    // console.log(this.$store.state.num)
    setTimeout(() => {
      // console.log(this.count)
    }, 1000)
    // console.log(this.getTwos(this.count))
    // this.$nextTick(function () {
    //   console.log(this.count)
    // })
    console.log(this.insertionSort([5, 6, 7, 9, 8, 4, 3]))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
