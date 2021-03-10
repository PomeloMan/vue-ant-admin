<template>
  <div ref="dom" class="g2-plot g2-plot-line"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Line, LineOptions } from '@antv/g2plot';
@Component
export default class G2PlotLine extends Vue {
  @Prop({
    default: () => ({
      /** x 轴字段 */
      xField: 'time',
      /** y 轴字段 */
      yField: 'value',
      /** 分组字段 */
      seriesField: 'type',
    }),
  })
  options!: LineOptions;
  chart?: Line;
  mounted() {
    const chart = new Line(this.$refs.dom as HTMLElement, {
      ...this.options,
    });
    chart.render();
    this.chart = chart;
  }
}
</script>

<style lang="less" scoped>
.g2-plot.g2-plot-line {
  height: 100%;
}
</style>