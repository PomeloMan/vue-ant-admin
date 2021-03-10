<template>
  <div ref="dom" class="g2-plot g2-plot-area"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Area, AreaOptions } from '@antv/g2plot';
@Component
export default class G2PlotArea extends Vue {
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
  options!: AreaOptions;
  chart?: Area;
  mounted() {
    const chart = new Area(this.$refs.dom as HTMLElement, {
      ...this.options,
    });
    chart.render();
    this.chart = chart;
  }
}
</script>

<style lang="less" scoped>
.g2-plot.g2-plot-area {
  height: 100%;
}
</style>