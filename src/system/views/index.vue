<template>
<div class="wrap mainWrap flex-col">
  <sub-menu />
  <router-view class="flex-1" />
</div>
  
</template>

<script>

export default {
  components: {
    subMenu: (resolve) => require(['@/common/components/subMenu.vue'], resolve)
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  created: function(){
    
  }
}
</script>

<style scoped>

</style>
