import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WorktimeMixin extends Vue {
  gantt: any;
  created() {
    const { gantt } = this;
  }
}
