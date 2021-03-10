<template>
  <div class="home">
    <a-row :gutter="[16, 0]" type="flex" style="height: 100%">
      <a-col :span="8" class="left-wrapper">
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-column
            ref="g2PlotColumn"
            :options="g2PlotColumnOptions"
          ></g2-plot-column>
        </a-card>
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-line
            ref="g2PlotLine"
            :options="g2PlotLineOptions"
          ></g2-plot-line>
        </a-card>
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-pie
            ref="g2PlotPie"
            :options="g2PlotPieOptions"
          ></g2-plot-pie>
        </a-card>
      </a-col>
      <a-col :span="8" class="center-wrapper">
        <g2-map></g2-map>
      </a-col>
      <a-col :span="8" class="right-wrapper">
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-area
            ref="g2PlotArea"
            :options="g2PlotAreaOptions"
          ></g2-plot-area>
        </a-card>
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-bar
            ref="g2PlotBar"
            :options="g2PlotBarOptions"
          ></g2-plot-bar>
        </a-card>
        <a-card
          :bordered="false"
          :body-style="{ padding: '10px', height: '100%' }"
        >
          <g2-plot-dual-axes
            ref="g2PlotDualAxes"
            :options="g2PlotDualAxesOptions"
          ></g2-plot-dual-axes>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  G2PlotColumn,
  G2PlotLine,
  G2PlotArea,
  G2PlotBar,
  G2PlotPie,
  G2PlotDualAxes,
} from '@/shared/components/g2-plot';
import { G2Map } from '@/shared/components/g2';
import {
  AreaOptions,
  BarOptions,
  ColumnOptions,
  LineOptions,
  PieOptions,
  DualAxesOptions,
} from '@antv/g2plot';
@Component({
  components: {
    G2PlotColumn,
    G2PlotLine,
    G2PlotArea,
    G2PlotBar,
    G2PlotPie,
    G2PlotDualAxes,
    G2Map,
  },
})
export default class Home extends Vue {
  g2PlotColumnOptions: ColumnOptions = {
    data: [],
    xField: 'city',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };
  g2PlotLineOptions: LineOptions = {
    data: [],
    xField: 'date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    smooth: true,
  };
  g2PlotPieOptions: PieOptions = {
    data: [],
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{value}({percentage})',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };
  g2PlotAreaOptions: AreaOptions = {
    data: [],
    xField: 'date',
    yField: 'scales',
    smooth: true,
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };
  g2PlotBarOptions: BarOptions = {
    data: [],
    yField: '城市',
    xField: '销售额',
    scrollbar: {
      type: 'vertical',
    },
  };
  g2PlotDualAxesOptions: DualAxesOptions = {
    data: [[], []],
    xField: 'time',
    yField: ['consumeTime', 'completeTime'],
    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'type',
        isGroup: true,
      },
      {
        geometry: 'line',
        seriesField: 'type',
      },
    ],
  };
  created() {
    Promise.all([
      this.$http.get('/mock/g2plot/column.json'),
      this.$http.get('/mock/g2plot/line.json'),
      this.$http.get('/mock/g2plot/bar.json'),
      this.$http.get('/mock/g2plot/pie.json'),
      this.$http.get('/mock/g2plot/dualaxes.json'),
    ]).then((res) => {
      (this.$refs['g2PlotColumn'] as any).chart.update({
        ...this.g2PlotColumnOptions,
        data: res[0].data,
      });
      (this.$refs['g2PlotLine'] as any).chart.update({
        ...this.g2PlotLineOptions,
        data: res[1].data.reverse(),
      });
      (this.$refs['g2PlotArea'] as any).chart.update({
        ...this.g2PlotLineOptions,
        data: res[1].data,
      });
      (this.$refs['g2PlotBar'] as any).chart.update({
        ...this.g2PlotBarOptions,
        data: res[2].data,
      });
      (this.$refs['g2PlotPie'] as any).chart.update({
        ...this.g2PlotPieOptions,
        data: res[3].data,
      });
      (this.$refs['g2PlotDualAxes'] as any).chart.update({
        ...this.g2PlotDualAxesOptions,
        data: [res[4].data, res[4].data],
      });
    });
  }
}
</script>

<style lang="less" scoped>
.home {
  padding: 10px;
  height: 100%;
  .left-wrapper,
  .center-wrapper,
  .right-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    > .ant-card {
      height: 33.33%;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
  .left-wrapper,
  .right-wrapper {
    width: 25%;
  }
  .center-wrapper {
    width: 50%;
  }
}
</style>