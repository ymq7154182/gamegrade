<template>
    <div style="min-height:730px; height:100px">
        <div id="particles-js"></div>
    </div>
</template>

<script>
import particlesJs from 'particles.js'
import particlesConfig from './particles.json'
export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      particlesJs('particles-js', particlesConfig)
      document.body.style.overflow = 'hidden'
    }
  }
}
</script>

<style scoped>
    @import "./style.css";
</style>
