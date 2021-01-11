<template>
  <div class="canvas-container" ref="container">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="properties-panel-wrapper"></div>

    <div class="import-export">
      <ul>
        <li>
          <app-upload
            listType="text"
            accept=".bpmn"
            :showUploadList="false"
            :needImageValidation="false"
            :beforeUploadCallback="handleUploadFile"
          >
            <a-button slot="upload-btn" type="link">
              <a-icon type="folder-open" />
            </a-button>
          </app-upload>
        </li>
        <li><a-divider type="vertical"></a-divider></li>
        <li @click="init()">
          <a-button type="link"> <a-icon type="folder-add" /> </a-button>
        </li>
      </ul>
      <ul>
        <li @click="save()">
          <a-button type="link"> <a-icon type="save" /> </a-button>
        </li>
        <li><a-divider type="vertical"></a-divider></li>
        <li @click="downloadBpmn()">
          <a-button type="link"> <a-icon type="download" /> </a-button>
        </li>
        <li><a-divider type="vertical"></a-divider></li>
        <li @click="downloadSvg()">
          <a-button type="link"> <a-icon type="picture" /> </a-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import Modeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import bpmnTranslate from '@/assets/libs/bpmn/i18n/index';

import debounce from 'lodash.debounce';
import AppUpload from '@/shared/components/upload/Index.vue';

const bpmnTranslateModule = {
  translate: [ 'value', bpmnTranslate ]
}

@Component({
  components: {
    AppUpload,
  },
})
export default class BpmnComponent extends Mixins(Vue) {
  modeler: any;

  created() {
    this.save = debounce(this.save, 500, { leading: true, trailing: false });
    this.downloadBpmn = debounce(this.downloadBpmn, 500, {
      leading: true,
      trailing: false,
    });
    this.downloadSvg = debounce(this.downloadSvg, 500, {
      leading: true,
      trailing: false,
    });
  }

  mounted() {
    const canvas = this.$refs.canvas;
    this.modeler = new Modeler({
      container: canvas,
      propertiesPanel: {
        parent: '#js-properties-panel',
      },
      additionalModules: [
        propertiesProviderModule,
        propertiesPanelModule,
        bpmnTranslateModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    });
    this.modeler.createDiagram();
  }

  /**
   * 处理上传文件
   * @param file
   */
  handleUploadFile(file: any) {
    const $this = this;
    const isBpmnType = file.name.lastIndexOf('.bpmn') > 0;
    if (isBpmnType) {
      const fileReader = new FileReader();
      fileReader.onloadend = function (evt: any) {
        if (evt.target.readyState == FileReader.DONE) {
          const xml = evt.target.result;
          $this.loadBpmnXml(xml);
        }
      };
      fileReader.readAsText(file, 'utf-8');
    }
  }

  /**
   * 初始化流程图（只包含开始事件）
   */
  init() {
    this.modeler.createDiagram();
  }

  /**
   * 保存xml，请求后台
   */
  save() {
    this.modeler.saveXML({ format: true }).then((result: any) => {
      const { xml } = result;
      console.log(xml);
      // to do
    });
  }
  /**
   * 下载 BPMN .bpmn文件
   */
  downloadBpmn() {
    this.modeler.saveXML().then((result: any) => {
      const { xml } = result;
      this.download('diagram.bpmn', xml);
    });
  }
  /**
   * 下载 BPMN SVG格式
   */
  downloadSvg() {
    this.modeler.saveSVG().then((result: any) => {
      const { svg } = result;
      this.download('diagram.svg', svg);
    });
  }

  /**
   * 下载
   * @param name 文件名
   * @param data 文件内容
   */
  private download(name: string, data: any) {
    let link: any = document.createElement('a');
    const encodedData = encodeURIComponent(data);

    if (data) {
      link.setAttribute(
        'href',
        'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
      );
      link.setAttribute('download', name);
      link.click();
      setTimeout(() => {
        link.remove();
        link = undefined;
      }, 100);
    }
  }
  /**
   * 导入xml内容并渲染
   * @param xml BPMN XML内容
   */
  private loadBpmnXml(xml: string) {
    this.modeler
      .importXML(xml)
      .then((result: any) => {
        const { warnings } = result;
        console.log(warnings);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
</script>

<style lang="less" scoped>
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
.canvas-container {
  display: block !important;
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .properties-panel-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 260px;
    z-index: 10;
    border-left: 1px solid #ccc;
    overflow: auto;
    &:empty {
      display: none;
    }
    > .djs-properties-panel {
      padding-bottom: 70px;
      min-height: 100%;
    }
  }
}
.import-export {
  position: absolute;
  bottom: 10px;
  left: 10px;
  ul {
    display: inline-block;
    list-style: none;
    padding: 5px;
    margin: 0;
    margin-right: 10px;
    background: #fafafa;
    border-radius: 2px;
    border: solid 1px #e0e0e0;
    li {
      display: inline-block;
      .ant-btn {
        font-size: 22px;
        padding: 0 5px;
      }
    }
  }
}
</style>