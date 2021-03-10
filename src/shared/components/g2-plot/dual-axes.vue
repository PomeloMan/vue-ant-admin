<template>
  <div ref="dom" class="g2-plot g2-plot-dual-axes"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DualAxes, DualAxesOptions } from '@antv/g2plot';
@Component
export default class G2PlotDualAxes extends Vue {
  @Prop({
    default: () => ({
      /** x 轴字段 */
      xField: 'time',
      /** y 轴字段 */
      yField: ['column', 'line'],
    }),
  })
  options!: DualAxesOptions;
  chart?: DualAxes;
  mounted() {
    const chart = new DualAxes(this.$refs.dom as HTMLElement, {
      ...this.options,
    });
    chart.render();
    this.chart = chart;
  }
}
</script>

<style lang="less" scoped>
.g2-plot.g2-plot-dual-axes {
  height: 100%;
}
</style>