<template>
<nav class="subNav">
  <ul>
    <li v-for="(item,index) in subMenu" :key="'sm'+index"
      :class="{cur: $route.name===item.name}"
      @click="$router.push(item)">
      {{item.name}}
    </li>
  </ul>
</nav>
  
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  computed: {
    mainMenus: function(){
      if(this.$root.globalData.menu){
        return this.$root.globalData.menu.concat([{
          name: '首页',
          path: '/'
        }])
      }
      return []
    },
    subMenu: function() {
      const targetIndex = this.mainMenus.findIndex(e => {
        return this.$route.fullPath.indexOf(e.path) === 0
      })
      if(targetIndex!==-1){
        return this.mainMenus[targetIndex].children
      }
      return []
    }
  },
  methods: {
    
  },
  created: function(){
    
  }
}
</script>

<style scoped>
.subNav{margin: 10px 0 20px;}
.subNav ul{overflow: hidden;}
.subNav li{float: left; height: 46px;line-height: 46px;font-size:16px; padding:0 2em;cursor: pointer;color:#666;}
.subNav li.cur{color:#000;font-weight: 700; background:#f5f5f5;}
</style>
