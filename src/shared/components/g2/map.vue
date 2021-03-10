<template>
  <div ref="dom" class="g2 g2-map"></div>
</template>

<script lang="ts">
const d = [
  { name: '北京市', value: 86.8 },
  { name: '天津市', value: 106.3 },
  { name: '河北省', value: 94.7 },
  { name: '山西省', value: 98 },
  { name: '内蒙古自治区', value: 98.4 },
  { name: '辽宁省', value: 97.2 },
  { name: '吉林省', value: 98.3 },
  { name: '黑龙江省', value: 96.7 },
  { name: '江苏省', value: 95.8 },
  { name: '上海市', value: 101.3 },
  { name: '浙江省', value: 94.8 },
  { name: '安徽省', value: 96.6 },
  { name: '福建省', value: 86.3 },
  { name: '江西省', value: 102.1 },
  { name: '山东省', value: 101.3 },
  { name: '河南省', value: 107.6 },
  { name: '湖北省', value: 99.9 },
  { name: '湖南省', value: 130.1 },
  { name: '广东省', value: 106.5 },
  { name: '海南省', value: 93.4 },
  { name: '四川省', value: 101.4 },
];
import { Component, Vue } from 'vue-property-decorator';
import DataSet from '@antv/data-set';
import { Chart, View } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
@Component
export default class G2PlotArea extends Vue {
  chart?: Chart;
  chiaMapView?: View;
  dynamicView?: View;
  mounted() {
    this.$http.get('/assets/geojson/china.json').then(({ data }) => {
      const chart = new Chart({
        container: this.$refs.dom as HTMLElement,
        autoFit: true,
        height: (this.$refs.dom as HTMLElement).clientHeight * 1.5,
        padding: [10],
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        shared: true,
      });
      // 同步度量
      chart.scale({
        longitude: {
          sync: true,
        },
        latitude: {
          sync: true,
        },
      });
      chart.axis(false);
      chart.legend(false);
      // 绘制世界地图背景
      const ds = new DataSet();
      const chinaMap = ds.createView('back').source(data, {
        type: 'GeoJSON',
      });
      const chinaMapView = chart.createView();
      chinaMapView.data(chinaMap.rows);
      chinaMapView.tooltip(false);
      chinaMapView
        .polygon()
        .position('longitude*latitude')
        .state(this.getStateStyle())
        .style({
          fill: '#fff',
          fillOpacity: 0.8,
          stroke: '#ccc',
          strokeOpacity: 0.8,
          lineWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
        });
      chinaMapView.interaction('element-active');

      // 获知动态数据并绘制区域
      const dynamicDv = ds
        .createView()
        .source(d)
        .transform({
          geoDataView: chinaMap,
          field: 'name',
          type: 'geo.region',
          as: ['longitude', 'latitude'],
        });
      const dynamicView = chart.createView();
      dynamicView.data(dynamicDv.rows);
      dynamicView
        .polygon()
        .position('longitude*latitude')
        .color(
          'value',
          '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2'
        )
        .tooltip('name*value')
        .state(this.getStateStyle())
        .style({
          fillOpacity: 0.6,
          // stroke: '#ccc',
          // strokeOpacity: 0.6,
          lineWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
        })
        .animate({
          leave: {
            animation: 'fade-out',
          },
        });
      // 交互
      dynamicView.interaction('element-active');
      dynamicView.interaction('element-single-selected');
      // 事件
      const $this = this;
      chart.on('polygon:click', (ev: any) => {
        const intervalElement = ev.target.get('element');
        const data = intervalElement.getModel().data; // 单条数据
        console.log(data);
        $this.$emit('selected', ev);
      });
      chart.render();
      this.chart = chart;
    });
  }
  update(data?: any) {
    this.dynamicView?.changeData(data);
  }

  /**
   * 获取交互状态样式
   */
  private getStateStyle() {
    return {
      // hover样式
      active: {
        style: (element: Element) => {
          const shape = element.shape;
          return {
            lineWidth: 1,
            stroke: shape.attr('fill'),
            strokeOpacity: 1,
            fill: shape.attr('fill'),
            fillOpacity: 1,
          };
        },
      },
      // 选中样式
      selected: {
        style: (element: Element) => {
          const shape = element.shape;
          return {
            lineWidth: 1,
            stroke: shape.attr('fill'),
            strokeOpacity: 1,
            fill: shape.attr('fill'),
            fillOpacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
            shadowBlur: 10,
          };
        },
      },
    };
  }
}
</script>

<style lang="less" scoped>
.g2.g2-map {
  height: 100%;
}
</style>