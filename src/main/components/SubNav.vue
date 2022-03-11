<template>
  <div v-if="showMenu" class="custom-menu scrollbar">
    <el-menu :default-active="activeIndex" router unique-opened>
      <template v-for="(route, index) in list">
        <el-submenu
          v-if="route.children && route.children.length"
          :route="route"
          :index="route.name"
          :key="'nav' + index"
        >
          <div slot="title" class="first flex-row align-center">
            <i
              class="ion"
              v-html="(route.meta && route.meta.icon) || '&#xe731;'"
            >
            </i>
            <span slot="title">
              {{ (route.meta && route.meta.title) || route.name }}
            </span>
          </div>
          <template v-for="(child, ci) in route.children">
            <!-- 三层 -->
            <el-menu-item-group
              v-if="child.children && child.children.length"
              :route="child"
              :index="child.name"
              :key="'child' + ci"
            >
              <template slot="title">
                <span>
                  {{ (child.meta && child.meta.title) || child.name }}
                </span>
              </template>
              <el-menu-item
                v-for="(grandson, grandsonindex) in child.children"
                :route="grandson"
                :index="grandson.name"
                :key="'grandson' + grandsonindex"
                class="third"
              >
                <span slot="title" class="flex-row align-center">
                  <i class="point"></i>
                  {{ (grandson.meta && grandson.meta.title) || grandson.name }}
                </span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- 两层 -->
            <el-menu-item
              v-else
              :route="child"
              :index="child.name"
              :key="'child' + ci"
              class="second"
            >
              <span slot="title" class="flex-row align-center">
                <i class="point"></i>
                {{ (child.meta && child.meta.title) || child.name }}
              </span>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 一层 -->
        <el-menu-item
          v-else
          :route="route"
          :index="route.name"
          :key="'nav' + index"
          class="flex-row align-center one"
        >
          <i
            class="ion"
            v-html="(route.meta && route.meta.icon) || '&#xe731;'"
          ></i>
          <span slot="title">
            {{ (route.meta && route.meta.title) || route.name }}
          </span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { MainRoute } from "@/module.config";

const filterHide = (arr) => {
  let res = arr.filter((e) => !e.meta || !e.meta.hide);
  res = res.map((e) => {
    let _route = Object.assign({}, e);
    if (_route.children) {
      _route.children = filterHide(_route.children);
    }
    return _route;
  });
  return res;
};

export default {
  data() {
    return {
      state: this.$store.state,
      list: [],
      showMenu: true,
    };
  },
  computed: {
    menu: function () {
      return this.$AccessControl ? this.state.menu : MainRoute[0].children;
    },
    activeIndex() {
      if (this.$route.meta && this.$route.meta.belong) {
        return this.$route.meta.belong;
      }
      return this.$route.name;
    },
  },
  watch: {
    $route: {
      handler(newRoute) {
        let targetIndex = -1;
        if (Array.isArray(this.list)) {
          targetIndex = this.list.findIndex((item) => {
            return item.name === newRoute.name;
          });
        }

        if (targetIndex === -1) {
          // console.log('切换主栏目')
          let arr = this.menu.slice();
          let result;
          for (let i = 0; i < arr.length; i++) {
            if (
              this.$route.path.indexOf(arr[i].path) === 0 &&
              arr[i].children
            ) {
              result = filterHide(arr[i].children);
              break;
            }
          }
          this.list = result;
          this.showMenu = false;
          this.$nextTick(() => {
            this.showMenu = true;
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.custom-menu {
  width: 260px;
  margin-right: 15px;
  margin-bottom: 3px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(57, 73, 93, 0.08);
  padding: 20px 0;
  box-sizing: border-box;
}

.custom-menu >>> .ion {
  font-size: 14px;
  margin-right: 6px;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #dbe2ea;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
}
.custom-menu >>> .el-menu-item,
.custom-menu >>> .el-submenu__title {
  min-width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  color: #555;
}
.custom-menu > li {
  margin-bottom: 9px;
}
.custom-menu >>> .el-menu-item {
  margin-bottom: 9px;
}
.custom-menu >>> .second {
  padding-left: 40px;
  padding-right: 0;
  box-sizing: border-box;
  color: #555;
  border-radius: 6px;
}

.custom-menu >>> .second.is-active,
.custom-menu >>> .third.is-active {
  color: #fff;
  background: #0265ed;
  box-shadow: 0px 2px 2px 0px rgba(109, 156, 220, 0.49);
}
.point {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #555;
  display: inline-block;
  margin-right: 5px;
}
.custom-menu >>> .is-active .point {
  background: #fff;
}
.custom-menu >>> .el-menu-item-group__title {
  color: rgba(52, 104, 248, 0.8);
  padding: 12px 0;
}
.custom-menu ul > li:last-child {
  margin-bottom: 0;
}
.custom-menu >>> .el-submenu .el-menu {
  padding: 0 20px;
}
.custom-menu >>> .el-submenu.is-active.is-opened .first,
.one.is-active {
  color: #0265ed;
}
.custom-menu >>> .is-active .first .ion,
.one.is-active .ion {
  color: #fff;
  background-color: #0265ed;
}
</style>
