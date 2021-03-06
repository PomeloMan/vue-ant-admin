<template>
  <div class="image-upload">
    <a-upload
      :accept="accept"
      :listType="listType"
      :fileList="__files"
      :multiple="multiple"
      :showUploadList="showUploadList"
      :disabled="disabled"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
      @preview="handlePreview"
    >
      <div v-if="__files.length < limit.length && listType === 'picture-card'">
        <a-icon :type="uploading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">{{ $t('common.upload') }}</div>
      </div>
      <slot name="upload-btn"></slot>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="previewVisible = false"
    >
      <img style="width: 100%" :src="previewImageUrl" />
    </a-modal>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import { getBase64 } from '@/shared/utils';

@Component
export default class UploadComponent extends Vue {
  @Prop({ type: String, default: '.jpg, .jpeg, .png' })
  accept!: string;
  // 显示方式
  @Prop({ type: String, default: 'picture-card' })
  listType!: string;
  // 是否显示上传列表
  @Prop({ type: Boolean, default: true })
  showUploadList!: boolean;
  // 是否多文件上传
  @Prop({ type: Boolean, default: true })
  multiple!: boolean;
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;
  // 文件集合(双向绑定)
  @Prop({ type: Array, default: () => [] })
  @Model('change')
  files!: Array<any>;
  // 上传文件限制，默认尺寸不超过1024x1024，大小不超过10M，文件个数不超过3
  @Prop({
    type: Object,
    default: () => ({
      width: 1024, // 1024px
      height: 1024, // 1024px
      size: 10, // 10M
      length: 3,
    }),
  })
  limit!: { width: number; height: number; size: number; length: number };
  @Prop() width?: number; // 上传组件宽度
  @Prop() height?: number; // 上传组件高度
  @Prop({ type: Boolean, default: true }) needImageValidation!: boolean; // 是否为图片，如果是图片则验证图片大小及宽高
  @Prop({ type: Function, default: () => {} }) beforeUploadCallback!: Function;
  uploading = false; // 上传中
  previewVisible = false; // 预览
  previewImageUrl = ''; // 预览文件URL

  get __files() {
    return this.files;
  }
  set __files(files) {
    this.$emit('change', files);
  }

  @Watch('multiple')
  onMultipleChange() {
    if (!this.multiple) {
      this.limit.length = 1;
    } else {
      this.limit.length = 3;
    }
  }

  created() {
    this.onMultipleChange();
  }

  mounted() {
    const el = this.$el.querySelector(
      '.ant-upload.ant-upload-select-picture-card'
    ) as HTMLElement;
    if (el) {
      if (this.width) {
        el.style.width = `${this.width}px`;
      }
      if (this.height) {
        el.style.height = `${this.height}px`;
      }
    }
  }

  // 预览
  async handlePreview(file: any) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImageUrl = file.url || file.preview;
    this.previewVisible = true;
  }
  // 删除
  handleRemove(file: any) {
    const index = this.files.indexOf(file);
    const newFiles = this.files.slice();
    newFiles.splice(index, 1);
    this.__files = newFiles;
  }
  // 上传验证
  beforeUpload(file: any) {
    if (this.needImageValidation) {
      this.validateImage(file);
    }
    this.beforeUploadCallback(file);
    return false;
  }
  validateImage(file: any) {
    // 校验图片
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.$message.error(this.$t('message.image_type_error').toString());
      return false;
    }
    // 校验大小
    const isLtSize = file.size / 1024 / 1024 < this.limit.size;
    if (!isLtSize) {
      this.$message.error(
        this.$t('message.image_size_error', { max: this.limit.size }).toString()
      );
      return false;
    }
    const $this = this;
    $this.uploading = true;
    getBase64(file)
      .then((imageUrl: string) => {
        return new Promise((resolve) => {
          // 校验图片尺寸
          const image = new Image();
          image.onload = () => {
            if (
              $this.limit.width < image.width ||
              $this.limit.height < image.height
            ) {
              $this.uploading = false;
              $this.$message.error(
                $this
                  .$t('message.image_wh_error', {
                    w: $this.limit.width,
                    h: $this.limit.height,
                  })
                  .toString()
              );
            } else {
              resolve(imageUrl);
            }
          };
          image.src = imageUrl;
        });
      })
      .then((imageUrl) => {
        setTimeout(() => {
          this.uploading = false;
          if (imageUrl) {
            const __file = {
              originFileObj: file,
              thumbUrl: imageUrl,
              status: 'done',
              name: file.name,
              size: file.size,
              type: file.type,
              uid: file.uid,
            };
            if (!this.multiple) {
              $this.__files = [__file];
            } else {
              $this.__files = [...$this.__files, __file];
            }
          }
        }, 1000);
      })
      .catch(() => {
        $this.uploading = false;
      });
    // 返回false控制手动请求
    return false;
  }
}
</script>