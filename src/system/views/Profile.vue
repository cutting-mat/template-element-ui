<template>
  <div v-loading="loading">
    <ToolBar></ToolBar>
    <!-- 内容 -->
    <div class="infoBox wrap" v-if="userDetail && userDetail.id">
      <uploader
        class="upload_avatar"
        accept="t-image"
        :value="userDetail.avatarExt ? [{ url: userDetail.avatarExt.url }] : []"
        imgCrop
        :show-file-list="false"
        :on-success="handleUpload"
      >
        <img v-if="userDetail.avatarExt" :src="userDetail.avatarExt.url" alt />
        <span v-else>上传头像</span>
      </uploader>
      <el-form label-width="80px" label-position="right" size="small">
        <el-form-item label="用户名">{{ userDetail.name }}</el-form-item>
        <el-form-item label="密码">
          <el-button type="text" @click="handleChangePw">
            修改密码
            <i class="el-icon-edit"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="手机号">{{ userDetail.mobile }}</el-form-item>
        <el-form-item label="所属组织">{{
          userDetail.org && userDetail.org.name
        }}</el-form-item>
      </el-form>
      <el-form
        ref="validForm"
        :model="userDetail"
        :rules="rules"
        label-width="80px"
        label-position="right"
        size="small"
        @submit.native.prevent="() => {}"
      >
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="userDetail.address" />
        </el-form-item>
        <el-form-item label="个人介绍" prop="introduction">
          <el-input v-model="userDetail.introduction" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit"> 保 存 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 验证身份 -->
    <auth ref="auth" :types="['password', 'email', 'mobile']" />
  </div>
</template>

<script>
import { detail, edit } from "@/user/api/account";

export default {
  data() {
    return {
      loading: false,
      userDetail: {},
      rules: {},
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
  watch: {
    userInfo: {
      handler() {
        if (this.userInfo && this.userInfo.id) {
          this.fetchData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.validForm.validate(async (valid) => {
        if (valid) {
          this.doSubmit(this.userDetail);
        }
      });
    },
    doSubmit(ext = {}) {
      this.loading = true;
      edit({
        ...this.userDetail,
        ...ext,
      })
        .then(() => {
          this.$store
            .action("user", {
              cache: "update",
            })
            .then(() => {
              this.loading = false;
              this.$message.success("更新成功！");
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleUpload(res) {
      if (res.id) {
        this.doSubmit({
          avatar: res.id,
        });
      }
    },
    handleChangePw() {
      this.$refs.auth.auth().then((authCode) => {
        this.$router.push({
          name: "修改密码",
          query: {
            authCode,
          },
        });
      });
    },
    fetchData() {
      this.loading = true;
      detail({
        id: this.userInfo.id,
      })
        .then((res) => {
          this.loading = false;
          this.userDetail = res.data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
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
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
