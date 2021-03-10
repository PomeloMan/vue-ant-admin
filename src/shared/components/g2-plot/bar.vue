<template>
  <div ref="dom" class="g2-plot g2-plot-bar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bar, BarOptions } from '@antv/g2plot';
@Component
export default class G2PlotBar extends Vue {
  @Prop({
    default: () => ({
      /** x 轴字段 */
      xField: 'category',
      /** y 轴字段 */
      yField: 'value',
      /** 拆分字段 */
      seriesField: 'type',
    }),
  })
  options!: BarOptions;
  chart?: Bar;
  mounted() {
    const chart = new Bar(this.$refs.dom as HTMLElement, {
      ...this.options,
    });
    chart.render();
    this.chart = chart;
  }
}
</script>

<style lang="less" scoped>
.g2-plot.g2-plot-bar {
  height: 100%;
}
</style>