<template>
  <div ref="dom" class="g2-plot g2-plot-pie"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pie, PieOptions } from '@antv/g2plot';
@Component
export default class G2PlotPie extends Vue {
  @Prop({
    default: () => ({
      /** 角度映射字段 */
      angleField: 'value',
      /** 颜色映射字段 */
      colorField: 'type',
      label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{value}({percentage})',
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    }),
  })
  options!: PieOptions;
  chart?: Pie;
  mounted() {
    const chart = new Pie(this.$refs.dom as HTMLElement, {
      ...this.options,
    });
    chart.render();
    this.chart = chart;
  }
}
</script>

<style lang="less" scoped>
.g2-plot.g2-plot-pie {
  height: 100%;
}
</style>