<template>
  <div class="a-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :show-close="showClose || true"
      :center="center || false"
      :close-on-click-modal="closeModal || true"
      :close-on-press-escape="closeEscape || true"
      @close="handleDialogClose"
      :before-close="closeBefore"
      v-if="value"
      :width="dialogWidth"
      append-to-body>
        <div class="dialog-content">
          <slot></slot>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button
        v-for="(btn, index) of toolbar || []"
        v-show="!btn.hide"
        :disabled="btn.disabled"
        :loading="btn.loading"
        :key="index"
        :type="btn.type || 'primary'"
        size="small"
        @click="handleClick(btn)"
      >
        {{btn.text}}
      </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogVisible: this.value
    };
  },
  props: {
    toolbar: Array,
    closeEscape: Boolean,
    closeModal: Boolean,
    center: Boolean,
    showClose: Boolean,
    dialogWidth: {
      type: String,
      default: '50%'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
    }
  },
  methods: {
    handleClick (btn) {
      const { func } = btn
      func && func(this.done)
    },
    done () {
      this.resetThrottledBtn()
      this.closeBefore()
    },
    /** 重置节流按钮 */
    resetThrottledBtn () {
      if (this.toolbar && Array.isArray(this.toolbar)) {
        this.toolbar.map(btn => {
          if (btn.loading) {
            btn.loading = false
          }
        })
      }
    },
    closeBefore (done) {
      done()
      this.$emit('input', false)
    },
    handleDialogClose () {
      this.$emit('input', false)
    },
  },
};
</script>

<style lang="less" scoped>

</style>