<template>
  <div v-loading="loading">
    <ToolBar></ToolBar>
    <!-- 内容 -->
    <div class="infoBox wrap">
      <uploader
        class="upload_avatar"
        accept="t-image"
        :value="userInfo.avatar ? [{url: userInfo.avatar}] : []"
        imgCrop
        :show-file-list="false"
        :on-success="handleUpload"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt />
        <span v-else>
          上传头像
        </span>
      </uploader>
      <el-descriptions border>
        <el-descriptions-item label="用户名">{{ userInfo.accountName }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userInfo.accountNumber }}</el-descriptions-item>
        <el-descriptions-item label="所属组织">{{ userInfo.orgName }}</el-descriptions-item>

        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { edit } from "@/system/api/account"

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleUpload(res) {
      if (res.url) {
        this.loading = true;
        const newInfo = Object.assign({}, this.$store.state.user, {
          avatar: res.url
        })
        edit(newInfo).then(() => {
          this.$store.action('user', {
            cache: 'update'
          }).then(() => {
            this.loading = false;
            this.$message.success('更新成功！')
          })

        }).catch(() => {
          this.loading = false;
        })
      }
    }
  }
};
</script>

<style scoped>
.upload_avatar {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  line-height: 200px;
  background: #dedede;
  text-align: center;
  cursor: pointer;
}
.upload_avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
