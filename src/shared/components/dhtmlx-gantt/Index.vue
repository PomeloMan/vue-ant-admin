<template>
  <div ref="ganttContainer"></div>
</template>

<script lang="ts">
import '@/assets/libs/dhtmlx/gantt/dhtmlxgantt';
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import { Task } from './model/Index';
import Scales from './mixins/Scales';
import Draggable from './mixins/Draggable.vue';

declare const gantt: any;

@Component
export default class GanttComponent extends Mixins(Vue, Scales, Draggable) {
  @Prop({ type: Object, default: () => ({ data: [], links: [] }) })
  data!: { data: Array<any>; links: Array<any> };

  gantt: any = gantt;
  taskSelectedEventId = 'ev_ontaskselected'; // 任务点击事件ID,用于组件销毁同时销毁事件监听

  mounted() {
    const { gantt } = this;
    this.initConfigs();
    gantt.init(this.$refs.ganttContainer as HTMLElement);
    gantt.parse(this.data);
    this.initGanttEvents();
    this.initDataProcessor();
  }

  destroyed() {
    const { gantt, taskSelectedEventId } = this;
    gantt.detachEvent(taskSelectedEventId);
  }

  initConfigs() {
    const { gantt } = this;
    gantt.i18n.setLocale('cn'); // 国际化配置
    /// initialization
    gantt.config.touch = 'force'; // 点击跟踪任务
    gantt.config.xml_date = '%Y-%m-%d'; // 配置时间格式化（年-月-日）
    // gantt.config.layout = layout; // 配置布局
    gantt.config.row_height = 32; // 每个任务的行高度
    /// worktime
    gantt.config.work_time = true; // 启用计算工作时间而不是日历时间的持续时间
    gantt.config.correct_work_time = true; // 可以将任务的开始日期和结束日期调整为工作时间（拖动时）
    // 配置周末样式
    gantt.templates.timeline_cell_class = function (task: Task, date: Date) {
      if (!gantt.isWorkTime(date)) return 'week_end';
      return '';
    };

    gantt.config.auto_types = true; // 自动将具有子任务的任务转换为项目，将没有子任务的项目转换回任务
    gantt.locale.labels.section_split = '显示'; // split label文案
    // 任务详情组件布局,添加 split task 选项
    gantt.config.lightbox.project_sections = [
      {
        name: 'description',
        height: 70,
        map_to: 'text',
        type: 'textarea',
        focus: true,
      },
      {
        name: 'split',
        type: 'checkbox',
        map_to: 'render',
        options: [{ key: 'split', label: '拆分任务' }],
      },
      { name: 'time', type: 'duration', readonly: true, map_to: 'auto' },
    ];
  }

  // 初始化事件处理
  initGanttEvents() {
    const $this = this;
    const { gantt, taskSelectedEventId } = $this;
    gantt.attachEvent(
      'onTaskSelected',
      (id: any) => {
        // 删除所有任务节点的选中ClassName
        gantt.eachTask(function (task: any) {
          const node = gantt.getTaskNode(task.id);
          if (node) {
            node.classList.remove('gantt_selected');
          }
        });
        // 添加当前选中任务节点的ClassName
        const selectTask = gantt.getTask(id);
        const selectNode = gantt.getTaskNode(id);
        if (!selectNode.classList.contains('gantt_selected')) {
          selectNode.classList.add('gantt_selected');
        }

        // 触发任务选中事件回调函数
        $this.$emit('task-selected', selectTask);
      },
      { id: taskSelectedEventId }
    );
  }
  // 初始化数据处理
  initDataProcessor() {
    const $this = this;
    const { gantt } = $this;
    gantt.createDataProcessor(
      (entity: string, action: string, data: any, id: number) => {
        $this.$emit(`${entity}-updated`, id, action, data);
      }
    );
  }
}
</script>

<style>
@import '~@/assets/libs/dhtmlx/gantt/dhtmlxgantt.css';
html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
}
/** 周末样式 */
.gantt_task_cell.week_end {
  background-color: #eff5fd;
}
.gantt_task_row.gantt_selected .gantt_task_cell.week_end {
  background-color: #f8ec9c;
}
</style>