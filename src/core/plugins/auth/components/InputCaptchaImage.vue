<template>
  <el-input
    placeholder="验证码"
    v-model="formData.userInput"
    v-bind="$attrs"
    class="InputCaptchaImage"
  >
    <div
      class="valid_image_wrap flex-row align-center"
      slot="append"
      :style="{ height: imgHeight, width: imgWidth, margin: '0 -20px' }"
      @click="fetchData"
    >
      加载中...
      <img
        v-if="!loading && img.src"
        class="valid_image"
        :src="img.src"
        style="height: 100%; width: 100%; object-fit: contain"
      />
    </div>
  </el-input>
</template>

<script>
import {
  captchaImage,
  validateCaptchaImage,
} from "@/core/plugins/auth/api/auth";

export default {
  props: {
    imgWidth: {
      type: String,
      required: false,
      default: "76px",
    },
    imgHeight: {
      type: String,
      required: false,
      default: "38px",
    },
  },
  data() {
    return {
      loading: false,
      formData: {
        id: null,
        userInput: null,
      },
      img: {
        src: null,
      },
    };
  },
  methods: {
    fetchData() {
      if (this.loading) {
        return null;
      }
      this.loading = true;
      captchaImage()
        .then((res) => {
          this.loading = false;
          if (res.status === 200) {
            this.formData.id = res.data.id;
            this.img.src = res.data.content;
          } else {
            console.warn("图形验证码获取失败");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    valid() {
      return new Promise((resolve, reject) => {
        if (this.formData.userInput) {
          validateCaptchaImage(this.formData)
            .then((res) => {
              if (res.status === 200) {
                resolve(res.data);
              } else {
                reject(`验证失败，请重试`);
              }
            })
            .catch(() => {
              reject(`验证失败，请重试`);
            });
        } else {
          reject(`请填写验证码`);
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.InputCaptchaImage >>> .valid_image_wrap {
  position: relative;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
}
.InputCaptchaImage >>> .valid_image {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
