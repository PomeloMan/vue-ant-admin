import { Component, Prop, Vue } from 'vue-property-decorator';
declare const gantt: any;
const zoomConfig: any = {
  levels: [
    {
      name: 'minute',
      scale_height: 75,
      min_column_width: 50,
      scales: [
        { unit: 'day', step: 1, format: '%F%j (%l)' },
        { unit: 'hour', step: 1, format: '%g %a' },
        { unit: 'minute', step: 15, format: '%i' }
      ]
    },
    {
      name: 'hour', // 定义小时
      scale_height: 50,
      min_column_width: 50,
      scales: [
        { unit: 'day', step: 1, format: '%F%j (%l)' },
        { unit: 'hour', step: 1, format: '%g %a' }
      ]
    },
    {
      name: 'day', // 定义日
      scale_height: 50,
      min_column_width: 80,
      scales: [
        {
          unit: 'week',
          step: 1,
          format: function(date: any) {
            const dateToStr = gantt.date.date_to_str('%M%d');
            const weekNum = gantt.date.date_to_str('#%W周');
            const endDate = gantt.date.add(
              gantt.date.add(date, 1, 'week'),
              -1,
              'day'
            );
            return `${dateToStr(date)} - ${dateToStr(endDate)} (${weekNum(
              date
            )})`;
          }
        }, // 周
        { unit: 'day', step: 1, format: '%D (%d)' } // 日
      ]
    },
    {
      name: 'week', // 定义周
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%Y, %F' }, // 月
        { unit: 'week', format: '#%W周' } // 周
      ]
    },
    {
      name: 'month', // 定义月
      scale_height: 50,
      min_column_width: 100,
      scales: [
        {
          unit: 'quarter',
          step: 1,
          format: function(date: Date) {
            const dateToStr = gantt.date.date_to_str('%M');
            const endDate = gantt.date.add(
              gantt.date.add(date, 3, 'month'),
              -1,
              'day'
            );
            return `${dateToStr(date)} - ${dateToStr(endDate)}`;
          }
        }, // 季度
        { unit: 'month', step: 1, format: '%M' } // 月
      ]
    },
    {
      name: 'quarter', // 定义季度
      height: 50,
      min_column_width: 100,
      scales: [
        { unit: 'month', step: 1, format: '%M' },
        {
          unit: 'quarter',
          step: 1,
          format: function(date: Date) {
            const dateToStr = gantt.date.date_to_str('%M');
            const endDate = gantt.date.add(
              gantt.date.add(date, 3, 'month'),
              -1,
              'day'
            );
            return dateToStr(date) + ' - ' + dateToStr(endDate);
          }
        }
      ]
    },
    {
      name: 'year', // 定义年
      scale_height: 50,
      min_column_width: 50,
      scales: [{ unit: 'year', step: 1, format: '%Y' }]
    }
  ]
};

const mapOfLevelDuration: any = {
  0: { unit: 'minute', step: 15 },
  1: { unit: 'hour', step: 1 },
  2: { unit: 'day', step: 1 },
  3: { unit: 'week', step: 1 },
  4: { unit: 'month', step: 1 },
  5: { unit: 'year', step: 1 }
};

/**
 * 多表头切换
 */
@Component
export default class ScalesMixin extends Vue {
  gantt: any;

  @Prop({ type: Object, default: () => zoomConfig })
  zoomConfig!: any;

  created() {
    const { gantt } = this;
    gantt.ext.zoom.init(this.zoomConfig);
    gantt.ext.zoom.setLevel('day');

    // 添加键盘事件监听
    document.onkeydown = this.handleKeyboardEvent;
    // 添加缩放按键提示
    gantt.message({
      id: 'scalesMessage',
      text: `
        <p>
          <b>按键提示</b><br/>
          <b>Alt + ↑</b>：放大<br/>
          <b>Alt + ↓</b>：缩小<br/>
        </p>
      `,
      expire: -1
    });
  }

  destroyed() {
    // 销毁键盘事件监听
    document.onkeydown = null;
  }

  handleKeyboardEvent(e: KeyboardEvent) {
    const { gantt } = this;
    if (e.altKey) {
      if (e.key === 'ArrowDown') {
        gantt.ext.zoom.zoomOut(); // Alt + ↓ 缩小
        this.setDurationUnit();
      }
      if (e.key === 'ArrowUp') {
        gantt.ext.zoom.zoomIn(); // Alt + ↑ 放大
        this.setDurationUnit();
      }
    }
  }

  private setDurationUnit() {
    const level = gantt.ext.zoom.getCurrentLevel();
    const levelDuration = mapOfLevelDuration[level];
    gantt.config.duration_unit = levelDuration.unit;
    gantt.config.duration_step = levelDuration.step;
  }
}
