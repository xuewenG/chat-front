<template>
  <div class="search-container">
    <input class="search-input" type="text" placeholder="搜索" />
    <img class="add-friend" src="../assets/plus.svg" alt="添加好友" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Search',
  components: {},
  setup() {
    console.log('search - setup')
  },
})
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  margin: 26px 0;
  .search-input {
    height: 100%;
    flex: 1;
    margin: 0 12px;
    padding: 0 0 0 12px;
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: rgba(219, 217, 216, 1);
    font-size: 12px;
  }
  .add-friend {
    width: 26px;
    height: 26px;
    margin-right: 12px;
    display: inline-block;
    border-radius: 4px;
    background-color: rgba(220, 217, 216, 1);
  }
}
</style>
