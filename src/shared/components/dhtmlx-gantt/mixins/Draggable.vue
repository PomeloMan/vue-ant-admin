<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
/**
 * 任务拖拽
 */
@Component
export default class DraggableMixin extends Vue {
  // 当前甘特图区域距离顶部的距离，用于计算鼠标拖动时显示占位图的位置（鼠标当前Y坐标 - offsetTop - gantt.config.scale_height）
  @Prop({ type: Number, default: 0 }) offsetTop!: number;

  gantt: any;

  position: { x: number; y: number } = { x: 0, y: 0 }; // 当前鼠标位置
  draggingTask?: any; // 当前拖动的任务

  created() {
    const $this = this;
    const { gantt } = this;

    // 左侧Grid内容可拖拽
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;

    // 获取当前拖动任务ID
    gantt.attachEvent('onBeforeTaskDrag', function (
      id: any,
      mode: string
      // e: MouseEvent
    ) {
      const modes = gantt.config.drag_mode;
      if (mode === modes.move) {
        // 获取当前拖动任务并复制一份，用于取消拖拽还原原任务
        $this.draggingTask = { ...gantt.getTask(id) };
        // gantt.refreshTask(id);
      }
      return true;
    });
    // 更新当前拖动鼠标位置
    gantt.attachEvent('onMouseMove', function (id: any, e: MouseEvent) {
      $this.position = {
        x: e.clientX,
        y: e.clientY,
      };
    });
    // 拖动完成，更新任务
    gantt.attachEvent('onAfterTaskDrag', function (
      id: any,
      mode: string,
      e: MouseEvent
    ) {
      const modes = gantt.config.drag_mode;
      if (mode === modes.move) {
        // // 任务拖拽
        // let targetTaskId = null; // 目标区域已存在的任务ID
        // const targetDiv = e.target as HTMLElement;
        // if (targetDiv && targetDiv.parentElement) {
        //   const ganttTaskLineEl = targetDiv.parentElement;
        //   targetTaskId =
        //     ganttTaskLineEl.dataset && ganttTaskLineEl.dataset.taskId;
        // }
        // console.log(targetTaskId);
        $this.refreshTask(id);
      } else if (mode == modes.progress) {
        // 进度条拖拽
      } else if (mode == modes.resize) {
        // 时间拖拽
        // const task = gantt.getTask(id);
        // updateAndRefreshTasks(task.parent, task);
      }
    });

    // 添加ClassName，拖拽时隐藏被拖拽的任务
    gantt.templates.task_class = function (start: Date, end: Date, task: any) {
      if ($this.draggingTask && task.id == $this.draggingTask.id) {
        return 'dragging_task';
      }
    };

    // 拖拽任务显示占位
    gantt.addTaskLayer({
      renderer: function highlight_area() {
        const task = gantt.getTask($this.draggingTask.id);
        const sizes = gantt.getTaskPosition(
          task,
          task.start_date,
          task.end_date
        );
        const el: any = document.createElement('div');
        el.className = 'gantt_task_line';
        el.style.top =
          $this.position.y - gantt.config.scale_height - $this.offsetTop + 'px';
        if (task.type == gantt.config.types.milestone) {
          el.style.left = sizes.left - 15 + 'px';
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.transform = 'rotate(45deg)';
          el.style.background = '#D33DAF';
        } else {
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.height = sizes.height + 'px';
        }
        el.style.opacity = 0.5;
        return el;
      },
      filter: function (task: any) {
        return (
          $this.draggingTask &&
          $this.draggingTask.id == gantt.getState().drag_id
        );
      },
    });
  }

  /**
   * 更新任务
   */
  refreshTask(id: any) {
    const { gantt, position, offsetTop, draggingTask } = this;
    if (draggingTask && id == draggingTask.id) {
      const index = Math.floor(
        (position.y - gantt.config.scale_height - offsetTop) /
          gantt.config.row_height
      );
      let targetTask = gantt.getTaskByIndex(index);
      if (!targetTask) {
        targetTask = gantt.getTaskByIndex(gantt.getVisibleTaskCount() - 1);
      }

      console.log(targetTask.id, id);
      if (targetTask.id == id) {
        this.draggingTask = null; // 修改必须用this.draggingTask，不能直接使用对象draggingTask
        gantt.refreshTask(id);
        return true;
      }

      if (targetTask.type != 'project') {
        const copy_object = gantt.copy(targetTask);
        gantt.changeTaskId(targetTask.id, +new Date());
        gantt.addTask(copy_object, targetTask.id);
        targetTask.type = 'project';
        targetTask.render = ['split'];
      }

      const task = gantt.getTask(id);
      if (task.parent) {
        const original_parent = gantt.getTask(task.parent);
        const children = gantt.getChildren(task.parent);
        if (children.length == 1)
          original_parent.type = gantt.config.types.task;
      }
      task.parent = targetTask.id;

      gantt.updateTask(targetTask.id);
      gantt.updateTask(id);
      gantt.render();
    }
    this.draggingTask = null; // 修改必须用this.draggingTask，不能直接使用对象draggingTask
    gantt.refreshTask(id);
  }
}
</script>
<style>
.dragging_task,
.dragging_task.gantt_task_line.gantt_milestone
  .gantt_link_control
  .gantt_link_point,
.dragging_task.gantt_task_line.gantt_milestone .gantt_task_content,
.dragging_task.gantt_task_line.gantt_milestone .gantt_side_content {
  visibility: hidden !important;
}
</style>