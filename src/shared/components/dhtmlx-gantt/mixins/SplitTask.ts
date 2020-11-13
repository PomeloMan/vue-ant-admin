import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SplitTaskMixin extends Vue {
  gantt: any;
  created() {
    const { gantt } = this;
    gantt.config.auto_types = true; // 自动将具有子任务的任务转换为项目，将没有子任务的项目转换回任务
  }
}
