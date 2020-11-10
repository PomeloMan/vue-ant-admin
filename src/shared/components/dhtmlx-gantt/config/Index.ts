/*
 * 布局配置 - 左侧任务栏与右侧时间线区分水平滚动条,共用垂直滚动条;左右比例1:2.5
 * 注: 修改成此布局会影响 gantt.config.touch = 'force'; 无法点击跟踪任务
 */
export const layout = {
  css: 'gantt_container',
  cols: [
    {
      minWidth: 350,
      gravity: 1,
      rows: [
        {
          view: 'grid',
          // scrollX: 'gridScrollHor',
          // scrollable: true,
          scrollY: 'scrollVer'
        }
        // { view: 'scrollbar', id: 'gridScrollHor', group: 'horizontal' },
      ]
    },
    {
      gravity: 2.5,
      rows: [
        {
          view: 'timeline',
          scrollX: 'timelineScrollHor',
          scrollY: 'scrollVer'
        },
        { view: 'scrollbar', id: 'timelineScrollHor', group: 'horizontal' }
      ]
    },
    { view: 'scrollbar', id: 'scrollVer' }
  ]
};

export const scales = (gantt: any) => {
  return [
    { unit: 'month', step: 1, format: '%Y, %F' },
    {
      unit: 'week',
      step: 1,
      format: function(date: any) {
        const dateToStr = gantt.date.date_to_str('%M %d');
        const weekNum = gantt.date.date_to_str('(week %W)');
        const endDate = gantt.date.add(
          gantt.date.add(date, 1, 'week'),
          -1,
          'day'
        );
        return (
          dateToStr(date) + ' - ' + dateToStr(endDate) + ' ' + weekNum(date)
        );
      }
    },
    { unit: 'day', step: 1, format: '%D (%d)' }
  ];
};
