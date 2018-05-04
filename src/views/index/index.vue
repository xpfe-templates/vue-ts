<template>
  <div class="index">
    <img class="index-logo" src="~@/assets/img/logo.png" alt="">
    <div class="index-text">{{date | formatDate('hh:mm:ss') }} hello, {{name}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class Index extends Vue {
  @Getter name: string
  @Action SetName: any // 业务代码的Action使用any，因为已经在store定义过，不然太繁琐了

  date = Date.now()

  mounted() {
    setTimeout(() => {
      this.SetName({ name: 'ergou' })
    }, 3000)
    setInterval(() => {
      this.date = Date.now()
    }, 1000)
  }
}
</script>

<style lang="postcss" scoped>
.index {
  text-align: center;
  &-logo {
    margin-top: 20px;
    width: 120px;
    height: 120px;
  }
  &-text {
    margin-top: 20px;
  }
}
</style>
