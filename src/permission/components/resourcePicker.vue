<template>
  <el-tree ref="tree"
    class="custom-tree"
    :data="list"
    :props="defaultProps"
    node-key="id"
    default-expand-all
    :show-checkbox="picker"
    :check-strictly="picker"
    @check-change="handleCheckChange"
    >
    <div slot-scope="{ node, data }" class="custom-tree-item">
      <div class="flex-1 extendLable">
        <span v-if="!!data.url" style="color:#67c23a"> <i class="el-icon-medal"></i></span>
        <span style="margin-right:20px;" :class="{source: !!data.url}">{{data.name}}</span>
        <el-tag v-if="!!data.url" size="mini" :type="typeColor[data.method]"><i class="el-icon-position"></i> {{data.method.toUpperCase()}}</el-tag>
        <el-tag size="mini" type="info"><i class="el-icon-link"></i> {{data.route || data.url}}</el-tag>
      </div>
      <span class="extendGroup" v-if="!picker">
        <el-button v-has="resource.edit" size="small" type="text" @click.stop="$emit('edit',data)">编辑</el-button>
        <el-button v-has="resource.add" v-if="!!data.route" size="small" type="text" @click.stop="$emit('append', data)">添加子菜单</el-button>
        <el-button v-has="resource.add" v-if="!!data.route" size="small" type="text" @click.stop="$emit('addResource', data)">添加资源</el-button>
        <el-button v-has="resource.remove" size="small" type="text" @click.stop="$emit('remove', data)">删除</el-button>
      </span>
    </div>
  </el-tree>
</template>

<script>
import * as util from '@/common/assets/util';
import * as user from "@/common/api/user";
import * as resource from '../api/resource';
import * as menu from '../api/menu';
import {store} from '@/store';

export default {
  props: {
    picker: {
      type: Boolean,
      required: false,
      default: false
    },
    checked: {
      type: Array,
      required: false
    },
    listdata: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      resource,
      menu,
      list: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      typeColor: {
        get: 'success',
        post: 'primary',
        put: 'warning',
        delete: 'danger'
      }
    }
  },
  watch: {
    listdata: {
      handler: function(listdata){
        if(Array.isArray(listdata)){
          this.list = listdata;
        }
        
      },
      immediate: true
    },
    checked: function(checked){
      if(Array.isArray(checked)){
        this.$refs.tree.setCheckedKeys(checked)
      }
    }
  },
  methods: {
    handleCheckChange(data, checked) {
      if(Array.isArray(data.children) && data.children.length){
        data.children.forEach(cnode => {
          this.$refs.tree.setChecked(cnode, checked)
        })
      }
      this.$nextTick(() => {
        const checked = this.$refs.tree.getCheckedNodes();
        this.$emit('checkResource', checked.filter(e => !!e.url).map(e => e.id));
        this.$emit('checkMenu', checked.filter(e => !!e.route).map(e => e.id))
      })
    },
    fetchData: function(){
      user.permission().then(res => {
          let userPermissions = res.data.data;
          store.set('permission', userPermissions);
          this.list = util.buildMenu(userPermissions.menus.concat(userPermissions.resources));
          //设置已勾选
          if(Array.isArray(this.checked)){
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(this.checked)
            })
          }
      })
      
    }
  },
  created: function(){
    if(!this.listdata){
      this.fetchData()
    }
    
  }
}
</script>

<style scoped>
.custom-tree-item{flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-left: 6px;}
.extendLable span{margin-right:4px;}
.extendLable .source{color:#999;font-size:14px;}
.custom-tree >>> .el-tree-node__content{height: 32px;line-height: 32px;}
</style>
