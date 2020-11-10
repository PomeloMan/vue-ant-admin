<template>
  <div ref="ganttContainer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { gantt } from 'dhtmlx-gantt';
import { Task } from './model';
import { scales } from './config/Index';
@Component
export default class GanttComponent extends Vue {
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
    gantt.config.xml_date = '%Y-%m-%d'; // 配置时间格式化
    // gantt.config.layout = layout; // 配置布局
    gantt.config.row_height = 32; // 每个任务的行高度
    gantt.config.scales = scales(gantt); // 时间线表头显示年,月(周),日三行
    gantt.config.scale_height = 24 * 3; // 时间线表头行高
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
        const task = gantt.getTask(id);
        $this.$emit('task-selected', task);
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
@import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
/** 周末样式 */
.gantt_task_cell.week_end {
  background-color: #eff5fd;
}
.gantt_task_row.gantt_selected .gantt_task_cell.week_end {
  background-color: #f8ec9c;
}

.complex_gantt_bar {
  background: transparent;
  border: none;
}

.complex_gantt_bar .gantt_task_progress {
  display: none;
}
</style>