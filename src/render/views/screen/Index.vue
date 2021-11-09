<template>
  <div class="container">
    <op-bar />
    <video />
    <div class="tip">正在共享您的屏幕</div>
    <div class="tool-bar">
      <div class="stop">停止共享</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getScreenStream, setStreamToVideo } from '@render/util/capture'
import OpBar from '@render/components/opBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Screen',
  components: {
    OpBar,
  },
  setup () {
    getScreenStream().then(stream => {
      if (!stream) {
        return
      }
      setStreamToVideo('video', stream)
    })
    return {}
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #8a8a8a;
  video {
    width: 75%;
    height: 75%;
  }
  .tip {
    color: white;
  }
  .tool-bar {
    width: 100%;
    height: 52px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    .stop {
      width: 82px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 8px;
      color: white;
      border: 2px solid #aaa;
    }
  }
}
</style>
