<template>
  <div v-loading="loading">
    <ToolBar></ToolBar>
    <!-- 内容 -->
    <div class="infoBox wrap">
      <uploader
        class="upload_avatar"
        accept="t-image"
        :value="userInfo.avatar ? [{ url: userInfo.avatar }] : []"
        imgCrop
        :show-file-list="false"
        :on-success="handleUpload"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt />
        <span v-else>上传头像</span>
      </uploader>
      <el-form label-width="80px" label-position="left" size="small">
        <el-form-item label="用户名">{{ userInfo.accountName }}</el-form-item>
        <el-form-item label="密码">
          <el-button type="text" @click="handleChangePw">
            修改密码
            <i class="el-icon-edit"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="手机号">{{ userInfo.accountNumber }}</el-form-item>
        <el-form-item label="所属组织">{{ userInfo.orgName }}</el-form-item>
        <el-form-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-form-item>
      </el-form>
    </div>
    <!-- 验证身份 -->
    <auth ref="auth" />
  </div>
</template>

<script>
import { edit } from "@/user/api/account"

export default {
  data() {
    return {
      loading: false,
      openAuth: false
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
    },
    handleChangePw() {
      this.$refs.auth.auth().then(authCode => {
        this.$router.push({
          name: '修改密码',
          query: {
            authCode
          }
        })
      })
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
