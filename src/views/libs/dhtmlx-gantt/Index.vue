<template>
  <div>
    <gantt
      class="left-container"
      :data="tasks"
      @task-updated="logTaskUpdate"
      @link-updated="logLinkUpdate"
      @task-selected="selectTask"
    ></gantt>
  </div>
</template>

<script>
import Gantt from '@/shared/components/dhtmlx-gantt/Index.vue';
export default {
  name: 'app',
  components: { Gantt },
  data() {
    return {
      tasks: {
        data: [
          {id: 11, text: "Project #1", type: "project", progress: 0, open: true, start_date: "2018-04-02 00:00", duration: 13, parent: 0},
          {id: 12, text: "Task #1", start_date: "2018-04-03 00:00", duration: 5, parent: "11", progress: 0, open: true},
          {id: 13, text: "Task #2", start_date: "2018-04-03 00:00", type: "project", render:"split", parent: "11", progress: 0.5, open: false, duration: 11},
          {id: 17, text: "Stage #1", start_date: "2018-04-03 00:00", duration: 1, parent: "13", progress: 0, open: true},
          {id: 18, text: "Stage #2", start_date: "2018-04-05 00:00", duration: 2, parent: "13", progress: 0, open: true},
          {id: 19, text: "Stage #3", start_date: "2018-04-08 00:00", duration: 1, parent: "13", progress: 0, open: true},
          {id: 20, text: "Stage #4", start_date: "2018-04-10 00:00", duration: 4, parent: "13", progress: 0, open: true},
          {id: 14, text: "Task #3", start_date: "2018-04-02 00:00", duration: 6, parent: "11", progress: 0, open: true},
          {id: 15, text: "Task #4", type: "project", render:"split", parent: "11", progress: 0, open: true, start_date: "03-04-2018 00:00", duration: 11},
          {id: 21, text: "Stage #1", start_date: "2018-04-03 00:00", duration: 4, parent: "15", progress: 0, open: true},
          {id: 22, text: "Stage #2", start_date: "2018-04-08 00:00", duration: 3, parent: "15", progress: 0, open: true},
          {id: 23, text: "Mediate milestone", start_date: "2018-04-14 00:00", duration: 0, type: "milestone", parent: "15", progress: 0, open: true},
          {id: 16, text: "Final milestone", start_date: "2018-04-15 00:00", duration: 0, type: "milestone", parent: "11", progress: 0, open: true}
        ],
        links: [
          {id: "1", source: "17", target: "18", type: "0"},
          {id: "2", source: "18", target: "19", type: "0"},
          {id: "3", source: "19", target: "20", type: "0"},
          {id: "4", source: "21", target: "22", type: "0"},
          {id: "5", source: "22", target: "23", type: "0"}
        ],
      },
      selectedTask: null,
      messages: [],
    };
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task;
    },
    addMessage(message) {
      this.messages.unshift(message);
      if (this.messages.length > 40) {
        this.messages.pop();
      }
    },
    logTaskUpdate(id, mode, task) {
      const text = task && task.text ? ` (${task.text})` : '';
      const message = `Task ${mode}: ${id} ${text}`;
      this.addMessage(message);
    },
    logLinkUpdate(id, mode, link) {
      let message = `Link ${mode}: ${id}`;
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`;
      }
      this.addMessage(message);
    },
  },
};
</script>

<style>
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}
</style>